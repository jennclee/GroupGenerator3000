const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const cors = require('cors');
const groupGenerator = require('../database');
const path = require('path');
const db = require('../database/index');
const PORT = '8080';

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
  console.log(`Visit 127.0.0.1:${PORT} to view app`)
});

app.get('/users', (req, res) => {
  console.log('Getting users');
  db.retrieve()
    .then((response) => {
      res.status(200).send(response);
    });
});

app.post('/user', (req, res) => {
  const user = req.body.user;
  console.log('Posting user: ', user);
  db.add(user)
    .then(() => res.status(200).send('Saved user!'))
    .catch((err) => {
      res.status(500).send('Error saving user');
      console.log(err);
    });
});
