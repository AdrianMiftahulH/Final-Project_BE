const express = require('express')
const router = express.Router();

// Menghubungkan ke Controller Flow
const flowController = require('../controllers/flow')

// Router menambahkan 
router.post('/add-bar', flowController.add_bar);
// Router List Flow
router.get('/list-flow', flowController.list_flow)
// Router detail FLow
// router.get('/detail/:id', flowController.detail_flow)

module.exports = router