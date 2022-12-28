'use strict'

const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var controller={

    login: (req,res)=>{
        var userReq = req.body;
        console.log(userReq, 'user del req');
        
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

                const userRecovered=userBD;
                const userId={userId:userRecovered._id.toString()};

                function getToken(userPassword, userBDPassword){
                    bcrypt.compare(userPassword, userBDPassword)
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
                }

                getToken(user.password,userBD.password);

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

        console.log(req.body);
        let userReq= req.body;
        var user= new userModel;

        user.userName =  userReq.userName;
        user.lastName =  userReq.lastName;
        user.secondSurName= userReq.secondSurName;
        user.email =  userReq.email;
        user.password =  userReq.password;

        user.save((err, savedUser)=>{
                if(err) {return res.status(500).send({err, message: 'Error creating user '+userType+', please check that the email and password are valid, or maybe you were already registered'});} 
                if(!savedUser) return res.status(404).send({message:'Data not received'});
                return res.status(200).send({
                    message:'User Student saved successfully',
                    data: savedUser
                });
            })
        ;

    },


    // getUser: async (req,res)=>{
    //     console.log(req.body);
    //     let email=req.body;

    //     userModel.findOne(email)
    //         .then(getUser=>{
    //             console.log(getUser);

    //             if(!getUser) return res.status(404).send(
    //                 {message: 'No se encontro el usuario, Probablemente aun no se ha registrado'}
    //             );
        
    //             return res.status(200).send(
    //                 {
    //                     data:getUser,
    //                     message: 'Usuario encontrado'
    //                 }
    //             );
    //         }).catch(
    //             error=>{
    //                 res.status(500).send({
    //                     error,
    //                 message:'No se encontro el Usuario'});
    //             }
    //         )
    //     ;
    // },

}

module.exports= controller;
