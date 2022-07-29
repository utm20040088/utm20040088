const { default: mongoose } = require("mongoose");
const momgoose = require ("mongoose");

const EmpresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Es necesario ingresar el nombre"]
    }
});

module.exports = mongoose.model("empresa", EmpresaSchema);