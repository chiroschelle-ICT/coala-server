const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors middleware
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;

// Configure body-parser to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
// --- User Routes
// Get all users
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

// Get User per Username
app.get('/api/users/:userName', (req, res) => {
  const userName = req.params.userName;

  if(!userName) {
    return res.status(400).send('Missing required parameter: userName');
  }

  const query = 'SELECT naam, email, password FROM users WHERE naam = ?';

  db.query(query, [userName], (err, results) => {
    if(err){
      console.err('ERROR querying database: ' + err.stack);
      res.status(500).send('Error Querying Database');
      return;
    }
    res.json(results);
  });
});

// --- Leden Routes
// Get All Leden
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
// Count All Leden
app.get('/api/leden/count', (req, res) =>  {
  db.query('SELECT COUNT(*) AS count FROM leden', (err, results) => {
    if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Error querying database');
          return;
      }
      res.json(results);
  });
});


//  Get leden Per afdeling ID
app.get('/api/leden/:afdelingId', (req, res) =>  {
  const afdId = req.params.afdelingId;

  if (!afdId) {
    return res.status(400).send('Missing required parameter: afdelingId');
  }

  const query = 'SELECT * FROM leden WHERE afdelingId = ?';

  db.query(query, [afdId], (err, results) => {
    if (err) {
      console.error('ERROR querying database: ' + err.stack);
      res.status(500).send('Error Querying Database');
      return;
    }
    res.json(results);
  });
});

// Get Leden Per LidId
app.get('/api/leden/lidId/:lidId', (req, res) =>  {
  const afdId = req.params.lidId;

  if (!afdId) {
    return res.status(400).send('Missing required parameter: lidId');
  }

  const query = 'SELECT * FROM leden WHERE id = ?';

  db.query(query, [afdId], (err, results) => {
    if (err) {
      console.error('ERROR querying database: ' + err.stack);
      res.status(500).send('Error Querying Database');
      return;
    }
    res.json(results);
  });
});

// Change Lid Checkbox state
app.put('/api/leden/updateCheckbox/:lidId', (req, res) => {

  console.log(req.body)
  const lidId = req.params.lidId;
  const newCheckboxState = req.body.checkData;
  if (!lidId) {
    return res.status(400).send('Missing required parameter: lidId');
  }
  if (typeof newCheckboxState !== 'boolean') {
    return res.status(400).send('Invalid checkbox state');
  }

  const query = 'UPDATE leden SET lidgeldBetaald = ? WHERE id = ?';
  db.query(query, [newCheckboxState, lidId], (err, results) => {
    if (err) {
      console.error('ERROR querying database: ' + err.stack);
      return res.status(500).send('Error Querying Database');
    }
    res.json({ message: 'Checkbox state updated successfully' });
  });
});

app.post('/api/leden/addUser', (req, res) => {
  const naam = req.body.naam;
  const voornaam = req.body.voornaam;
  const afdeling = req.body.afdeling;
  const afdelingId = req.body.afdelingId;
  const email = req.body.email;
  const telefoon = req.body.telefoon;
  const straat = req.body.straat;
  const huisnummer = req.body.huisnummer;
  const postcode = req.body.postcode;
  const gemeente = req.body.gemeente;

  const query =
    'INSERT INTO leden (id, naam, voornaam, afdeling, afdelingId, email, telefoon, Straat, Huisnummer, Gemeente, Postcode, lidgeldBetaald) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)';

  db.query(
    query,
    [
      naam,
      voornaam,
      afdeling,
      afdelingId,
      email,
      telefoon,
      straat,
      huisnummer,
      gemeente,
      postcode,
    ],
    (err, results) => {
      if (err) {
        console.error('ERROR querying database: ' + err.stack);
        return res.status(500).send('Error Querying Database');
      }
      res.json({ message: 'New Lid successfully added' });
    }
  );
});

// add new lid

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});