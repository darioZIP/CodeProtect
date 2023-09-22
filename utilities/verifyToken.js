const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // Supponendo che il token sia incluso nell'header Authorization
  
    if (!token) {
      return res.status(401).json({ error: 'Token mancante. Effettua l\'accesso.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Errore nella verifica del token:', err);
        return res.status(401).json({ error: 'Token non valido. Effettua l\'accesso.' });
      }
  
      // Se la verifica del token ha successo, memorizza i dati utente nell'oggetto `req` per utilizzarli nelle rotte successive
      req.user = decoded;
      next();
    });
  };
  
  module.exports = verifyToken;