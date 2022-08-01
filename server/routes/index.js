const express = require ('express');
const app = express();
const usuario = require ("./usuario");
const empresa = require ("./empresa");
const puesto = require ("./puesto");

app.use("/usuario",usuario);
app.use("/empresa",empresa);
app.use("/puesto",puesto);

module.exports = app;