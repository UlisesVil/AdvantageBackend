'use strict'

require('dotenv').config();
var mongoose= require('mongoose');
var app=require('./app');
var PORT = process.env.PORT || 3700;

mongoose.Promise=global.Promise;
mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB_CONNECT,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }).then(()=>{
        console.log('----Data Base Connection Succesfull established----');
        app.listen(PORT,()=>{
            console.log("----Server runing on port: "+PORT+"----");
        });
    }).catch(
        err=>console.log(err)
    )
;