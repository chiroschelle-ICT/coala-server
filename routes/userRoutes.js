const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/users', userController.getAllUsers);

// GET User by username
router.get('/users/:userName', userController.getUserByUserName);

// GET user by id
router.get('/users/:id', userController.getUserById);

// GET user by LidId
router.get('/users/:LidId', userController.getUserByLidId);

// ADD a new user
router.post('/users/addUser', userController.createUser);

// UPDATE user information
router.put('/users/:userId', userController.updateUser);

// DELETE a user
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;