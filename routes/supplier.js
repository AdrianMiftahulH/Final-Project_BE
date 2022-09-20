const express = require('express')
const router = express.Router();

// Memanggul Controller supplier
const suppController = require('../controllers/supplier')

// Menambahkan Supplier
router.post('/add-supp', suppController.add_supp);
// Mengambil semua data supplier
router.get('/list-supp', suppController.list_supp)
// Mengambil data supplier sesuai id
router.get('/list-supp/detail', suppController.detail_supp)
// Mengupdate Supplier
router.put('/supplier/update', suppController.update_supp)
// Menghapus data 
router.delete('/list-supp/delete', suppController.hapus_supp)

module.exports = router