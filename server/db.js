const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'K1u2s3h4@',
  database: 'ExamSystem'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.message);
  } else {
    console.log('Connected to MySQL database.');
  }
});

module.exports = db;
