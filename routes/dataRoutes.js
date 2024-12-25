const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/process-data', dataController.processData);

module.exports = router;
