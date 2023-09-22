const express = require('express');
const router = express.Router();
const insertController = require('../controllers/insertController.js'); // Utilizza il percorso relativo

router.post('/LoginP', insertController.saveLogin);
router.post('/PasswordP', insertController.savePassword);
router.post('/NoteP', insertController.saveNote)
router.post('/ModificaNota', insertController.updateNota);
router.post('/RimuoviNota',insertController.deleteNota);
router.post('/ModificaLogin', insertController.updateLogin);
router.post('/RimuoviLogin', insertController.deleteLogin);
router.post('/ModificaPassword', insertController.updatePassword);
router.post('/RimuoviPassword', insertController.deletePassword);

module.exports = router;