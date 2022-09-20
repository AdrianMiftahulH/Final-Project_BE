const express = require('express')
const router = express.Router();

// Menghubungkan dengan controller kategori
const katController = require('../controllers/kategori')

// Router menambahkan 
router.post('/add-kat', katController.add_kat);
// Router list semua data 
router.get('/list-kat', katController.list_kat)
// Router edit 
router.put('/kategori/update', katController.update_kat)
// Router hapus data 
router.delete('/list-kat/delete', katController.hapus_kat)

module.exports = router