const express = require('express')
const router = express.Router();

// Memanggil Controller auth
const authController = require('../controllers/auth')

// Mengecek sudah login atau belum
router.get('/me', authController.Me)
// Login
router.post('/login', authController.Login)
// Logout
router.delete('/logout', authController.logOut)

module.exports = router