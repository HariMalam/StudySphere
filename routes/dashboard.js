const express = require('express');
const router = express.Router();
const {handleGetDashboard} = require('../controllers/dashboard')

router.get("/", handleGetDashboard);

module.exports = router;