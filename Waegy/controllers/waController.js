const waService = require('../services/waService');

exports.getStatus = (req, res) => {
    const sessionId = req.query.sessionId || 'default';
    const client = waService.getClient(sessionId);
    // Rough check if client exists and is ready
    if (client) {
        res.json({ status: 'initialized', sessionId });
    } else {
        res.json({ status: 'not_initialized', sessionId });
    }
};

exports.initializeClient = async (req, res) => {
    const sessionId = req.body.sessionId || 'default';
    try {
        await waService.createClient(sessionId);
        res.json({ message: 'Initializing client...', sessionId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to initialize client', details: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    const sessionId = req.body.sessionId || 'default';
    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).json({ error: 'Missing "to" or "message" fields' });
    }

    try {
        const response = await waService.sendMessage(sessionId, to, message);
        res.json({ success: true, response });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
};

exports.sendBulkMessage = async (req, res) => {
    const sessionId = req.body.sessionId || 'default';
    const messageTemplate = req.body.message;

    if (!req.file || !messageTemplate) {
        return res.status(400).json({ error: 'Missing file or message' });
    }

    const filePath = req.file.path;

    try {
        const result = await waService.processCampaign(sessionId, filePath, messageTemplate);
        res.json(result);
    } catch (error) {
        console.error('Campaign Error:', error);
        res.status(500).json({ error: error.message });
    }
};
