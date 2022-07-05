let fs = require("fs");
let path = require("path");

let { PDFDocument, StandardFonts } = require("pdf-lib");
let { writeFileSync,readFileSync } = require("fs");

let fileupload = require("express-fileupload");
let ReverseMd5 = require("reverse-md5");

let controlador_general = {
    inicio:(req,res)=>{
        res.render("inicio");
    },
    limpiar_archivos:(req,res)=>{
        let leer = fs.readdirSync(path.resolve(__dirname,"../public/imagenes"));
        leer.forEach((elemento)=>{
            let lista = fs.unlinkSync(path.resolve(__dirname,"../public/imagenes",elemento));
        });
        res.redirect("/")
    },
    descargar:(req,res)=>{
        res.download(path.resolve(__dirname,"../public/imagenes", req.params.archivo))
    }
};

module.exports = controlador_general;