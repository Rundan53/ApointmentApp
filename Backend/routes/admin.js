const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/getUsers', adminController.getUsers);

router.delete('/deleteUser/:id', adminController.deleteUser)

module.exports = router;