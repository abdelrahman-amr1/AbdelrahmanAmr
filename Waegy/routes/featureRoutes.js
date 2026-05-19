const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

// Templates
router.get('/templates', featureController.getTemplates);
router.post('/templates', featureController.addTemplate);
router.delete('/templates/:id', featureController.deleteTemplate);

// Auto Replies
router.get('/autoreplies', featureController.getAutoReplies);
router.post('/autoreplies', featureController.addAutoReply);
router.delete('/autoreplies/:id', featureController.deleteAutoReply);

module.exports = router;
