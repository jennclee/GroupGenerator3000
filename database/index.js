const mysql = require('mysql');
const Promise = require('bluebird');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect((err) => {
  if (err) console.log('Error connecting...', err);
  console.log('Woohoo! Connected to the DB!');
  db.query('CREATE DATABASE IF NOT EXISTS groupGenerator', (err) => {
    if (err) console.log('Error creating DB: ', err);
    db.query('USE groupGenerator', (err) => {
      if (err) console.log('Error using DB: ', err);
      db.query('DROP TABLE IF EXISTS users', (err) => {
        if (err) console.log('Error dropping table');
        db.query('CREATE TABLE IF NOT EXISTS users(id INTEGER AUTO_INCREMENT NOT NULL, name VARCHAR(30) NOT NULL,PRIMARY KEY(id))', (err) => {
          if (err) console.log('Error creating table');
        });
      });
    });
  });
});

module.exports.add = (name) => {
  const sql = 'INSERT IGNORE INTO users (name) VALUES (?)';
  return new Promise((resolve, reject) => {
    db.query(sql, `${name}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.retrieve = () => {
  const sql = 'SELECT * FROM users';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.remove = (name) => {
  const sql = 'DELETE FROM users WHERE name = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, `${name}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
