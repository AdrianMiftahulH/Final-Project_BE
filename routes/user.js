const express = require('express')
const router = express.Router();

// Memanggil Controller user
const userController = require('../controllers/user')

// memanggil middleware
const AuthUser = require('../Middleware/AuthUser')

// Mengambil semua data
router.get('/list-user', userController.list_user)
// Mengambil data sesuai id
router.get('/detail/:id', userController.detail_user)
// Menmbahkan data user
router.post('/create', userController.add_user)
// Mengupdate data user
router.patch('/update/:id', userController.update_user)
// Menghapus data user sesuai id
router.delete('/delete/:id', userController.delete_user)

module.exports = router