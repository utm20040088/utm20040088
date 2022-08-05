const express = require("express");
const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
require("colors");
require("./config/config");
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');

app.get("/",(req,response)=>{
    return response.status(200).json({
        msg: "Estas dentro de la api get de isaac",
        status: 200
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api",  routes);
mongoose.connect(process.env.URLDB, {}).then(() => {
    console.log("[MONGODB]".green + "DATABASE CONNECTION SUCCESSFULLY");
})
.catch ((err) => {
    console.log("[MONGODB]".red + "CONNECTION FAILED" + err);
});

app.listen(process.env.PORT, () => {
    console.log("SE ESTA ESCUCHANDO EL PUERTO " + process.env.PORT.bgWhite.blue);
});