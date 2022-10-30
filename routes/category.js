const express = require('express')
const router = express.Router();

// Memanggul Controller category
const cateController = require('../controllers/category')



// Menambahkan category
router.post('/add-cate', cateController.add_category);
// Mengambil semua data category
router.get(`/list-cate`, cateController.list_category)
// Mengambil data category sesuai id
router.get(`/list-cate/detail/:id`, cateController.detail_category)
// Mengupdate category
router.patch(`/update/:id`, cateController.update_category)
// Menghapus data 
router.delete(`/list-cate/delete/:id`, cateController.hapus_category)

module.exports = router