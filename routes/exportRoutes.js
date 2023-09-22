//exportRoutes.js

const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController.js');

// Rotta per l'esportazione delle password, login e note e invio via email
router.post('/EsportaDati', exportController.exportAndSendEmail);

module.exports = router;



