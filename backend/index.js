const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();

var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');

  let createTableQuery = `CREATE TABLE IF NOT EXISTS user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    prog_lang VARCHAR(255) NOT NULL,
    stdin TEXT,
    src_code TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

  connection.query(createTableQuery, (err, results) => {
    if (err) throw err;
    console.log('Table created or already exists.');
  });
});


app.post("/submit", async (req, res) => {
  let post = {
    username: req.body.username,
    prog_lang: req.body.value.anchorKey,
    stdin: req.body.stdin,
    src_code: req.body.srccode
  };
  let sql = 'INSERT INTO user_data SET ?';
  connection.query(sql, post, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
});

app.get("/getdata", async (req, res) => {
  let sql = 'SELECT * FROM user_data';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(4000, () => {
  console.log("Liseting on port 4000");
});
