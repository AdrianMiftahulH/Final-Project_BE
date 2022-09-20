const express = require('express')
const router = express.Router();

// menghubungkan dengan controller auth
const authController = require('../controllers/auth');
// middleware verify
// const verifyUser = require('../config/verify')

// Router Register form 
// router.post('/register', authController.formRegister);
// Router aksi Register
router.post('/register/save', authController.saveRegister);

// Router Login Form

module.exports = router