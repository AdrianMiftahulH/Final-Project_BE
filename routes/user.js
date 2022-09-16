const express = require('express')
const router = express.Router();

const { add_user, list_user, detail_user, update_user, delete_user } = require('../controllers/user')

router.post('/register', add_user)

router.get('/list-user', list_user)

router.get('/list-user/detail', detail_user)

router.put('/update', update_user)

router.delete('/list-user/delete', delete_user)

module.exports = router