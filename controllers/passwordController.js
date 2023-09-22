//passwordController.js

const mysql = require('mysql2');
const dbConfig = require('../database');
const jwt = require('jsonwebtoken');
const { generateSecurePassword } = require('../utilities/passwordUtils');
require('dotenv').config({ path: './../protect.env' });


  // API per ottenere i dati della dashboard dell'utente
  exports.decodeToken =  (req, res) => {
    // Estrai il token di autenticazione dall'header Authorization
    const authToken = req.header('Authorization');

    if (!authToken) {
      return res.status(401).json({ error: 'Token di autenticazione mancante.' });
    }

    // Rimuovi "Bearer " dal token se presente
    const token = authToken.replace('Bearer ', '');

    // Verifica il token di autenticazione
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.error('Errore durante la verifica del token:', err);
        return res.status(401).json({ error: 'Accesso non autorizzato. Riprova.' });
      }

      const IDUtente = decodedToken.IDUtente;

      console.log("ID utente prelevato:", IDUtente);

      // Esempio: restituisci l'IDUtente come risposta JSON
      return res.status(200).json({ data: IDUtente });
    });
  };

  //API per generare una nuova password
  exports.generatePassword = async (req, res) => {

    console.log('API di generazione chiamata con successo');
      const newPassword = generateSecurePassword(16); // Genera una password casuale di 16 caratteri
      ;

      const data = newPassword

      
      // Puoi ora salvare questa newPassword nel database o utilizzarla per altre operazioni 
    return res.status(200).json(data);

  };
  
  // API per visualizzare le password inserite dall'utente
  exports.viewPassword = async (req, res) => {
    const IDUtente = req.query.IDUtente; // Assumiamo che l'ID dell'utente sia passato come parametro nell'URL
    console.log('Api Visualizzazione Passwords chiamata con successo');

    const PasswordData = (result) => {
      const data = result.map((login) => ({
        IDPassword: login.IDPassword,
        NomeP: login.NomeP,
        Password: login.Password,
      }));
      return data; // Restituisci l'array mappato
    };
  
    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN
    });
  
  
    // Query SQL per ottenere la password dal database utilizzando l'ID
    const query = 'SELECT IDPassword, NomeP, Password FROM Passwords WHERE IDUtente = ?';
    const values = [IDUtente];
  
    // Esecuzione della query
    connection.query(query, values, (err, result) => {  
      if (err) {
        console.error('Errore durante il recupero della password:', err);
        return res.status(500).json({ error: 'Errore durante il recupero della password' });
      }
  
      const data = PasswordData(result);

      if (result.length > 0) {
        // I dati dei login sono corretti
        return res.status(200).json({ message: 'Fetch delle Password effettuato con successo', data: data });
      } else {
        // I dati dei login sono errati
        connection.end(); // Chiudi la connessione al database
        return res.status(400).json({ error: 'I dati delle password sono errati' });
      }
    });
  };

  //API per la visualizzazione delle informazioni di login inserite dall'utente
  exports.viewLogin = async (req, res) => {
    const IDUtente = req.query.IDUtente; // Assumiamo che l'ID dell'utente sia passato come parametro nell'URL
    

    const loginData = (result) => {
      const data = result.map((login) => ({
        IDLogin: login.IDLogin,
        NomeSito: login.NomeSito,
        URL: login.URL,
        Email: login.Email,
        PasswordL: login.PasswordL,
      }));
      return data; // Restituisci l'array mappato
    };

    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN
    });


    // Query SQL per ottenere le informazioni dei login dell'utente
    const query = 'SELECT IDLogin, NomeSito, URL, Email, PasswordL FROM Login WHERE IDUtente = ?';
    const values = [IDUtente];
    // Stampa la query prima di eseguirla
    console.log('Query SQL:', query, 'Valori:', values);

    // Esecuzione della query
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Errore durante il recupero delle informazioni di login:', err);
        return res.status(500).json({ error: 'Errore durante il recupero delle informazioni di login' });
      }

      // Ottieni l'array mappato utilizzando la funzione loginData
      const data = loginData(result);

      // Verifica il contenuto di data
      console.log('Contenuto di loginData:', data);

      // Restituzione delle informazioni di login come risposta
      if (result.length > 0) {
        // I dati dei login sono corretti
        return res.status(200).json({ message: 'Fetch dei Login effettuato con successo', data: data });
      } else {
        // I dati dei login sono errati
        connection.end(); // Chiudi la connessione al database
        return res.status(400).json({ error: 'I dati dei login sono errati' });
      }
    });
  };

  //API per la visualizzazione delle note inserite dall'utente
  exports.viewNote = async (req, res) => {
    const IDUtente = req.query.IDUtente; // Assumiamo che l'ID dell'utente sia passato come parametro nell'URL

    const noteData = (result) => {
      const data = result.map((item) => ({
        IDNota: item.IDNota,
        NomeNota: item.NomeNota,
        Nota: item.Nota,
      }));
      return data; // Restituisci l'array mappato
    };

    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN
    });


    // Query SQL per ottenere le informazioni dei login dell'utente
    const query = 'SELECT IDNota, NomeNota, Nota FROM Nota WHERE IDUtente = ?';
    const values = [IDUtente];

    // Esecuzione della query
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Errore durante il recupero delle note:', err);
        return res.status(500).json({ error: 'Errore durante il recupero delle note' });
      }

      // Ottieni l'array mappato utilizzando la funzione loginData
      const data = noteData(result);

      // Verifica il contenuto di data
      console.log('Contenuto di noteData:', data);

      // Restituzione delle informazioni di login come risposta
      if (result.length > 0) {
        // I dati delle note sono corretti
        return res.status(200).json({ message: 'Fetch delle Note effettuato con successo', data: data });
      } else {
        // I dati delle note sono errati
        connection.end(); // Chiudi la connessione al database
        return res.status(400).json({ error: 'I dati delle note sono errati' });
      }
    });
  };

  // API per visualizzare le informazioni dell'utente
  exports.viewAccount = async(req, res) => {
    const IDUtente = req.query.IDUtente;

    const accountData = (result) => {
      const data = result.map((item) => ({
        Nome: item.Nome,
        Cognome: item.Cognome,
        EmailU: item.EmailU,
      }));
      return data; // Restituisci l'array mappato
    };

    // Creazione della connessione al database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERNAME,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB_LOGIN
    });

    try {
      const query = 'SELECT Nome, Cognome, EmailU FROM Utente WHERE IDUtente = ?';
      const values = [IDUtente];

      // Esecuzione della query
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Errore durante il recupero delle informazioni dell account:', err);
          return res.status(500).json({ error: 'Errore durante il recupero delle informazioni dell account' });
        }

        // Ottieni l'array mappato utilizzando la funzione accountData
        const data = accountData(result);

        // Verifica il contenuto di data
        console.log('Contenuto di AccountData:', data);

        // Restituzione delle informazioni di login come risposta
        if (result.length > 0) {
          // I dati delle note sono corretti
          return res.status(200).json({ message: 'Fetch delle informazioni dell account effettuato con successo', data: data });
        } else {
          // I dati delle note sono errati
          connection.end(); // Chiudi la connessione al database
          return res.status(400).json({ error: 'I dati sono errati' });
        }
      });
    } catch (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      return res.status(500).json({ error: 'Errore durante l\'esecuzione della query' });
    }
  };



 




 