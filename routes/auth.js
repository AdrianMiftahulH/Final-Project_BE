const express = require('express')
const router = express.Router();

// Middleware
const VerifyToken = require('../Middleware/VerifyToken')
const AuthUser = require('../Middleware/AuthUser')
// Memanggil Controller auth
const authController = require('../controllers/auth');

// Mengecek sudah login atau belum
router.get('/token', authController.RefreshToken)
// Login
router.post('/login', authController.Login)
// Logout
router.delete('/logout', authController.logOut)

module.exports = router