const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const cors = require('cors');
const groupGenerator = require('../database');
const path = require('path');
const db = require('../database');
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
  db.retrieveUsers()
    .then((response) => {
      res.status(200).send(response);
    });
});

app.get('/history', (req, res) => {
  console.log('Getting history');
  db.retrieveHistory()
    .then((response) => {
      const historyList = [];
      res.status(200).send(response);
    });
});

app.post('/history', (req, res) => {
  const history = req.body.history;
  const promises = [];
  for (let i = 0; i < history.length; i++) {
    promises.push(
      db.retrieveUserId(history[i][1])
      .then((response) => {
        db.addGroup([history[i][0], response[0].id, history[i][2]]);
      })
      .catch((err) => {
        res.status(500).send('Error saving history');
        console.log(err);
      })
    );
  }
  Promise.all(promises).then(() => res.status(200).send('History saved'));
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

app.post('/delete', (req, res) => {
  const user = req.body.user;
  console.log('Deleting user: ', user);
  db.remove(user)
    .then(() => res.status(200).send('Deleted user!'))
    .catch((err) => {
      res.status(500).send('Error deleting user');
      console.log(err);
    });
});
