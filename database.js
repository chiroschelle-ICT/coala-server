const mysql = require('mysql');

// Create a MySQL database connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coala_beta_database',
});

// Check the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
  connection.release();
});

module.exports = db;
