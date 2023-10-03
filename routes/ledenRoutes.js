const express = require('express');
const router = express.Router();
const ledenController = require('../controllers/ledenController');

// Get all leden
router.get('/leden', ledenController.getAllLeden);

// Get Leden by afdeling ID
router.get('/leden/:afdelingId', ledenController.getLedenByAfdelingId);

// Get Leden by Lid ID
router.get('/leden/lidId/:lidId', ledenController.getLedenByLidId);

// Count all leden
router.get('/leden/count', ledenController.countAllLeden);

// Update Lid Checkbox state
router.put('/leden/updateCheckbox/:lidId', ledenController.updateLidCheckbox);

// Add a new Lid
router.post('/leden/addUser', ledenController.addNewLid);

// Define more leden routes here...

module.exports = router;
