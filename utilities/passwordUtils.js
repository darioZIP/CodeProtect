//passwordUtils.js

const crypto = require('crypto');

// Funzione per generare una password sicura
exports.generateSecurePassword = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=';
  const randomBytes = crypto.randomBytes(length);
  const passwordArray = new Array(length);
  const charsLength = chars.length;

  for (let i = 0; i < length; i++) {
    passwordArray[i] = chars[randomBytes[i] % charsLength];
  }

  const securePassword = passwordArray.join('');

  console.log('password generata', securePassword);
  return securePassword;
};