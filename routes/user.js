const express = require('express')
const router = express.Router();

// Memanggil Controller user
const userController = require('../controllers/user')

// Mengambil semua data
router.get('/list-user', userController.list_user)
// Mengambil data sesuai id
router.get('/detail', userController.detail_user)
// Mengupdate data user
router.put('/update', userController.update_user)
// Menghapus data user sesuai id
router.delete('/delete', userController.delete_user)

module.exports = router