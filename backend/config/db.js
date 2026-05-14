const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 3307,   // ADD THIS
  user: "root",
  password: "",
  database: "feature_flags_db",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;