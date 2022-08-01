const usarioModel = require('../models/empresa.model');
const { request } = require("express");
const express = require("express");
const router = express.Router();

router.get("/", (req,resp) => {
    usarioModel.find()
    .then((usuario) => {
    return resp.status(200).json({
        msg: "USe consulto la empresa correctamente",
        status : 200,
        cont: {
            usuario
        }
    }); 
})
    .catch((err) => {
        return resp.status(500).json({
            msg: "Erro al consultar la empresa",
            status : 500,
            cont: {
                error: err
            }
        });
    });
});    
router.get("/:id", (request, response) => {
//const id=request.params.id;
//especifico
const {id} = request.params;

if(Number(edad).toString()==="NaN"){

    return response.status(400).json({
        "message":"El id buscado no se encuentra"
    })
   }

return response.status(200).json({
           "message": "Estás dentro de la API GET Usuario",
           id
       });
   
   });
   router.get("/usuarioBusqueda", (req, resp) => {

   const id = req.query.id;
   const nombre =req.query.nombre;
    resp.status(200).json({
           "message": "Se consulto la API usuarioBusqueda exitosamente",
           id
       });
   
   });

router.post("/", (req, resp) => {
    const usuario = new UsarioModel(req.body);
   usuario.save()
   .then((usuarioRegistrado) =>{
       return resp.status(200).json({
           "message": "Usuario registrado exitosamente",
           status:200,
           cont:{
           usuario:usuarioRegistrado
           }
       });
   
    })
    .catch((err)=>{
        return resp.status(500).json({
            msg:"Error al registrar el usuario",
            status: 500,
            cont:{
                error: err
            }
        })
           })

});

router.put("/", (req, resp) => {
    const usuario = new UsarioModel(req.body);
   usuario.save().then((usuarioRegistrado) =>{
       return resp.status(200).json({
           "message": "registrado exitosamente",
           status:200,
           cont:{
           usuario:usuarioRegistrado
           }
       });
   
    })
    .catch((err)=>{
        return resp.status(500).json({
            msg:"Error al registrar el usuario",
            status: 500,
            cont:{
                error: err
            }
        })
           })

});

router.delete("/", (req, resp) => {
    const usuario = new UsarioModel(req.body);
   usuario.save().then((usuarioRegistrado) =>{
       return resp.status(200).json({
           "message": "Usuario eliminado exitosamente",
           status:200,
           cont:{
           usuario:usuarioRegistrado
           }
       });
   
    })
    .catch((err)=>{
        return resp.status(500).json({
            msg:"Error al eliminar el usuario",
            status: 500,
            cont:{
                error: err
            }
        })
           })

});

router.post("/login",(request,response) => {

    const email = request.body.correoElectronico;
    const password = request.body.password;

    UsuarioModel.findOne({"email":email,"password":password})
    .then ((usuarioLogeado) =>{ 
        if(usuarioLogeado == null){
            return response.status(500).json({
                message : "Autenticacion Fallida",

            });

        }else{
            
                return response.status(200).json({
                    message : "Autenticacion Exitosa",
                  
                 });
        }
    })
    });

module.exports = router;