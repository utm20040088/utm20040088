const { default: mongoose }=require("mongoose");


const EmpresaSchema=mongoose.Schema({
    
    strNombre: {
        type: String,
        required:[true,"Es necesario ingresar el nombre"]
    },
    
    strRazonSocial: {
        type: String,
        required:[true,"Es necesario ingresar el nombre"]
    }
   


});


module.exports=mongoose.model("empresa",EmpresaSchema);