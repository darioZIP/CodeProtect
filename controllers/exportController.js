const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const dbConfig = require('../database');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const exportAndSendEmail = (req, res) => {
  const { IDUnivoco, IDUtente } = req.body;

  console.log('API di esportazione chiamata con successo');

  if (!IDUnivoco) {
    return res.status(400).json({ error: 'Codice unico mancante' });
  }

  if (!IDUtente) {
    return res.status(400).json({ error: 'ID Utente mancante' });
  }

  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_LOGIN,
  });

  const getUtenteQuery = 'SELECT Nome, Cognome, PasswordU, EmailU FROM Utente WHERE IDUtente = ?';
  const getPasswordsQuery = 'SELECT NomeP, Password FROM Passwords WHERE IDUtente = ?';
  const getLoginsQuery = 'SELECT NomeSito, PasswordL, URL, Email  FROM Login WHERE IDUtente = ?';
  const getNoteQuery = 'SELECT NomeNota, Nota FROM Nota WHERE IDUtente = ?';

  connection.query(getUtenteQuery, [IDUtente], (errUtente, resultsUtente) => {
    if (errUtente) {
      console.error('Errore durante l\'esecuzione della query per l\'utente:', errUtente);
      res.status(500).send('Si è verificato un errore durante il recupero dei dati dell\'utente.');
    } else {
      const utente = resultsUtente[0];

      connection.query(getPasswordsQuery, [IDUtente], (errPasswords, resultsPasswords) => {
        if (errPasswords) {
          console.error('Errore durante l\'esecuzione della query per le password:', errPasswords);
          res.status(500).send('Si è verificato un errore durante l\'esportazione delle password.');
        } else {
          connection.query(getLoginsQuery, [IDUtente], (errLogins, resultsLogins) => {
            if (errLogins) {
              console.error('Errore durante l\'esecuzione della query per i login:', errLogins);
              res.status(500).send('Si è verificato un errore durante l\'esportazione dei login.');
            } else {
              connection.query(getNoteQuery, [IDUtente], (errNote, resultsNote) => {
                if (errNote) {
                  console.error('Errore durante l\'esecuzione della query per le note:', errNote);
                  res.status(500).send('Si è verificato un errore durante l\'esportazione delle note.');
                } else {
                  // Creazione del documento PDF utilizzando pdfkit
                  const doc = new PDFDocument();
                  const pdfBuffers = [];

                  doc.on('data', (data) => {
                    pdfBuffers.push(data);
                  });

                  doc.on('end', () => {
                    const pdfBuffer = Buffer.concat(pdfBuffers);

                    // Invia l'email con il PDF allegato
                    const transporter = nodemailer.createTransport({
                      service: 'Gmail',
                      auth: {
                        user: process.env.GMAIL_MAIL,
                        pass: process.env.GMAIL_PASS,
                      },
                    });

                    const mailOptions = {
                      from: process.env.GMAIL_MAIL,
                      to: utente.EmailU,
                      subject: 'Esportazione Password, Login e Note',
                      text: `Gentile Cliente ${utente.Nome} ${utente.Cognome},\n\nAllegato troverai il file PDF con le informazioni esportate.`,
                      attachments: [
                        {
                          filename: 'esportato.pdf',
                          content: pdfBuffer,
                        },
                      ],
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        console.error('Errore durante l\'invio dell\'email:', error);
                        res.status(500).send({ error: 'Si è verificato un errore durante l\'invio dell\'email.' });
                      } else {
                        console.log('Email inviata con successo:', info.response);
                        res.status(200).send({ message: 'Email inviata con successo!' });
                      }
                    });
                  });

                  // Aggiungi il contenuto al documento PDF
                  doc.fontSize(14).text('Tabella Informazioni di Login', { bold: true });
                  if (resultsUtente.length > 0) {
                    doc.list(resultsUtente.map((utente) => `${utente.Nome} ${utente.Cognome} - ${utente.PasswordU} - ${utente.EmailU}`));
                  } else {
                    doc.text('Nessun dato disponibile');
                  }

                  doc.addPage();

                  doc.fontSize(14).text('Tabella Login', { bold: true });
                  if (resultsLogins.length > 0) {
                    doc.list(resultsLogins.map((login) => `${login.NomeSito} - ${login.Email} - ${login.PasswordL} - ${login.URL}`));
                  } else {
                    doc.text('Nessun dato disponibile');
                  }

                  doc.addPage();

                  doc.fontSize(14).text('Tabella Password', { bold: true });
                  if (resultsPasswords.length > 0) {
                    doc.list(resultsPasswords.map((password) => `${password.NomeP} - ${password.Password}`));
                  } else {
                    doc.text('Nessun dato disponibile');
                  }

                  doc.addPage();

                  doc.fontSize(14).text('Tabella Note', { bold: true });
                  if (resultsNote.length > 0) {
                    doc.list(resultsNote.map((note) => `${note.NomeNota} - ${note.Nota}`));
                  } else {
                    doc.text('Nessun dato disponibile');
                  }

                  doc.end();
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  exportAndSendEmail,
};
