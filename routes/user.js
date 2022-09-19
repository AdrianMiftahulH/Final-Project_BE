const express = require('express')
const router = express.Router();

const userController = require('../controllers/user')

router.get('/list-user', userController.list_user)

router.get('/detail', userController.detail_user)

router.put('/update', userController.update_user)

router.delete('/delete', userController.delete_user)

module.exports = router