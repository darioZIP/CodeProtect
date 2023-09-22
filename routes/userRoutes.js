//userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js'); // Import your controller

// Define POST routes with callback functions
router.post('/Registrazione', userController.register);
router.post('/Accesso', userController.login);
router.post('/ModificaDatiAccesso', userController.updateUserData);
router.post('/RimuoviAccount', userController.deleteUser);
router.post('/RecuperaPassword', userController.updatePassword);
module.exports = router;