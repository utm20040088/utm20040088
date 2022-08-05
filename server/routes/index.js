const express = require ('express');
const app = express();
const usuario = require ("./usuario");
const empresa = require ("./empresa");
const puesto = require ("./puesto");

app.use("/empresa",empresa);
app.use("/puesto",puesto);
app.use("/usuario",usuario);

module.exports = app;