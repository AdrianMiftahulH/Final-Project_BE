const express = require('express')
const router = express.Router();

// Menghubungkan dengan controller kategori
const proController = require('../controllers/product')

// Router membuat 
router.post('/create-product', proController.create_product);
// Router list semua data 
router.get('/list-product', proController.list_product)
// Router detail
router.get('/detail/:id', proController.detail_product)
// Router edit 
router.put('/update', proController.update_product)
// Router hapus data 
router.delete('/delete/:id', proController.delete_product)

module.exports = router