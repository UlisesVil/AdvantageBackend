'use strict'

const express= require('express');
const userDataController= require('../controllers/userDataController');
const multipart = require('connect-multiparty'); 

const multiPartMiddleware= multipart({
    uploadDir: './uploads'
})

const router= express.Router();

router.post('/save-userdata', userDataController.saveUserdata);
router.post('/uploadimg', multiPartMiddleware, userDataController.uploadimg);
router.post('/uploadimgBase64', userDataController.uploadimgBase64);
router.get('/getuser/:userId', userDataController.getUser);
router.post('/updateImageUrl', userDataController.updateImageUrl);

module.exports= router;