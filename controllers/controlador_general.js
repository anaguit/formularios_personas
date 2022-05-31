let fs = require("fs");
let path = require("path");

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