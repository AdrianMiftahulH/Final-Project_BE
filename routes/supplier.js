const express = require('express')
const router = express.Router();

const suppController = require('../controllers/supplier')

router.post('/add-supp', suppController.add_supp);

router.get('/list-supp', suppController.list_supp)

router.get('/list-supp/detail', suppController.detail_supp)

router.put('/supplier/update', suppController.update_supp)

router.delete('/list-supp/delete', suppController.hapus_supp)

module.exports = router