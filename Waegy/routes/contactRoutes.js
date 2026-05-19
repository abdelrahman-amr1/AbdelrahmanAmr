const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', contactController.getContacts);
router.post('/', contactController.addContact);
router.delete('/:id', contactController.deleteContact);
router.post('/import', upload.single('file'), contactController.importContacts);

module.exports = router;
