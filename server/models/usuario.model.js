const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
const parseid= (id)=> {return mongoose.Types.ObjectId(id)}
const UsuarioSchema = mongoose.Schema({
 strnombre:  {
    type: String,
    require:[true, "Es necesario ingresar el nombre"]
},
 strprimerapellido: {
     type: String,
     require:[true, "Es necesario ingresar el apellido"]
 },
 strsegundoapellido:  {
    type: String,
     require:[true, "Es necesario ingresar el apellido"]
    },

nmbedad:Number,

    idPuesto:{
        type: mongoose.Types.ObjectId,
        required:[true,"descripcion"]
    },
    credenciales : {
   
         strcorreo:{
            type: String,
            require: true, unique: false
        },
            strpassword: {
            type: String,
            require: true, unique: false
        }
    }
})


module.exports=mongoose.model("usuario", UsuarioSchema);