'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var userDataSchema= Schema({
    userId:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    secondSurName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    birthDate:{
        type: Date,
        required:true
    },
    signature:{
        type: String,
        default:"no-image"
    }
});


module.exports= mongoose.model('userData', userDataSchema);