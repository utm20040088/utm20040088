const empresaModel = require('../models/empresa.model');
const { request } = require("express");
const express = require("express");
const router = express.Router();
const Email = require('../libreries/Email');

router.get("/", (req,resp) => {
    empresaModel.find()
    .then((empresa) => {
    return resp.status(200).json({
        msg: "USe consultaron las empresas correctamente",
        status : 200,
        cont: {
            empresa
        }
    }); 
})
    .catch((err) => {
        return resp.status(500).json({
            msg: "Erro al consultar las empresas",
            status : 500,
            cont: {
                error: err
            }
        });
    });
});    
router.get("/:id/:strnombre/:idempresa", (request, response) => {

const { strnombre, idempresa} = request.params;

if(Number(edad).toString()==="NaN"){

    return response.status(400).json({
        "message":"El valor ingresado en la edad es invalido"
    })
   }

return response.status(200).json({
           "message": "Estás dentro de la API GET Usuario",
           strnombre,
           idempresa
           
           
       });
   
   });
   router.get("/:id", (req, resp) => {
   const idempresa = req.params.id;
   usuarioModel.findOne({_id: idempresa})
   .then((empresa)=>{
    return resp.status(200).json({
        "message": "Se consultaron las empresas correctamente",
        status:200,
        cont:{
            empresa
        }
    });
   })
   .catch((error)=>{
    return resp.status(500).json({
        "message": "Se consultaron las empresas correctamente",
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

    Email.sendEmail(strcorreo, {strcorreo, strnombre, strprimerapellido, strsegundoapellido, nmbedad })
    .then((resp) =>{
        return resp.status(200).json({
            msg: "Enviado exitosamente",
            status: 200,
            cont: {
                resp
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

    const idempresa = req.params.id;
    usuarioModel.findByIdAndUpdate({_id: idempresa}, {
        $set: {
            strnombre: request.body. strnombre,
            strRazonSocial: request.body.strRazonSocial
       

        }
    }, {new: true})
    .then((empresa) => {
        return resp.status(200).json({
            "message": "Las empresas se actualizaron exitosamente",
            status: 200,
            cont: {
                empresa
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

    const idempresa = req.params.id;

    usuarioModel.findByIdAndRemove(idempresa)
    .then((usuarioEliminado) =>{
        return resp.status(200).json({
            "message": "Empresa eliminada exitosamente",
            status: 200,
            cont: {
                categoria: empresaEliminada
            }
        });
    })
    .catch((err) =>{
        return resp.status(500).json({
            "message": "Error al eliminar la empresa",
            status: 500,
            cont: {
                error: err
            }
        });
    });

});

module.exports = router;