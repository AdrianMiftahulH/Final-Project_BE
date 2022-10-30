const express = require('express')
const router = express.Router();
const { body, check } = require('express-validator');

// Memanggul Controller distributor
const distController = require('../controllers/distributor')

// Menambahkan Distributor
router.post('/add-dist', distController.add_distributor);
// Mengambil semua data distributor
router.get(`/list-dist`, distController.list_distributor)
// Mengambil data distributor sesuai id
router.get(`/list-dist/detail/:id`, distController.detail_distributor)
// Mengupdate distributor
router.patch(`/update/:id`, distController.update_distributor)
// Menghapus data 
router.delete(`/list-dist/delete/:id`, distController.hapus_distributor)

module.exports = router