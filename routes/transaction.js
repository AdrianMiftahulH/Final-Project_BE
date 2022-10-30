const express = require('express')
const router = express.Router();

// Memanggil Controller user
const transController = require('../controllers/transaction')


// Route Transaksi masuk
router.post('/transaction_add', transController.flow_add_product);
// Route Transaksi Keluar
router.get('/transaction_drop', transController.flow_drop_product);
// Route Pre Transaksi
router.post('/selected-product', transController.create_detail_flow);
// Route List Pre Transaksi
router.get('/list_detail_preTransaction', transController.List_DetailPreTransaction)
// Route Edit Total Product Select
router.patch('/edit_selected/:id', transController.Edit_Product_Selected)
// Route delete Product Select
router.delete('/delete_selected/:id', transController.Delete_Product_Selected);


module.exports = router