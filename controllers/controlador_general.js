let fs = require("fs");
let path = require("path");

let { PDFDocument, StandardFonts } = require("pdf-lib");
let { writeFileSync,readFileSync } = require("fs");

let fileupload = require("express-fileupload");
let reverseMd5 = require("reverse-md5");

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
    },
    vista_desencriptar:(req,res)=>{
        res.render("desencriptar")
    },
    desencriptar:(req,res)=>{
            let input_nosis = req.files.nosis;
            let nombre_archivo = input_nosis.name + Date.now() + path.extname(input_nosis.name);
            input_nosis.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo));
        /*let opts = {
            lettersUpper: false,
            lettersLower: true,
            numbers: true,
            special: false,
            whitespace: true,
            maxLen: 40
          };
          let desencriptar = reverseMd5(opts);

          if(req.files.nosis){

            let input_nosis = await req.files.nosis;
            let nombre_archivo_9 = await input_nosis.name + Date.now() + path.extname(input_nosis.name);
            await input_nosis.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_9));
            */
            //console.log(input_nosis.md5);
            /*let descencriptado = await */
            //desencriptar(input_nosis.md5,opts);
            //console.log(descencriptado);
            //console.log(input_nosis.md5);
  
            /*let nosis = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_9)),{ ignoreEncryption: true });
            let copiar_nosis = await archivo_final.copyPages(nosis, nosis.getPageIndices());
            copiar_nosis.forEach((page) => archivo_final.addPage(page));
        }*/
        res.send(input_nosis.name)
    }
};

module.exports = controlador_general;