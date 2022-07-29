const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
const UsuarioSchema = mongoose.Schema({
 nombre:  {
    type: String,
    require:[true, "Es necesario ingresar el nombre"]
},
 primerapellidoapellidos: {
     type: String,
     require:[true, "Es necesario ingresar los apellidos"]
 },
 segundoapellido:  {
    type: String,
    require:[true, "Es necesario ingresar el correoElectronico"]
},
idPuesto: {
    type: objectid(),
    require:[true, "Es necesario ingresar la contraseña"]
},
edad: Number,
curp: String
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