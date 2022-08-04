const UsarioModel = require('../models/Usuario.model');
const { request } = require("express");
const express = require("express");
const usuarioModel = require('../models/Usuario.model');
const router = express.Router();

router.get("/", (req,resp) => {
    UsarioModel.find()
    .then((usuario) => {
    return resp.status(200).json({
        msg: "USe consultaron los usuarios correctamente",
        status : 200,
        cont: {
            usuario
        }
    }); 
})
    .catch((err) => {
        return resp.status(500).json({
            msg: "Erro al consultar los usuarios",
            status : 500,
            cont: {
                error: err
            }
        });
    });
});    
router.get("/:id/:nombre/:apellido/:edad", (request, response) => {

const {id, nombre, apellido, edad} = request.params;

if(Number(edad).toString()==="NaN"){

    return response.status(400).json({
        "message":"El valor ingresado en la edad es invalido"
    })
   }

return response.status(200).json({
           "message": "Estás dentro de la API GET Usuario",
           id,
           nombre,
           apellido,
           edad: Number(edad)
           
       });
   
   });
   router.get("/:id", (req, resp) => {
   const idusuario = req.params.id;
   usuarioModel.findOne({_id: idusuario})
   .then((usuario)=>{
    return resp.status(200).json({
        "message": "Se consultaron los usuarios correctamente",
        status:200,
        cont:{
            usuario
        }
    });
   })
   .catch((err)=>{
    return resp.status(500).json({
        "message": "Se consultaron los usuarios correctamente",
        status:500,
        cont:{
            err:error
        }
     });
 });
});

router.post("/enviarEmail", (req, res) => {
    const strNombre =req.body.strNombre;
     const strCorreo = req.body.strCorreo;
     const strPrimerApellido = req.body.strPrimerApellido;
     const strSegundoApellido = req.body.strSegundoApellido;
     const nmbEdad = req.body.nmbEdad;

    Email.sendEmail(strCorreo, {strNombre, strCorreo, strPrimerApellido, strSegundoApellido, nmbEdad})
    .then((response) =>{
        return res.status(200).json({
            msg: "Enviado exitosamente",
            status: 200,
            cont: {
                response
            }
        });
    })
    .catch((error) => {
        return res.status(200).json({
            msg: "Error ",
            status: 200,
            cont: {
                error: error.message
            }
        });
    });
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

router.delete("/", (request, response) => {
    
    UsuarioModel.findByIdAndRemove({_id:""},{new: true},
    function(error, info){
        if(error){
        res.json ({
        resultado: false,
        msg: "No se pudo eliminar",
        err    
        });
} else {
    res.json({
        resultado: true,
        msg: "Se ha eliminado correctamente"
    });
}
});
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