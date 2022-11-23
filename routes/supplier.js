const express = require('express')
const router = express.Router();
const { body, check } = require('express-validator');

// Memanggul Controller supplier
const suppController = require('../controllers/supplier')

// Memanggil middleware 
const AuthUser = require('../Middleware/AuthUser')

// Menambahkan Supplier
router.post('/add-supp', suppController.add_supp);
// Mengambil semua data supplier
router.get(`/list-supp`, suppController.list_supp)
// Mengambil data supplier sesuai id
router.get(`/detail/:id`, suppController.detail_supp)
// Mengupdate Supplier
router.patch(`/update/:id`, suppController.update_supp)
// Menghapus data 
router.delete(`/delete/:id`, suppController.hapus_supp)

module.exports = router