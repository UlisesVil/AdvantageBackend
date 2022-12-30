'use strict'

const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var controller={

    login: (req,res)=>{
        var userReq = req.body;
        var user = new userModel;
        user.email = userReq.email;
        user.password= userReq.password;
        const query= {email:user.email};
        if(user.email==null) return res.status(404).send({message:'No se recibieron datos del E-mail'});
        userModel.findOne(query)
            .then(userBD=>{
                if(!userBD) return res.status(404).send(
                    {message: 'No se encontro el usuario, Probablemente aun no se ha registrado'}
                );
                bcrypt.compare(user.password,userBD.password)
                    .then(match=>{
                        if(match){
                            let payload = {
                                id:userBD._id,
                                userName:userBD.userName,
                                lastName:userBD.lastName,
                                secondSurName:userBD.secondSurName,
                                email:userBD.email
                            }
                            jwt.sign(payload,process.env.SECRET_TOKEN, (error,token)=>{
                                if(error){
                                    res.status(500).send({error,message:"error returning jwt"});
                                }else{
                                    res.status(200).send({message:"You have successfully logged in Welcome", token, payload});
                                }
                            });
                        }else{
                            res.status(200).send({message:'Wrong Password'});
                        };
                    })
                    .catch(
                        error=>{
                            res.status(500).send({
                                error,
                                message:'No se permitio el acceso'
                            });
                        }
                    )
                ;
            })
            .catch(
                error=>{
                    res.status(500).send({
                        error,
                    message:'No se permitio el acceso'});
                }
            )
        ;
    },

    saveUser: (req, res)=>{
        let userReq= req.body;
        var user= new userModel;
        user.userName =  userReq.userName;
        user.lastName =  userReq.lastName;
        user.secondSurName= userReq.secondSurName;
        user.email =  userReq.email;
        user.password =  userReq.password;
        user.save((err, savedUser)=>{
                if(err) {return res.status(500).send({err, message: 'Error creating user, please check that the email and password are valid, or maybe you were already registered'});} 
                if(!savedUser) return res.status(404).send({message:'Data not received'});
                return res.status(200).send({
                    message:'User saved successfully',
                    data: savedUser
                });
            })
        ;
    },
}

module.exports= controller;
