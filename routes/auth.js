const express = require('express')
const router = express.Router();

// menghubungkan dengan controller
const authController = require('../controllers/auth');

// Router Register 
router.post('/register', authController.register);

module.exports = router