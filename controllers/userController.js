// userController.js

const mysql = require('mysql');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const dbConfig = require('../database');
const jwt = require('jsonwebtoken');
const { generateSecurePassword } = require('../utilities/passwordUtils');
const util = require('util');
require('dotenv').config({ path: './../protect.env' });

// Funzione per la generazione del codice univoco
function generateUniqueCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let IDUnivoco = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) {
      IDUnivoco += '-';
    }
    const randomIndex = Math.floor(Math.random() * characters.length);
    IDUnivoco += characters.charAt(randomIndex);
  }
  return IDUnivoco;
}

// Funzione per la creazione del PDF con il codice univoco
function createPDF(IDUnivoco) {
  const pdfDoc = new PDFDocument();
  pdfDoc.fontSize(20).text('Codice Unico:', { align: 'center' });
  pdfDoc.fontSize(30).text(IDUnivoco, { align: 'center' });
  return pdfDoc;
}

// Funzione per l'invio dell'email con il PDF allegato
function sendEmailWithPDF(EmailU, IDUnivoco) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_MAIL,
      pass: process.env.GMAIL_PASS
    }
  });

  const pdfDoc = createPDF(IDUnivoco);

  let pdfBuffer = Buffer.alloc(0);
  pdfDoc.on('data', (chunk) => {
    pdfBuffer = Buffer.concat([pdfBuffer, chunk]);
  });

  pdfDoc.on('end', () => {
    const mailOptions = {
      from: process.env.GMAIL_MAIL,
      to: EmailU,
      subject: 'Codice Unico',
      text: 'Il tuo codice unico è allegato al PDF.',
      attachments: [
        {
          filename: 'codice_unico.pdf',
          content: pdfBuffer
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Errore nell\'invio dell\'email:', error);
      } else {
        console.log('Email inviata:', info.response);
      }
    });
  });

  pdfDoc.end();
}

//API utilizzata per la registrazione di un utente
exports.register = async (req, res) => {
  const { Nome, Cognome, EmailU, PasswordU } = req.body;
  const IDUnivoco = generateUniqueCode();

  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_LOGIN
  });

  try {
    const emailExistsQuery = 'SELECT * FROM Utente WHERE EmailU = ?';
    const emailExistsValues = [EmailU];
    const emailExistsResult = await util.promisify(connection.query).call(connection, emailExistsQuery, emailExistsValues);

    if (emailExistsResult.length > 0) {
      return res.status(400).json({
        message: 'L\'indirizzo email è già registrato. Vuoi accedere?',
       
      });
    }
    const insertQuery = 'INSERT INTO Utente (Nome, Cognome, EmailU, PasswordU, IDUnivoco) VALUES (?, ?, ?, ?, ?)';
    const insertValues = [Nome, Cognome, EmailU, PasswordU, IDUnivoco];

    await util.promisify(connection.query).call(connection, insertQuery, insertValues);

    await sendEmailWithPDF(EmailU, IDUnivoco);

    return res.status(200).json({ message: 'Registrazione completata con successo' });
  } catch (error) {
    console.error('Errore durante la registrazione dell\'utente:', error);
    return res.status(500).json({ error: 'Errore durante la registrazione dell\'utente' });
  } finally {
    connection.end();
  }
};

//API utilizzata per effettuare il login di un utente
exports.login = async (req, res) => {
  const { EmailU, PasswordU } = req.body;

  console.log('Api di login chiamata con successo');

  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_LOGIN
  });

  const queryCheckCredentials = 'SELECT * FROM Utente WHERE EmailU = ?';
  const valuesCheckCredentials = [EmailU];

  if (valuesCheckCredentials === '') {
    return res.status(401).json({ message: 'L\'indirizzo email non è nei nostri database. Vuoi registrarti?', });
  }

  connection.query(queryCheckCredentials, valuesCheckCredentials, (err, resultCheckCredentials) => {
    connection.end();

    if (err) {
      console.error('Errore durante il login:', err);
      return res.status(500).json({ error: 'Errore durante il login' });
    }

    if (resultCheckCredentials.length === 0) {
      return res.status(401).json({ error: 'Credenziali non valide. Riprova.' });
    }

    const user = resultCheckCredentials[0];

    if (PasswordU !== user.PasswordU) {
      return res.status(401).json({ error: 'Credenziali non valide. Riprova.' });
    }

    const token = jwt.sign({ IDUtente: user.IDUtente, EmailU: user.EmailU }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Login effettuato con successo da:', EmailU);

    // Includi il token nella risposta
    return res.status(200).json({ authToken: token, message: 'Accesso effettuato con successo' });
  });
};


//API utilizzata per la cancellazione di uno specifico utente
exports.deleteUser = async (req, res) => {
  
  const { IDUnivoco, IDUtente } = req.body;

  if (!IDUnivoco) {
    return res.status(400).json({ error: 'Codice unico mancante' });
  }

  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_LOGIN,
  });

  try {
    const queryCheckUser = 'SELECT * FROM Utente WHERE IDUtente = ?';
    const valuesCheckUser = [IDUtente];
    const resultCheckUser = await util.promisify(connection.query).call(connection, queryCheckUser, valuesCheckUser);

    if (resultCheckUser.length === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    const user = resultCheckUser[0];

    if (IDUnivoco !== user.IDUnivoco) {
      return res.status(401).json({ error: 'Codice unico non valido' });
    }

    const queryDeleteUser = 'DELETE FROM Utente WHERE IDUtente = ?';
    const valuesDeleteUser = [IDUtente];

    await util.promisify(connection.query).call(connection, queryDeleteUser, valuesDeleteUser);

    return res.status(200).json({ message: 'Utente eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione dell\'utente:', error);
    return res.status(500).json({ error: 'Errore durante l\'eliminazione dell\'utente' });
  } finally {
    connection.end();
  }
};

//API utilizzata per l'aggiornamento dei dati dell'utente
exports.updateUserData = async (req, res) => {

  const { IDUtente, NewData, IDUnivoco } = req.body;

  // Verifica il codice unico fornito dall'utente
  if (!IDUnivoco) {
    return res.status(400).json({ error: 'Codice unico mancante' });
  }

  // Creazione della connessione al database
  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_LOGIN,
  });

  try {
    // Query SQL per selezionare l'utente con l'indirizzo email specificato
    const queryCheckUser = 'SELECT * FROM Utente WHERE IDUtente = ?';
    const valuesCheckUser = [IDUtente];
    const resultCheckUser = await util.promisify(connection.query).call(connection, queryCheckUser, valuesCheckUser);

    // Se l'utente non è stato trovato, restituisci un messaggio di errore
    if (resultCheckUser.length === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    const user = resultCheckUser[0];

    // Verifica se il codice unico fornito corrisponde a quello dell'utente
    if (IDUnivoco !== user.IDUnivoco) {
      return res.status(401).json({ error: 'Codice unico non valido' });
    }

  // Build the SQL update query and values dynamically based on NewData
  const updateFields = [];
  const updateValues = [];

   for (const key in NewData) {
  // Verifica se il valore non è vuoto o una stringa vuota
  if (NewData[key] !== null && NewData[key] !== '') {
    updateFields.push(`${key} = ?`);
    updateValues.push(NewData[key]);
  }
}

    const queryUpdateUser = `UPDATE Utente SET ${updateFields.join(', ')} WHERE IDUtente = ?`;
    const valuesUpdateUser = [...updateValues, IDUtente];

    // Esecuzione della query per aggiornare i dati dell'utente
    await util.promisify(connection.query).call(connection, queryUpdateUser, valuesUpdateUser);

    return res.status(200).json({ message: 'Dati dell\'utente aggiornati con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dei dati dellutente:', error);
    return res.status(500).json({ error: 'Errore durante l\'aggiornamento dei dati dell\'utente' });
  } finally {
    // Chiudi la connessione al database
    connection.end();
  }
};


exports.updatePassword = async (req, res) => {

  const { EmailU, IDUnivoco } = req.body;

  // Verifica il codice unico fornito dall'utente
  if (!IDUnivoco) {
    return res.status(400).json({ error: 'Codice unico mancante' });
  }

  // Creazione della connessione al database
  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_LOGIN,
  });

  try {
    // Query SQL per selezionare l'utente con l'indirizzo email specificato
    const queryCheckUser = 'SELECT * FROM Utente WHERE EmailU = ?';
    const valuesCheckUser = [EmailU];
    const resultCheckUser = await util.promisify(connection.query).call(connection, queryCheckUser, valuesCheckUser);

    // Se l'utente non è stato trovato, restituisci un messaggio di errore
    if (resultCheckUser.length === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    const user = resultCheckUser[0];

    // Verifica se il codice unico fornito corrisponde a quello dell'utente
    if (IDUnivoco !== user.IDUnivoco) {
      return res.status(401).json({ error: 'Codice unico non valido' });
    }

    const newPassword = generateSecurePassword(12); // Cambia la lunghezza se necessario

    // Invia l'email all'utente con la password generata
    const emailSent = await sendEmailWithNewPassword(user.EmailU, newPassword); // Implementa questa funzione

    if (!emailSent) {
      return res.status(500).json({ error: 'Errore durante l\'invio dell\'email' });
    }


    const queryUpdatePassword = 'UPDATE Utente SET PasswordU = ? WHERE EmailU = ?';
    const valuesUpdatePassword = [newPassword, EmailU];
    await util.promisify(connection.query).call(connection, queryUpdatePassword, valuesUpdatePassword);

    return res.status(200).json({ message: 'Email con la nuova password inviata con successo' });
  } catch (error) {
    console.error('Errore durante la gestione della richiesta:', error);
    return res.status(500).json({ error: 'Errore durante la gestione della richiesta' });
  } finally {
    // Chiudi la connessione al database
    connection.end();
  }
};


async function sendEmailWithNewPassword(EmailU, newPassword) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_MAIL,
      pass: process.env.GMAIL_PASS
    }
  });

    const mailOptions = {
      from: process.env.GMAIL_MAIL,
      to: EmailU,
      subject: 'Nuova password generata',
      text: `La tua nuova password è: ${newPassword}`,
    };

    try {
      // Invia l'email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email inviata: ');
      return true; // L'email è stata inviata con successo
    } catch (error) {
      console.error('Errore durante l\'invio dell\'email:', error);
      return false; // Si è verificato un errore durante l'invio dell'email
    }
  }
  



