const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

const userSQL = 'CREATE TABLE IF NOT EXISTS users(id INTEGER AUTO_INCREMENT NOT NULL, name VARCHAR(30) NOT NULL UNIQUE,PRIMARY KEY(id))';

const groupSQL = 'CREATE TABLE IF NOT EXISTS groups(id INTEGER AUTO_INCREMENT NOT NULL, group_id INTEGER, user_id INTEGER, history_id INTEGER, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id))';

db.connect((err) => {
  if (err) console.log('Error connecting...', err);
  console.log('Woohoo! Connected to the DB!');
  db.query('CREATE DATABASE IF NOT EXISTS groupGenerator', (err) => {
    if (err) console.log('Error creating DB: ', err);
    db.query('USE groupGenerator', (err) => {
      if (err) console.log('Error using DB: ', err);
      db.query('DROP TABLE IF EXISTS users', (err) => {
        if (err) console.log('Error dropping users table');
        db.query(userSQL, (err) => {
          if (err) console.log('Error creating users table');
          db.query('DROP TABLE IF EXISTS groups', (err) => {
            if (err) console.log('Error dropping groups table');
            db.query(groupSQL, (err) => {
              if (err) console.log('Error creating groups table: ', err);
            });
          });
        });
      });
    });
  });
});

module.exports = {
  add: (name) => {
    const sql = 'REPLACE INTO users (name) VALUES (?)';
    return new Promise((resolve, reject) => {
      db.query(sql, `${name}`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  retrieveUsers: () => {
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
  },

  retrieveUserId: (name) => {
    const sql = 'SELECT * FROM users WHERE name = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, `${name}`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  remove: (name) => {
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
  },

  retrieveHistory: () => {
    const sql = 'SELECT g.group_id, g.history_id, u.name FROM groups g JOIN users u ON g.user_id = u.id ORDER BY history_id DESC, group_id DESC';
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  addGroup: (users) => {
    const sql = 'INSERT INTO groups (group_id, user_id, history_id) VALUES (?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [users], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
