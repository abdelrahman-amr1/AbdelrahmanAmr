const db = require('../database');

// --- TEMPLATES ---
exports.getTemplates = (req, res) => {
    db.all("SELECT * FROM templates ORDER BY created_at DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
};

exports.addTemplate = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content required" });

    db.run("INSERT INTO templates (title, content) VALUES (?,?)", [title, content], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: { id: this.lastID, title, content } });
    });
};

exports.deleteTemplate = (req, res) => {
    db.run("DELETE FROM templates WHERE id = ?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted" });
    });
};

// --- AUTO REPLIES ---
exports.getAutoReplies = (req, res) => {
    db.all("SELECT * FROM auto_replies ORDER BY created_at DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
};

exports.addAutoReply = (req, res) => {
    const { keyword, response, match_type } = req.body;
    if (!keyword || !response) return res.status(400).json({ error: "Keyword and response required" });

    db.run("INSERT INTO auto_replies (keyword, response, match_type) VALUES (?,?,?)",
        [keyword, response, match_type || 'exact'], function (err) {
            if (err) return res.status(400).json({ error: err.message }); // Likely unique constraint
            res.json({ data: { id: this.lastID, keyword, response, match_type } });
        });
};

exports.deleteAutoReply = (req, res) => {
    db.run("DELETE FROM auto_replies WHERE id = ?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted" });
    });
};
