const express = require('express')
const router = express.Router();

// Menghubungkan dengan controller kategori
const barController = require('../controllers/barang')

// Router menambahkan 
router.post('/add-bar', barController.add_bar);
// Router list semua data 
router.get('/list-bar', barController.list_bar)
// Router detail
router.put('/detail', barController.detail_bar)
// Router edit 
router.put('/update', barController.update_bar)
// Router hapus data 
router.delete('/delete', barController.hapus_bar)

module.exports = router