const puestomodel = require('../models/puesto.model');
const { request } = require("express");
const express = require("express");
const router = express.Router();
const Email = require('../libreries/Email');

router.get("/", (req,resp) => {
    puestomodel.find()
    .then((puesto) => {
    return resp.status(200).json({
        msg: "USe consultaron los puestos correctamente",
        status : 200,
        cont: {
            puesto
        }
    }); 
})
    .catch((err) => {
        return resp.status(500).json({
            msg: "Erro al consultar los puestos",
            status : 500,
            cont: {
                error: err
            }
        });
    });
});    
router.get("/:strnombre/:idempresa", (request, response) => {

const {strnombre, idempresa} = request.params;

if(Number(edad).toString()==="NaN"){

    return response.status(400).json({
        "message":"El valor ingresado en la edad es invalido"
    })
   }

return response.status(200).json({
           "message": "Estás dentro de la API GET puesto",
           strnombre,
           idempresa
           
       });
   
   });
   router.get("/:id", (req, resp) => {
   const idpuesto = req.params.id;
   usuarioModel.findOne({_id: idpuesto})
   .then((puesto)=>{
    return resp.status(200).json({
        "message": "Se consultaron los puestos correctamente",
        status:200,
        cont:{
            puesto
        }
    });
   })
   .catch((err)=>{
    return resp.status(500).json({
        "message": "Se consultaron los puestos correctamente",
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

    const idpuesto = req.params.id;
    usuarioModel.findByIdAndUpdate({_id: idpuesto}, {
        $set: {
            strnombre: request.body. strnombre,
            idempresa: request.body.idempresa
       

        }
    }, {new: true})
    .then((empresa) => {
        return resp.status(200).json({
            "message": "Los puestos se actualizaron exitosamente",
            status: 200,
            cont: {
                empresa
            }
    })
})
    .catch((err) => {
        return resp.status(500).json({
            "message": "Error al actualizar los puestos",
            status: 500,
            cont: {
                error: err
            }
        });
    });
});

router.delete("/:id", (req,resp) => {

    const idpuesto = req.params.id;

    usuarioModel.findByIdAndRemove(idpuesto)
    .then((puestoEliminado) =>{
        return resp.status(200).json({
            "message": "puesto eliminado exitosamente",
            status: 200,
            cont: {
                categoria: puestoEliminado
            }
        });
    })
    .catch((err) =>{
        return resp.status(500).json({
            "message": "Error al eliminar el puesto",
            status: 500,
            cont: {
                error: err
            }
        });
    });

});

module.exports = router;