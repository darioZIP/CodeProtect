// index.js
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const verifyToken = require('../utilities/verifyToken.js');
dotenv.config();

// Configurazione del middleware per il parsing dei dati
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Configurazione delle rotte
const userRoutes = require('./userRoutes');
const passwordRoutes = require('./passwordRoutes');
const exportRoutes = require('./exportRoutes'); 
const insertRoutes = require('./insertRoutes'); 

router.use('/users', verifyToken, userRoutes);
router.use('/insert', insertRoutes);
router.get('/pass', passwordRoutes);
router.use('/export', exportRoutes);

module.exports = router;
