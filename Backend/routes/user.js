const formController = require('../controllers/user')

const express = require('express');

const router = express.Router();

router.get('/',formController.getForm);

router.post('/add-user', formController.postUser);

module.exports = router;