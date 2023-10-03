const db = require('../database'); // Import your database connection


// Get all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Error querying database');
      return;
    }
    res.json(results);
  });
};

// Get User by username
exports.getUserByUserName = (req, res) => {
  const userName = req.params.userName;

  if (!userName) {
    return res.status(400).send('Missing required parameter: userName');
  }

  const query = 'SELECT naam, email, password FROM users WHERE naam = ?';

  db.query(query, [userName], (err, results) => {
    if (err) {
      console.error('ERROR querying database: ' + err.stack);
      res.status(500).send('Error Querying Database');
      return;
    }
    res.json(results);
  });
};

// Add a new user
exports.createUser = (req, res) => {
  // Extract user data from the request body
  const { name, email, password } = req.body;

  // Perform validation checks on user data

  // Insert the new user into the database
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('ERROR querying database: ' + err.stack);
      res.status(500).send('Error Querying Database');
      return;
    }
    res.json({ message: 'User created successfully' });
  });
};

// Update user information
exports.updateUser = (req, res) => {
  // Extract updated user data from the request body
  const { name, email, password } = req.body;
  const userId = req.params.userId;

  // Perform validation checks on user data

  // Update the user in the database
  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';

  db.query(query, [name, email, password, userId], (err, results) => {
    if (err) {
      console.error('ERROR querying database: ' + err.stack);
      res.status(500).send('Error Querying Database');
      return;
    }
    res.json({ message: 'User updated successfully' });
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).send('Missing required parameter: userId');
  }

  // Delete the user from the database
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('ERROR querying database: ' + err.stack);
      res.status(500).send('Error Querying Database');
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
};