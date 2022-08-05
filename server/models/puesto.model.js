const { hidden } = require('colors');
const mongoose = require("mongoose");


const PuestoSchema=mongoose.Schema({
    
    strNombre: {
        type: String,
        required:[true,"Es necesario ingresar el nombre"]
    },
    
    idEmpresa: {
        type: mongoose.Types.ObjectId,
        required:[true,"Es necesario tu id de puesto"],
        ref: "empresa"
    }
   


});
module.exports=mongoose.model("puesto",PuestoSchema);