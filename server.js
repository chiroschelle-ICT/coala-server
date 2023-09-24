const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors middleware
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password
  database: 'coala_beta_database', // Name of your database
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Configure CORS to allow requests from http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200', // Update with your Angular app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Create a route to fetch data from MySQ
// --- user Fetching
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(results);
    });
});
// --- Leden Fetching
app.get('/api/leden', (req, res) =>  {
    db.query('SELECT * FROM leden', (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(results);
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });