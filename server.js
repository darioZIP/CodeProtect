//server.js

const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs')
const https = require('https'); // Aggiunto modulo HTTPS
dotenv.config();
const dbConfig = require('./database');// Importa il file di configurazione del database

//Configurazione delle policy CORS per reindirizzamento API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.codeprotect.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Middleware per il parsing dei dati da POST request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servi i file statici dalla cartella "dist"
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Configurazione delle rotte utilizzando il file "index.js"
const routes = require('./routes/index');
app.use('/', routes);

const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const exportRoutes = require('./routes/exportRoutes');
const insertRoutes = require('./routes/insertRoutes');
app.use('/api', userRoutes, passwordRoutes, exportRoutes, insertRoutes);

/* Gestisci tutte le altre richieste inviandole al file index.html (per React Router) */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


// Connessione al database MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({

  host: dbConfig.HOST,
  user: dbConfig.USERNAME,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB_LOGIN
  
});


// Test della connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
    return;
  }
  console.log('Connessione al database avvenuta con successo!');
});

let httpsServer; // Definisci la variabile httpsServer

// Carica il certificato SSL e la chiave privata
async function loadCertAndKey() {
  try {
    const certdir = (await fs.promises.readdir("/etc/letsencrypt/live"))[0];
    const key = await fs.promises.readFile(`/etc/letsencrypt/live/codeprotect.app/privkey.pem`, 'utf8');
    const cert = await fs.promises.readFile(`/etc/letsencrypt/live/codeprotect.app/fullchain.pem`, 'utf8');
    return { key, cert };
  } catch (error) {
    console.error('Errore nel caricamento del certificato SSL o della chiave privata:', error);
    throw error;
  }
}
  
  console.log('Caricamento di chiave e certificato completato... 👍');  

// Configura il server HTTPS con Express
async function startHttpsServer() {
  try {
    const { key, cert } = await loadCertAndKey();
    httpsServer = https.createServer({ key, cert }, app); // Utilizza la variabile httpsServer dichiarata inizialmente
    httpsServer.listen(8443, () => { // Sostituisci 8443 con il numero di porta desiderato
      console.log('Server HTTPS in esecuzione su porta 8443'); // Sostituisci 8443 con il numero di porta desiderato
    });
  } catch (error) {
    console.error('Errore nel configurare il server HTTPS:', error);
  }
}

// Avvia il server HTTPS
startHttpsServer();


// Avvio del server
const PORT = process.env.PORT || 3302;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});