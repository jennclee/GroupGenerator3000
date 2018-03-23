const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Promise = require('bluebird');
const cors = require('cors');
const groupGenerator = require('../database');
const path = require('path');
const PORT = '8080';

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect((err) => {
  if (err) console.log('Error connecting...', err)
  console.log('Woohoo! Connected to the DB!')
  db.query('CREATE DATABASE IF NOT EXISTS groupGenerator', (err) => {
    if (err) console.log('Error creating DB: ', err);
    db.query('USE groupGenerator', (err) => {
      if (err) console.log('Error using DB: ', err);
    });
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
  console.log(`Visit 127.0.0.1:${PORT} to view app`)
});