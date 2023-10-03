const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/users', userController.getAllUsers);

// Get User by username
router.get('/users/:userName', userController.getUserByUserName);

// Add a new user
router.post('/users', userController.createUser);

// Update user information
router.put('/users/:userId', userController.updateUser);

// Delete a user
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;