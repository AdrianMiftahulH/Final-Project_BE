const express = require('express')
const router = express.Router();

const { add_supp, list_supp, detail_supp, update_supp, hapus_supp } = require('../controllers/supplier')

router.post('/add-supp', add_supp);

router.get('/list-supp', list_supp)

router.get('/list-supp/detail', detail_supp)

router.put('/supplier/update', update_supp)

router.delete('/list-supp/delete', hapus_supp)

module.exports = router