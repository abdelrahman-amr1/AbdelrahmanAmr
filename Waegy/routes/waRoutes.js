const express = require('express');
const router = express.Router();
const waController = require('../controllers/waController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Define routes
router.get('/status', waController.getStatus);
router.post('/initialize', waController.initializeClient);
router.post('/send-message', waController.sendMessage);
router.post('/send-bulk', upload.single('file'), waController.sendBulkMessage);

module.exports = router;
