const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'myDB'
});

connection.connect();

const app = express().use(express.json()).use(cors()).use(events(connection));
const port = process.env.PORT || 3080;
const path = require('path');
const users = [];

app.use(express.static(path.join(__dirname, "dist")));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'angular-ui', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});