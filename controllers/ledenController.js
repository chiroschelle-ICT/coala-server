const db = require('../database'); // Import your database connection

// Get All Leden
exports.getAllLeden = (req, res) => {
  db.query('SELECT * FROM leden', (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Error querying database');
      return;
    }
    res.json(results);
  });
};

// Count All Leden
exports.countAllLeden = (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM leden', (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Error querying database');
      return;
    }
    res.json(results);
  });
};

// Get Leden by afdeling ID
exports.getLedenByAfdelingId = (req, res) => {
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
};

// Get Leden by Lid ID
exports.getLedenByLidId = (req, res) => {
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
};

// Change Lid Checkbox state
exports.updateLidCheckbox = (req, res) => {
  console.log(req.body);
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
};

// Add a new Lid
exports.addNewLid = (req, res) => {
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
};
