'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema= mongoose.Schema;

var userSchema= Schema({
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
    password:{
        type: String,
        required:true
    }
});

userSchema.pre('save', function(next){
    bcrypt.genSalt(10).then(salts=>{
        bcrypt.hash(this.password, salts).then(hash=>{
            this.password = hash;
            next();
        }).catch(error=>next(error));
    }).catch(error=>next(error));
});

module.exports= mongoose.model('user', userSchema);