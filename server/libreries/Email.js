const  nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const hogan = require('hogan.js');
const { resolve } = require('path');
const { rejects } = require('assert');
const { response } = require('../routes');

class Email{

    constructor(){
        this.transport = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "utm20040088@utma.edu.mx",
            pass: "ygpxcpuznziqdvtv"
         }
        });
    }

    sendEmail(email, data){

        return new Promise((resolve, reject) =>{
    const template = fs.readFileSync(path.resolve(__dirname, "../assets/template.html"), "utf-8");
    const compileTemplate = hogan.compile(template);
    
    this.transport.sendMail({
         from: '"UTMA" <utm20040088@utma.edu.mx> ',
         to: email,
         subject: "Correo electronico",
         html: compileTemplate.render({strcorreo: data.strcorreo, strnombre: data.strnombre, strprimerapellido: data.strsegundoapellido, nmbedad: data.nmbedad}),
    }).then((response) =>{
        resolve(response);
    })
     .catch((error)=>{
        reject(error);
     });
});

    }
}

module.exports = new Email();