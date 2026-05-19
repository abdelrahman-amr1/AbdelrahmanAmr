const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const clients = new Map();
let io;

const initialize = (socketIo) => {
    io = socketIo;
};

const getClient = (sessionId) => {
    return clients.get(sessionId);
};

const createClient = async (sessionId) => {
    if (clients.has(sessionId)) {
        return clients.get(sessionId);
    }

    const client = new Client({
        authStrategy: new LocalAuth({ clientId: sessionId }),
        puppeteer: {
            headless: true,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    client.on('qr', (qr) => {
        console.log(`QR received for session ${sessionId}`);
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Error generating QR code', err);
                return;
            }
            if (io) {
                io.emit('qr_code', { sessionId, url });
                io.emit('log', { sessionId, message: 'QR Code received. Please scan.' });
            }
        });
    });

    client.on('ready', () => {
        console.log(`Client ${sessionId} is ready!`);
        if (io) {
            io.emit('ready', { sessionId });
            io.emit('log', { sessionId, message: 'Client is ready!' });
        }
    });

    client.on('authenticated', () => {
        console.log(`Client ${sessionId} authenticated`);
        if (io) {
            io.emit('authenticated', { sessionId });
            io.emit('log', { sessionId, message: 'Client authenticated!' });
        }
    });

    client.on('auth_failure', (msg) => {
        console.error('AUTHENTICATION FAILURE', msg);
        if (io) {
            io.emit('auth_failure', { sessionId, message: msg });
        }
    });

    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
        if (io) {
            io.emit('disconnected', { sessionId, reason });
        }
        // Accessing private delete method is not ideal but necessary to clean up if needed, 
        // usually initialize handles re-init. 
        // For now just remove from map.
        clients.delete(sessionId);
    });

    const db = require('../database');

    // ... (inside createClient function)

    client.on('message', async (msg) => {
        // Auto-Reply Logic
        const body = msg.body.toLowerCase();

        db.get("SELECT * FROM auto_replies WHERE ? LIKE ('%' || keyword || '%') OR keyword = ?", [body, body], async (err, row) => {
            if (err || !row) return;

            // Simple match logic
            let shouldReply = false;
            if (row.match_type === 'exact' && row.keyword.toLowerCase() === body) shouldReply = true;
            if (row.match_type === 'contains' && body.includes(row.keyword.toLowerCase())) shouldReply = true;

            if (shouldReply) {
                console.log(`Auto-reply triggered for: ${row.keyword}`);
                // random delay for natural feel
                setTimeout(async () => {
                    await msg.reply(row.response);
                }, Math.random() * 2000 + 1000);
            }
        });
    });

    try {
        await client.initialize();
        clients.set(sessionId, client);
        return client;
    } catch (error) {
        console.error('Error initializing client:', error);
        throw error;
    }
};

const sendMessage = async (sessionId, to, message) => {
    const client = clients.get(sessionId);
    if (!client) {
        throw new Error(`Client ${sessionId} not found`);
    }
    // Simple basic formatting, should be improved for production
    const chatId = to.includes('@c.us') ? to : `${to.replace(/\D/g, '')}@c.us`;
    return await client.sendMessage(chatId, message);
};

const fs = require('fs');
const csv = require('csv-parser');
const db = require('../database');

const processCampaign = async (sessionId, filePath, messageTemplate) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                // Delete file after reading
                try { fs.unlinkSync(filePath); } catch (e) { console.error('Error deleting file:', e); }

                if (results.length === 0) {
                    return reject(new Error('No contacts found in file'));
                }

                // Create Campaign in DB
                db.run("INSERT INTO campaigns (message, file_path, status, created_at) VALUES (?, ?, 'processing', CURRENT_TIMESTAMP)",
                    [messageTemplate, 'completed_upload'], function (err) {
                        if (err) console.error('Error creating campaign:', err);
                        const campaignId = this ? this.lastID : 0;

                        // Start Async Processing
                        (async () => {
                            const total = results.length;
                            let sent = 0;
                            let failed = 0;

                            if (io) {
                                io.emit('campaign_start', { total, campaignId });
                                io.emit('log', { message: `Starting campaign for ${total} contacts` });
                            }

                            for (let i = 0; i < total; i++) {
                                const contact = results[i];
                                let msg = messageTemplate;

                                // Replace variables
                                Object.keys(contact).forEach(key => {
                                    const regex = new RegExp(`{${key.toLowerCase()}}`, 'gi');
                                    msg = msg.replace(regex, contact[key]);
                                });

                                // Default replacements if missing in CSV but present in template
                                msg = msg.replace(/{name}/gi, contact.Name || contact.name || 'Friend');
                                msg = msg.replace(/{phone}/gi, contact.Phone || contact.phone || '');

                                const phone = contact.Phone || contact.phone;

                                if (phone) {
                                    try {
                                        // Random delay 2-8 seconds
                                        const delay = Math.floor(Math.random() * 6000) + 2000;
                                        await new Promise(r => setTimeout(r, delay));

                                        await sendMessage(sessionId, phone, msg);
                                        sent++;

                                        // Log history
                                        db.run("INSERT INTO history (contact_id, message, status, sent_at) VALUES (?, ?, 'sent', CURRENT_TIMESTAMP)",
                                            [0, msg]); // 0 for now as we don't have contact IDs linked perfectly yet

                                        if (io) {
                                            const percent = Math.round(((i + 1) / total) * 100);
                                            io.emit('campaign_progress', {
                                                percent,
                                                sent,
                                                total,
                                                current: phone
                                            });
                                            io.emit('log', { message: `Sent to ${phone}` });
                                        }

                                    } catch (err) {
                                        console.error(`Failed to send to ${phone}`, err);
                                        failed++;
                                        if (io) io.emit('log', { message: `Failed to send to ${phone}: ${err.message}` });
                                    }
                                }
                            }

                            // Completion
                            db.run("UPDATE campaigns SET status = 'completed' WHERE id = ?", [campaignId]);
                            if (io) {
                                io.emit('campaign_complete', { sent, failed, total });
                                io.emit('log', { message: `Campaign completed. Sent: ${sent}, Failed: ${failed}` });
                            }

                        })(); // End Async

                        resolve({ message: 'Campaign started', campaignId, total: results.length });
                    });
            })
            .on('error', (err) => reject(err));
    });
};

module.exports = {
    initialize,
    getClient,
    createClient,
    sendMessage,
    processCampaign, // Exported
    getAllSessions: () => Array.from(clients.keys())
};
