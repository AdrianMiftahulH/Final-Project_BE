const express = require('express')
const router = express.Router();

// Memanggul Controller reseller
const resController = require('../controllers/reseller')

// Menambahkan reseller
router.post('/add-reseller', resController.add_reseller);
// Mengambil semua data reseller
router.get(`/list-reseller`, resController.list_reseller)
// Mengambil data reseller sesuai id
router.get(`/detail/:id`, resController.detail_reseller)
// Mengupdate reseller
router.patch(`/update/:id`, resController.update_reseller)
// Menghapus data 
router.delete(`/delete/:id`, resController.hapus_reseller)

module.exports = router