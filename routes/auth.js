const express = require('express')
const router = express.Router();

// Memanggil Controller user
const authController = require('../controllers/auth')

// Mengambil semua data
router.get('/me', authController.Me)
// Menmbahkan data user
router.post('/login', authController.Login)
// Menghapus data user sesuai id
router.delete('/logout', authController.logOut)

module.exports = router