const express = require('express')
const router = express.Router();

// Menghubungkan dengan controller
const { add_kat, list_kat, detail_kat, update_kat, hapus_kat } = require('../controllers/kategori')

// Router menambahkan 
router.post('/add-kat', add_kat);
// Router list semua data 
router.get('/list-kat', list_kat)
// Router list sesuai id 
router.get('/list-kat/detail', detail_kat)
// Router edit 
router.put('/kategori/update', update_kat)
// Router hapus data 
router.delete('/list-kat/delete', hapus_kat)

module.exports = router