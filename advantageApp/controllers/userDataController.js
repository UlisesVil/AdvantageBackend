'use strict'

const userDataModel = require('../models/userDataModel');
const uploadImage= require("../../uploadImage");

var controller={

    saveUserdata: (req, res)=>{
        let userDataReq= req.body;
        var userData= new userDataModel;
        userData.userId =  userDataReq.userId;
        userData.userName =  userDataReq.userName;
        userData.lastName =  userDataReq.lastName;
        userData.secondSurName= userDataReq.secondSurName;
        userData.email =  userDataReq.email;
        userData.birthDate =  userDataReq.birthDate;
        userData.save((err, savedUserData)=>{
                if(err) {return res.status(500).send({err, message: 'Error creating userData, please check that the email and password are valid, or maybe you were already registered'});} 
                if(!savedUserData) return res.status(404).send({message:'Data not received'});
                return res.status(200).send({
                    message:'User Student saved successfully',
                    data: savedUserData
                });
            })
        ;
    },

    uploadimg: (req, res)=>{
        res.json({
            'message':'Fichero subido correctamente!'
        });
    },

    uploadimgBase64: (req, res)=>{
        let imageBase64=req.body.base64image;        
        uploadImage(imageBase64)
        .then((url)=>{
            return res.status(200).send({
                message:'Imagen Guardada en Cloudinary',
                imageUrl: url,
                });
            })
            .catch((err)=>{
                return res.status(500).send({
                    err,
                message:'No se pudo guardar la imagen vuelva a intentarlo'})
            }
        );
    },

    getUser: async (req,res)=>{
        let userId=req.params;
        userDataModel.findOne(userId)
            .then(getUser=>{
                if(!getUser) return res.status(404).send(
                    {message: 'No se encontro el usuario, Probablemente aun no se ha registrado'}
                );
                return res.status(200).send(
                    {
                        data:getUser,
                        message: 'Usuario encontrado'
                    }
                );
            }).catch(
                error=>{
                    res.status(500).send({
                        error,
                    message:'No se encontro el Usuario'});
                }
            )
        ;
    },

    updateImageUrl:async(req,res)=>{
        let userId=req.body.userId;
        let url=req.body.url;
        const userUpdated = await userDataModel.findByIdAndUpdate(
            userId,
            {
                signature: url,
            },
            { sort: { "points" : 1 }, upsert:false, returnOriginal : false }
        );
        return res.status(200).send({
            data:userUpdated,
            messageData:'El Usuario fue Actualizado exitosamente'
        });
    }
}

module.exports= controller;
