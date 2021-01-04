const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');


var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.png'));

app.use('/api/recipes', require('./api/recipes'));

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT);

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
      return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`);
  });

module.exports = app;