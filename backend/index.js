import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "redis";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const app = express();
const jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     console.log(`Received a ${req.method} request on ${req.url}`);
//     next();
//   });

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

const client = createClient({
  url: process.env.REDIS_URL,
});

await client.connect().then(() => {});
client.on("error", (err) => console.log("Redis Client Error", err));

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
  const createTableQuery = `CREATE TABLE IF NOT EXISTS user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    prog_lang VARCHAR(255) NOT NULL,
    stdin TEXT,
    src_code TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

  connection.query(createTableQuery, (err, results) => {
    if (err) throw err;
  });
});

app.post("/submit", async (req, res) => {
  const post = {
    username: req.body.username,
    prog_lang: req.body.value.anchorKey,
    stdin: req.body.stdin,
    src_code: req.body.srccode,
  };
  await client.del("table");
  const sql = "INSERT INTO user_data SET ?";
  connection.query(sql, post, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.get("/getdata", async (req, res) => {
  const sql = "SELECT * FROM user_data";
    let help;
    const result = await client.get("table");
    if(result){
        res.send(result);
    }else{
        connection.query(sql,async (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).send('Server error');
            } else {
              help = results;
              await client.set("table", JSON.stringify(help), 3600)
              res.status(200).send(results);
            }
        });
    }

});

app.listen(4000, () => {});
