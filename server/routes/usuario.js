const usarioModel = require('../models/usuario.model');
const express = require("express");
const usuarioModel = require('../models/usuario.model');
const router = express.Router();
const Email = require('../libreries/Email');

router.get("/", (req,resp) => {
    usarioModel.find()
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
   .catch((error)=>{
    return resp.status(500).json({
        "message": "Se consultaron los usuarios correctamente",
        status:500,
        cont:{
            err:error
        }
     });
 });
});

router.post("/enviarEmail", (req, resp) => {
    const strcorreo = req.body.strcorreo;
    const strnombre =req.body.strnombre;
     const strprimerapellido = req.body.strprimerapellido;
     const strsegundoapellido = req.body.strsegundoapellido;
     const nmbedad = req.body.nmbedad;
     
     const RgxEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
     const valido = RgxEmail.test(strcorreo);
     if (valido == false){
        return resp.status(500).json({
            msg: "El correo es invalido",
            status: 500,
            cont: {
            }
        })
     }

    Email.sendEmail(strcorreo, {strcorreo, strnombre, strprimerapellido, strsegundoapellido, nmbedad })
    .then((response) =>{
        return resp.status(200).json({
            msg: "Enviado exitosamente",
            status: 200,
            cont: {
                response
            }
        });
    })
    .catch((error) => {
        return resp.status(200).json({
            msg: "Error ",
            status: 200,
            cont: {
                error: error.message
            }
        });
    });
});

router.put("/:id", async (req, resp) => {

    const idusuario = req.params.id;
    usuarioModel.findByIdAndUpdate({_id: idusuario}, {
        $set: {
            strnombre: request.body. strnombre,
            strprimerapellido: request.body.strprimerapellido,
            strsegundoapellido: request.body.strsegundoapellido,
            nmbedad: request.body.nmbedad,
            strcorreo: request.body.strcorreo,
            strcorreo: request.body.strpassword
       

        }
    }, {new: true})
    .then((usuario) => {
        return resp.status(200).json({
            "message": "Las empresas se actualizaron exitosamente",
            status: 200,
            cont: {
                usuario
            }
    })
})
    .catch((err) => {
        return resp.status(500).json({
            "message": "Error al actualizar las empresas",
            status: 500,
            cont: {
                error: err
            }
        });
    });
});

router.delete("/:id", (req,resp) => {

    const idusuario = req.params.id;

    usuarioModel.findByIdAndRemove(idusuario)
    .then((usuarioEliminado) =>{
        return resp.status(200).json({
            "message": "Empresa eliminada exitosamente",
            status: 200,
            cont: {
                categoria: usuarioEliminado
            }
        });
    })
    .catch((err) =>{
        return resp.status(500).json({
            "message": "Error al eliminar el usuario",
            status: 500,
            cont: {
                error: err
            }
        });
    });

});

module.exports = router;