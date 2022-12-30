'use strict'

var express= require('express');
const app= express();


//load Templates
const advantageBackendMainPage= require('./templates/advantageBackendMainPage');

//Load English-APP Routes
const user_routes= require('./advantageApp/routes/user_routes');
const userdata_routes= require('./advantageApp/routes/userdata_routes');
const multipart = require('connect-multiparty'); 

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE,PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Backend Angular Projects Main Page  
app.get('/',(req,res)=>{
    res.status(200).send( advantageBackendMainPage );
});

//Advange-APP Routes
app.use('/advantageApp', user_routes);
app.use('/advantageApp', userdata_routes);



module.exports = app;