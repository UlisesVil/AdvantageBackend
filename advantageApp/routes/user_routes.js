'use strict'

const express= require('express');
const userController= require('../controllers/userController');

const router= express.Router();

router.post('/save-user', userController.saveUser);
router.post('/login', userController.login);

module.exports= router;