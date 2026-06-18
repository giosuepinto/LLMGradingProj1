'use strict';

const {db} = require('./db')
const crypto = require('crypto');
const {User} = require('./models')

// Retrieve a user from the database based on username and password
exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, row) => {

      // Reject the promise if there's an error
      if (err) { 
        reject(err); 
      }

      // Resolve with false if the user is not found
      else if (row === undefined) { 
        resolve(false);  
      }

      else {
        const user = new User(row.id, row.username, row.email) // Create a User object with the retrieved user data
        // eseguo l'hash della password inserita
        crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
          if (err) reject(err); // Reject the promise if there's an error during password hashing
        
          const savedPassword = Buffer.from(row.password, 'hex') // Retrieve the stored password from the database

          // Use timing-safe comparison to compare the stored and hashed passwords
          if (!crypto.timingSafeEqual(savedPassword, hashedPassword)) 
            resolve(false); // password mismatch
          
          else {
            resolve(user); // Resolve with the User object if the passwords match
          }
        });
      }
    });
  });
};

// retrieve a user from the database based on userID specified
exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.get(sql, [id], (err, row) => {

      // reject if error
      if (err) { 
        reject(err); 
      }

      // reject w/ error if user not found
      else if (row === undefined) { 
        resolve({error: 'User not found!'}); 
      }

      else {
        const user = new User(row.id, row.username, row.email) // create a User object with the retrieved user data
        resolve(user); // resolve w/ user obj
      }
    });
  });
};