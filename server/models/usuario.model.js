const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
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
idPuesto: {
    type: objectid(),
    require:[true, "Es necesario ingresar el puesto"]
},
nmbEdad:{
    type: String,
     require:[true, "Es necesario ingresar la edad"]
    },
credenciales: {
    strCorreo:{
        type: String,
    require:[true, "Es necesario ingresar el correoElectronico"]
    },
    strPassword: {
        type: String,
    require:[true, "Es necesario ingresar la contraseña"]
    }
}
})
UsuarioSchema.pre("save",function(next){
    bcrypt.genSalt(10).then(Salts => {
        bcrypt.hash(this.password,Salts).then(hash =>{
            this.password= hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

module.exports=mongoose.model("usuario", UsuarioSchema);