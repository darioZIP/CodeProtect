//passwordRoutes.js

const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController.js'); // Utilizza il percorso relativo

// Rotte per la gestione delle password
router.get('/Decode', passwordController.decodeToken);
router.get('/LoginG', passwordController.viewLogin);
router.get('/PasswordG', passwordController.viewPassword);
router.get('/NoteG',passwordController.viewNote);
router.get('/Account', passwordController.viewAccount);
router.get('/GeneraPassword', passwordController.generatePassword);

module.exports = router;
