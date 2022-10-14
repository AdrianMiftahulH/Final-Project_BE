const express = require('express')
const router = express.Router();
const VerifyUser = require('../Middleware/AuthUser')
// Memanggil Controller user
const userController = require('../controllers/user')

// Mengambil semua data
router.get('/list-user', VerifyUser.VerifyUser, VerifyUser.superAdminOnly, userController.list_user)
// Mengambil data sesuai id
router.get('/detail/:id', VerifyUser.VerifyUser, VerifyUser.superAdminOnly, userController.detail_user)
// Menmbahkan data user
router.post('/create', VerifyUser.superAdminOnly, userController.add_user)
// Mengupdate data user
router.patch('/update/:id', VerifyUser.VerifyUser, VerifyUser.superAdminOnly, userController.update_user)
// Menghapus data user sesuai id
router.delete('/delete/:id', VerifyUser.VerifyUser, VerifyUser.superAdminOnly, userController.delete_user)

module.exports = router