'use strict';

const {db} = require('./db');
const { Seat } = require('./models');

/** SEATS **/

// get all the occupied seats on the database
exports.getSeats = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM seats';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err); // reject if error
        }
        const seats = rows.map((s) => new Seat(s.planeType, s.code, s.status, s.userID));
        resolve(seats); // resolve w/ array of seats obj
      });
    });
}

// delete seats on the database based on userID and airplane type
exports.deleteSeats = (userID, type) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM seats WHERE userID = ? AND planeType = ?';
    db.all(sql, [userID,type], (err, rows) => {
      if (err) {
        reject(err); // reject if error
      }
      resolve(this.lastID); // resolve w/ ID of last deleted seats
    });
  });
}

// save seat on the database with userID, plane type and seat code specified
exports.saveSeat = (userID, type, seat) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO seats(planeType,userID,code) VALUES (?,?,?)';
    db.run(sql, [type,userID,seat], function(err) {
      if (err) reject(err); // reject if error
      else resolve(this.lastID); // resolve w/ ID of seat inserted 
    });
  });
}

