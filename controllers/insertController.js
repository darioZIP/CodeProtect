
const mysql = require('mysql2');
const dbConfig = require('../database');

const util = require('util'); // Import the 'util' module
require('dotenv').config({ path: './../protect.env' });

//API per l'inserimento di una nuova nota dell'utente
exports.saveNote = async (req, res) => {
    const { IDUtente, NomeNota, Nota } = req.body; // Assicurati di passare l'IDUtente come parte della richiesta o tramite l'autenticazione
  
    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });
  
    try {
      // Query SQL per inserire una nuova nota nella tabella "Note"
      const insertNoteQuery = 'INSERT INTO Nota (IDUtente, NomeNota, Nota) VALUES (?, ?, ?)';
      const insertNoteValues = [IDUtente, NomeNota, Nota];
  
      // Esecuzione della query per inserire la nuova nota
      await util.promisify(connection.query).call(connection, insertNoteQuery, insertNoteValues);
  
      return res.status(200).json({ message: 'Nota salvata con successo' });
    } catch (error) {
      console.error('Errore durante il salvataggio della nota:', error);
      return res.status(500).json({ error: 'Errore durante il salvataggio della nota' });
    } finally {
      // Chiudi la connessione al database
      connection.end();
    }
  };

  
 //API per l'inserimento di una nuova nota dell'utente
 exports.saveLogin = async (req, res) => {
    const { IDUtente, NomeSito, URL, Email, PasswordL } = req.body; // Assicurati di passare l'IDUtente come parte della richiesta o tramite l'autenticazione
   
  
    console.log('API Insert login chiamata con successo');
    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });
  
    try {
      // Query SQL per inserire una nuova nota nella tabella "Note"
      const insertLoginQuery = 'INSERT INTO Login (IDUtente, NomeSito, URL, Email, PasswordL) VALUES (?, ?, ?, ?, ?)';
      const insertLoginValues = [IDUtente, NomeSito, URL, Email, PasswordL];
  
      // Esecuzione della query per inserire la nuova nota
      await util.promisify(connection.query).call(connection, insertLoginQuery , insertLoginValues);
  
      return res.status(200).json({ message: 'Login salvato con successo' });
    } catch (error) {
      console.error('Errore durante il salvataggio del login:', error);
      return res.status(500).json({ error: 'Errore durante il salvataggio del login' });
    } finally {
      // Chiudi la connessione al database
      connection.end();
    }
  };


   //API per l'inserimento di una nuova nota dell'utente
 exports.savePassword = async (req, res) => {
    const { IDUtente, NomeP, Password } = req.body; // Assicurati di passare l'IDUtente come parte della richiesta o tramite l'autenticazione
  
    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });
  
    try {
      // Query SQL per inserire una nuova nota nella tabella "Note"
      const insertNoteQuery = 'INSERT INTO Passwords (IDUtente, NomeP, Password) VALUES (?, ?, ?)';
      const insertNoteValues = [IDUtente, NomeP, Password];
  
      // Esecuzione della query per inserire la nuova nota
      await util.promisify(connection.query).call(connection, insertNoteQuery, insertNoteValues);
  
      return res.status(200).json({ message: 'Password salvata con successo' });
    } catch (error) {
      console.error('Errore durante il salvataggio del login:', error);
      return res.status(500).json({ error: 'Errore durante il salvataggio del login' });
    } finally {
      // Chiudi la connessione al database
      connection.end();
    }
  };


    //API utilizzata per la cancellazione di una nota
  exports.deleteNota = async (req, res) => {
    
    const { IDNota } = req.body;

    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });

    try {
      const queryCheck = 'SELECT * FROM Nota WHERE IDNota = ?';
      const valuesCheck = [IDNota];
      const resultCheck = await util.promisify(connection.query).call(connection, queryCheck, valuesCheck);

      if (resultCheck.length === 0) {
        return res.status(404).json({ error: 'Nota non trovata' });
      }


      const queryDelete= 'DELETE FROM Nota WHERE IDNota= ?';
      const valuesDelete = [IDNota];

      await util.promisify(connection.query).call(connection, queryDelete, valuesDelete);

      return res.status(200).json({ message: 'Nota Eliminata con successo' });
    } catch (error) {
      console.error('Errore durante l\'eliminazione della nota:', error);
      return res.status(500).json({ error: 'Errore durante l\'eliminazione della nota' });
    } finally {
      connection.end();
    }
  };

  //API utilizzata per l'aggiornamento dei dati dell'utente
  exports.updateNota = async (req, res) => {

    const { IDNota, NewData } = req.body;
  
    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });
  
    try {
      // Query SQL per selezionare l'utente con l'indirizzo email specificato
      const queryCheck = 'SELECT * FROM Nota WHERE IDNota = ?';
      const valuesCheck = [IDNota];
      const resultCheck = await util.promisify(connection.query).call(connection, queryCheck, valuesCheck);
  
      // Se l'utente non è stato trovato, restituisci un messaggio di errore
      if (resultCheck.length === 0) {
        return res.status(404).json({ error: 'Password non trovata' });
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
  
      const queryUpdate = `UPDATE Nota SET ${updateFields.join(', ')} WHERE IDNota = ?`;
      const valuesUpdate = [...updateValues, IDNota];
  
      // Esecuzione della query per aggiornare i dati dell'utente
      await util.promisify(connection.query).call(connection, queryUpdate, valuesUpdate);
  
      return res.status(200).json({ message: 'Dati della nota aggiornati con successo' });
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della nota', error);
      return res.status(500).json({ error: 'Errore durante l\'aggiornamento della nota' });
    } finally {
      // Chiudi la connessione al database
      connection.end();
    }
  };


  //API utilizzata per la cancellazione di uno specifico login
  exports.deleteLogin = async (req, res) => {
  
    const { IDLogin } = req.body;

    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });

    try {
      const queryCheck = 'SELECT * FROM Login WHERE IDLogin = ?';
      const valuesCheck = [IDLogin];
      const resultCheck = await util.promisify(connection.query).call(connection, queryCheck, valuesCheck);

      if (resultCheck.length === 0) {
        return res.status(404).json({ error: 'Login non trovato' });
      }


      const queryDelete= 'DELETE FROM Login WHERE IDLogin= ?';
      const valuesDelete = [IDLogin];

      await util.promisify(connection.query).call(connection, queryDelete, valuesDelete);

      return res.status(200).json({ message: 'Login eliminato con successo' });
    } catch (error) {
      console.error('Errore durante l\'eliminazione del login:', error);
      return res.status(500).json({ error: 'Errore durante l\'eliminazione del login' });
    } finally {
      connection.end();
    }
  };
  
  //API utilizzata per l'aggiornamento dei dati dell'utente
  exports.updateLogin = async (req, res) => {
  
    const { IDLogin, NewData } = req.body;
    console.log ('API modifica login chiamata con successo')
    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });
  
    try {
      // Query SQL per selezionare l'utente con l'indirizzo email specificato
      const queryCheck = 'SELECT * FROM Login WHERE IDLogin = ?';
      const valuesCheck = [IDLogin];
      const resultCheck = await util.promisify(connection.query).call(connection, queryCheck, valuesCheck);
      console.log('Risultato:', resultCheck);
      // Se l'utente non è stato trovato, restituisci un messaggio di errore
      
  
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
  
      const queryUpdate = `UPDATE Login SET ${updateFields.join(', ')} WHERE IDLogin = ?`;
      const valuesUpdate = [...updateValues, IDLogin];
  
      // Esecuzione della query per aggiornare i dati dell'utente
      await util.promisify(connection.query).call(connection, queryUpdate, valuesUpdate);
  
      return res.status(200).json({ message: 'Dati del login aggiornati con successo' });
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del login', error);
      return res.status(500).json({ error: 'Errore durante l\'aggiornamento del login' });
    } finally {
      // Chiudi la connessione al database
      connection.end();
    }
  };


  exports.deletePassword = async (req, res) => {
  
    
    const { IDPassword } = req.body;

    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });

    try {
      const queryCheck = 'SELECT * FROM Passwords WHERE IDPassword = ?';
      const valuesCheck = [IDPassword];
      const resultCheck = await util.promisify(connection.query).call(connection, queryCheck, valuesCheck);

      if (resultCheck.length === 0) {
        return res.status(404).json({ error: 'Login non trovato' });
      }


      const queryDelete= 'DELETE FROM Passwords WHERE IDPassword = ?';
      const valuesDelete = [IDPassword];

      await util.promisify(connection.query).call(connection, queryDelete, valuesDelete);

      return res.status(200).json({ message: 'Password eliminata con successo' });
    } catch (error) {
      console.error('Errore durante l\'eliminazione della password:', error);
      return res.status(500).json({ error: 'Errore durante l\'eliminazione della password' });
    } finally {
      connection.end();
    }
  };
  
  //API utilizzata per l'aggiornamento dei dati dell'utente
  exports.updatePassword = async (req, res) => {
  
    const { IDPassword, NewData } = req.body;
  
    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN,
    });
  
    try {
      // Query SQL per selezionare l'utente con l'indirizzo email specificato
      const queryCheck = 'SELECT * FROM Passwords WHERE IDPassword = ?';
      const valuesCheck = [IDPassword];
      const resultCheck = await util.promisify(connection.query).call(connection, queryCheck, valuesCheck);
  
      // Se l'utente non è stato trovato, restituisci un messaggio di errore
      if (resultCheck.length === 0) {
        return res.status(404).json({ error: 'Password non trovata' });
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
  
      const queryUpdate = `UPDATE Passwords SET ${updateFields.join(', ')} WHERE IDPassword = ?`;
      const valuesUpdate = [...updateValues, IDPassword];
  
      // Esecuzione della query per aggiornare i dati dell'utente
      await util.promisify(connection.query).call(connection, queryUpdate, valuesUpdate);
  
      return res.status(200).json({ message: 'Dati della password aggiornati con successo' });
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della password', error);
      return res.status(500).json({ error: 'Errore durante l\'aggiornamento della password' });
    } finally {
      // Chiudi la connessione al database
      connection.end();
    }
  };