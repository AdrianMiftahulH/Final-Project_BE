const express = require('express')
const router = express.Router();
const { body, check } = require('express-validator');

// Memanggul Controller supplier
const suppController = require('../controllers/supplier')

// Menambahkan Supplier
router.post(
    '/add-supp',
    check('mobile','Mobile Invalid!').isMobilePhone(['id-ID']),
    suppController.add_supp);
// Mengambil semua data supplier
router.get(`/list-supp`, suppController.list_supp)
// Mengambil data supplier sesuai id
router.get(`/list-supp/detail/:id`, suppController.detail_supp)
// Mengupdate Supplier
router.patch(`/update/:id`, suppController.update_supp)
// Menghapus data 
router.delete(`/list-supp/delete/:id`, suppController.hapus_supp)

module.exports = router