const db = require('../database');
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');

// Get all contacts
exports.getContacts = (req, res) => {
    const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
};

// Add new contact
exports.addContact = (req, res) => {
    const { name, phone, tags } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ error: "Name and Phone are required" });
    }

    const sql = "INSERT INTO contacts (name, phone, tags) VALUES (?,?,?)";
    db.run(sql, [name, phone, tags || ''], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, name, phone, tags }
        });
    });
};

// Delete contact
exports.deleteContact = (req, res) => {
    const sql = "DELETE FROM contacts WHERE id = ?";
    db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "deleted", changes: this.changes });
    });
};

// Import Contacts
exports.importContacts = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;
    const contacts = [];

    // Helper to process row
    const processRow = (row) => {
        const name = row.Name || row.name;
        let phone = row.Phone || row.phone || row.Mobile || row.mobile;

        if (name && phone) {
            phone = String(phone).replace(/\D/g, ''); // Basic clean
            contacts.push({ name, phone });
        }
    };

    const finalizeImport = () => {
        // Bulk Insert
        const sql = "INSERT OR IGNORE INTO contacts (name, phone) VALUES (?,?)";
        const stmt = db.prepare(sql);

        db.serialize(() => {
            db.run("BEGIN TRANSACTION");
            contacts.forEach(c => {
                stmt.run(c.name, c.phone);
            });
            db.run("COMMIT");
            stmt.finalize();
        });

        // Cleanup
        try { fs.unlinkSync(filePath); } catch (e) { }

        res.json({ message: `Imported ${contacts.length} contacts successfully.` });
    };

    if (originalName.endsWith('.csv')) {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', processRow)
            .on('end', finalizeImport);
    } else if (originalName.endsWith('.xlsx')) {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(sheet);
            data.forEach(processRow);
            finalizeImport();
        } catch (err) {
            return res.status(500).json({ error: 'Failed to parse Excel' });
        }
    } else {
        return res.status(400).json({ error: 'Unsupported file' });
    }
};
