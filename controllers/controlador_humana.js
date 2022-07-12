let { PDFDocument, StandardFonts } = require("pdf-lib");
let { writeFileSync,readFileSync } = require("fs");
let path = require("path");
let fileupload = require("express-fileupload");
let reverseMd5 = require("reverse-md5");
let {validationResult} = require("express-validator"); 
let fs = require("fs")

let opts = {
  lettersUpper: false,
  lettersLower: true,
  numbers: true,
  special: false,
  whitespace: true,
  maxLen: 40
};
let desencriptar = reverseMd5(opts);

let controlador_humana = {
    formulario:(req,res)=>{
        res.render("persona_humana")
    },
    guardar:(req,res)=>{
      /*let errores = validationResult(req);
      
      if(errores.isEmpty()){
        res.send("esta ok")
      }
      else{
        let nombre_archivo = req.files.dni_frente.name + req.files.dni_frente.mimetype
        //let ubicacion_dni_frente = req.files.dni_frente.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo))
        //let dni_frente = fs.readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo));
        //let dni_frente = readFileSync(path.resolve(__dirname,"../public/imagenes","2_cati_acostada.jpeg1657553499313.jpeg"));
        
        res.send(nombre_archivo)

        //res.send(path.extname(req.files.dni_frente.name))
        //res.send(req.files.formulario_humana.name)
        //res.send(req.files.dni_frente.mimetype)
      }*/

      console.log(req.files)
      async function juntar_archivos(){

        let archivo_final = await PDFDocument.create();
      
        if(req.files.formulario_humana){
          let input_formulario_humana = await req.files.formulario_humana;
          let nombre_archivo_1 = await input_formulario_humana.name + Date.now() + path.extname(input_formulario_humana.name);
          await input_formulario_humana.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_1))

          let formulario_humana = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_1)));
          let copiar_formulario_humana = await archivo_final.copyPages(formulario_humana, formulario_humana.getPageIndices());
          copiar_formulario_humana.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.dni_frente){

          let input_dni_frente = await req.files.dni_frente;
          let nombre_archivo_2 = await input_dni_frente.name + Date.now() + path.extname(input_dni_frente.name);
          await input_dni_frente.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_2));

          let dni_frente = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_2));
          let dni_frente_pdf = await archivo_final.embedJpg(dni_frente);
          let imagen_tamano = dni_frente_pdf.scale(0.25);
          let pagina = archivo_final.addPage();

          pagina.drawImage(dni_frente_pdf, {
            x: pagina.getWidth() / 2 - imagen_tamano.width / 2,
            y: pagina.getHeight() / 2 - imagen_tamano.height / 2,
            width: imagen_tamano.width,
            height: imagen_tamano.height,
          });
        };

        if(req.files.dni_dorso){

          let input_dni_dorso = await req.files.dni_dorso;
          let nombre_archivo_3 = await input_dni_dorso.name + Date.now() + path.extname(input_dni_dorso.name);
          await input_dni_dorso.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_3));

          let dni_dorso = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_3));
          let dni_dorso_pdf = await archivo_final.embedJpg(dni_dorso);
          let imagen_tamano_2 = dni_dorso_pdf.scale(0.25);
          let pagina_2 = archivo_final.addPage();
          pagina_2.drawImage(dni_dorso_pdf, {
            x: pagina_2.getWidth() / 2 - imagen_tamano_2.width / 2,
            y: pagina_2.getHeight() / 2 - imagen_tamano_2.height / 2,
            width: imagen_tamano_2.width,
            height: imagen_tamano_2.height,
          });
        };
        
        if(req.files.afip){

          let input_afip = await req.files.afip;
          let nombre_archivo_4 = await input_afip.name + Date.now() + path.extname(input_afip.name);
          await input_afip.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_4));

          let afip = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_4)));
          let copiar_afip = await archivo_final.copyPages(afip, afip.getPageIndices());
          copiar_afip.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.mi_pyme){

          let input_mi_pyme = await req.files.mi_pyme;
          let nombre_archivo_5 = await input_mi_pyme.name + Date.now() + path.extname(input_mi_pyme.name);
          await input_mi_pyme.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_5));

          let mi_pyme = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_5)));
          let copiar_mi_pyme = await archivo_final.copyPages(mi_pyme, mi_pyme.getPageIndices());
          copiar_mi_pyme.forEach((page) => archivo_final.addPage(page));
        };
        
        if(req.files.servicio){
          let input_servicio = await req.files.servicio;
          let nombre_archivo_6 = await input_servicio.name + Date.now() + path.extname(input_servicio.name);
          await input_servicio.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_6));

          let servicio = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_6));
          let servicio_pdf = await archivo_final.embedJpg(servicio);
          let imagen_tamano_3 = servicio_pdf.scale(0.25);
          let pagina_3 = archivo_final.addPage();
          pagina_3.drawImage(servicio_pdf, {
            x: pagina_3.getWidth() / 2 - imagen_tamano_3.width / 2,
            y: pagina_3.getHeight() / 2 - imagen_tamano_3.height / 2,
            width: imagen_tamano_3.width,
            height: imagen_tamano_3.height,
          });
        };

        if(req.files.foto_local){

          let input_foto_local = await req.files.foto_local
          let nombre_archivo_7 = await input_foto_local.name + Date.now() + path.extname(input_foto_local.name);
          await input_foto_local.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_7));

          let foto_local = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_7));
          let foto_local_pdf = await archivo_final.embedJpg(foto_local);
          let imagen_tamano_4 = foto_local_pdf.scale(0.25);
          let pagina_4 = archivo_final.addPage();
          pagina_4.drawImage(foto_local_pdf, {
            x: pagina_4.getWidth() / 2 - imagen_tamano_4.width / 2,
            y: pagina_4.getHeight() / 2 - imagen_tamano_4.height / 2,
            width: imagen_tamano_4.width,
            height: imagen_tamano_4.height,
          });
        };

        if(req.files.foto_local_2){

          let input_foto_local_2 = await req.files.foto_local_2;
          let nombre_archivo_8 = await input_foto_local_2.name + Date.now() + path.extname(input_foto_local_2.name);
          await input_foto_local_2.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_8));
        
          let foto_local_2 = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_8));
          let foto_local_pdf_2 = await archivo_final.embedJpg(foto_local_2);
          let imagen_tamano_5 = foto_local_pdf_2.scale(0.25);
          let pagina_5 = archivo_final.addPage();
          pagina_5.drawImage(foto_local_pdf_2, {
            x: pagina_5.getWidth() / 2 - imagen_tamano_5.width / 2,
            y: pagina_5.getHeight() / 2 - imagen_tamano_5.height / 2,
            width: imagen_tamano_5.width,
            height: imagen_tamano_5.height,
          });
        };

        if(req.files.nosis){

          let input_nosis = await req.files.nosis;
          let nombre_archivo_9 = await input_nosis.name + Date.now() + path.extname(input_nosis.name);
          await input_nosis.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_9));

          let nosis = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_9)));
          let copiar_nosis = await archivo_final.copyPages(nosis, nosis.getPageIndices());
          copiar_nosis.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.opcional_1){

          let input_opcional_1 = await req.files.opcional_1;
          let nombre_archivo_10 = await input_opcional_1.name + Date.now() + path.extname(input_opcional_1.name);
          await input_opcional_1.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_10));

          let opcional_1 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_10)));
          let copiar_opcional_1 = await archivo_final.copyPages(opcional_1, opcional_1.getPageIndices());
          copiar_opcional_1.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.opcional_2){

          let input_opcional_2 = await req.files.opcional_2;
          let nombre_archivo_11 = await input_opcional_2.name + Date.now() + path.extname(input_opcional_2.name);
          await input_opcional_2.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_11));

          let opcional_2 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_11)));
          let copiar_opcional_2 = await archivo_final.copyPages(opcional_2, opcional_2.getPageIndices());
          copiar_opcional_2.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.opcional_3){

          let input_opcional_3 = await req.files.opcional_3;
          let nombre_archivo_12 = await input_opcional_3.name + Date.now() + path.extname(input_opcional_3.name);
          await input_opcional_3.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_12));
      
          let opcional_3 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_12)));
          let copiar_opcional_3 = await archivo_final.copyPages(opcional_3, opcional_3.getPageIndices());
          copiar_opcional_3.forEach((page) => archivo_final.addPage(page));
        };



        

        /*if(req.files.opcional_4){

          let input_opcional_4 = await req.files.opcional_4;
          let nombre_archivo_13 = await input_opcional_4.name + Date.now() + path.extname(input_opcional_4);
          await input_opcional_4.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_13));

          let opcional_4 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_13)));
          let copiar_opcional_4 = await archivo_final.copyPages(opcional_4,opcional_4.getPagesIndices());
          copiar_opcional_4.forEach((page)=> archivo_final.addPage(page));
        };
        
        if(req.files.opcional_5){

          let input_opcional_5 = await req.files.opcional_5;
          let nombre_archivo_14 = await input_opcional_5.name + Date.now() + path.extname(input_opcional_5.name);
          await input_opcional_5.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_14));

          let opcional_5 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_14)));
          let copiar_opcional_5 = await archivo_final.copyPages(opcional_5,opcional_5.getPageIndices());
          copiar_opcional_5.forEach((page)=> archivo_final.addPages(page));
        };
        
        if(req.files.opcional_6){

          let input_opcional_6 = await req.files.opcional_6;
          let nombre_archivo_15 = await input_opcional_6.name + Date.now() + path.extname(input_opcional_6.name);
          await input_opcional_6.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_15));

          let opcional_6 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_15)));
          let copiar_opcional_6 = await archivo_final.copyPages(opcional_6,opcional_6.getPageIndices());
          copiar_opcional_6.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_7){

          let input_opcional_7 = await req.files.opcional_7;
          let nombre_archivo_16 = await input_opcional_7.name + Date.now() + path.extname(input_opcional_7.name);
          await input_opcional_7.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_16));

          let opcional_7 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_16)));
          let copiar_opcional_7 = await archivo_final.copyPages(opcional_7,opcional_7.getPageIndices());
          copiar_opcional_7.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_8){

          let input_opcional_8 = await req.files.opcional_8;
          let nombre_archivo_17 = await input_opcional_8.name + Date.now() + path.extname(input_opcional_8.name);
          await input_opcional_8.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_17));

          let opcional_8 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_17)));
          let copiar_opcional_8 = await archivo_final.copyPages(opcional_8,opcional_8.getPageIndices());
          copiar_opcional_8.forEach((page)=> archivo_final.addPages(page));
        };

        

        if(req.files.opcional_9){

          let input_opcional_9 = await req.files.opcional_9;
          let nombre_archivo_18 = await input_opcional_9.name + Date.now() + path.extname(input_opcional_9.name);
          await input_opcional_9.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_18));

          let opcional_9 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_18)));
          let copiar_opcional_9 = await archivo_final.copyPages(opcional_9,opcional_9.getPageIndices());
          copiar_opcional_9.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_10){

          let input_opcional_10 = await req.files.opcional_10;
          let nombre_archivo_19 = await input_opcional_10.name + Date.now() + path.extname(input_opcional_10.name);
          await input_opcional_10.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_19));

          let opcional_10 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_19)));
          let copiar_opcional_10 = await archivo_final.copyPages(opcional_10,opcional_10.getPageIndices());
          copiar_opcional_10.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_11){

          let input_opcional_11 = await req.files.opcional_11;
          let nombre_archivo_20 = await input_opcional_11.name + Date.now() + path.extname(input_opcional_11.name);
          await input_opcional_11.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_20));

          let opcional_11 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_20)));
          let copiar_opcional_11 = await archivo_final.copyPages(opcional_11,opcional_11.getPageIndices());
          copiar_opcional_11.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_12){

          let input_opcional_12 = await req.files.opcional_12;
          let nombre_archivo_21 = await input_opcional_12.name + Date.now() + path.extname(input_opcional_12.name);
          await input_opcional_12.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_21));

          let opcional_12 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_21)));
          let copiar_opcional_12 = await archivo_final.copyPages(opcional_12,opcional_12.getPageIndices());
          copiar_opcional_12.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_13){

          let input_opcional_13 = await req.files.opcional_13;
          let nombre_archivo_22 = await input_opcional_13.name + Date.now() + path.extname(input_opcional_13.name);
          await input_opcional_13.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_22));

          let opcional_13 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_22)));
          let copiar_opcional_13 = await archivo_final.copyPages(opcional_13,opcional_13.getPageIndices());
          copiar_opcional_13.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_14){

          let input_opcional_14 = await req.files.opcional_14;
          let nombre_archivo_23 = await input_opcional_14.name + Date.now() + path.extname(input_opcional_14.name);
          await input_opcional_14.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_23));

          let opcional_14 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_23)));
          let copiar_opcional_14 = await archivo_final.copyPages(opcional_14,opcional_14.getPageIndices());
          copiar_opcional_14.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_15){

          let input_opcional_15 = await req.files.opcional_15;
          let nombre_archivo_24 = await input_opcional_15.name + Date.now() + path.extname(input_opcional_15.name);
          await input_opcional_15.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_24));

          let opcional_15 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_24)));
          let copiar_opcional_15 = await archivo_final.copyPages(opcional_15,opcional_15.getPageIndices());
          copiar_opcional_15.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_16){

          let input_opcional_16 = await req.files.opcional_16;
          let nombre_archivo_25 = await input_opcional_16.name + Date.now() + path.extname(input_opcional_16.name);
          await input_opcional_16.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_25));

          let opcional_16 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_25)));
          let copiar_opcional_16 = await archivo_final.copyPages(opcional_16,opcional_16.getPageIndices());
          copiar_opcional_16.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_17){

          let input_opcional_17 = await req.files.opcional_17;
          let nombre_archivo_26 = await input_opcional_17.name + Date.now() + path.extname(input_opcional_17.name);
          await input_opcional_17.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_26));

          let opcional_17 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_26)));
          let copiar_opcional_17 = await archivo_final.copyPages(opcional_17,opcional_17.getPageIndices());
          copiar_opcional_17.forEach((page)=> archivo_final.addPages(page));
        };

        if(req.files.opcional_18){

          let input_opcional_18 = await req.files.opcional_18;
          let nombre_archivo_27 = await input_opcional_18.name + Date.now() + path.extname(input_opcional_18.name);
          await input_opcional_18.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_27));

          let opcional_18 = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_27)));
          let copiar_opcional_18 = await archivo_final.copyPages(opcional_18,opcional_18.getPageIndices());
          copiar_opcional_18.forEach((page)=> archivo_final.addPages(page));
        };*/

        if(req.files.imagen_extra_1){

          let input_imagen_extra_1 = await req.files.imagen_extra_1;
          let nombre_archivo_19 = await input_imagen_extra_1.name + Date.now() + path.extname(input_imagen_extra_1.name);
          await input_imagen_extra_1.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_19));
        
          let foto_imagen_extra_1 = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_19));
          let foto_imagen_extra_1_pdf = await archivo_final.embedPng(foto_imagen_extra_1);
          let imagen_tamano_6 = foto_imagen_extra_1_pdf.scale(0.25);
          let pagina_6 = archivo_final.addPage();
          pagina_6.drawImage(foto_imagen_extra_1_pdf, {
            x: pagina_6.getWidth() / 2 - imagen_tamano_6.width / 2,
            y: pagina_6.getHeight() / 2 - imagen_tamano_6.height / 2,
            width: imagen_tamano_6.width,
            height: imagen_tamano_6.height,
          });
        };

        if(req.files.imagen_extra_2){

          let input_imagen_extra_2 = await req.files.imagen_extra_2;
          let nombre_archivo_20 = await input_imagen_extra_2.name + Date.now() + path.extname(input_imagen_extra_2.name);
          await input_imagen_extra_2.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_20));
        
          let foto_imagen_extra_2 = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_20));
          let foto_imagen_extra_2_pdf = await archivo_final.embedPng(foto_imagen_extra_2);
          let imagen_tamano_7 = foto_imagen_extra_2_pdf.scale(0.25);
          let pagina_7 = archivo_final.addPage();
          pagina_7.drawImage(foto_imagen_extra_2_pdf, {
            x: pagina_7.getWidth() / 2 - imagen_tamano_7.width / 2,
            y: pagina_7.getHeight() / 2 - imagen_tamano_7.height / 2,
            width: imagen_tamano_7.width,
            height: imagen_tamano_7.height,
          });
        };

        if(req.files.imagen_extra_3){

          let input_imagen_extra_3 = await req.files.imagen_extra_3;
          let nombre_archivo_21 = await input_imagen_extra_3.name + Date.now() + path.extname(input_imagen_extra_3.name);
          await input_imagen_extra_3.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_21));
        
          let foto_imagen_extra_3 = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_21));
          let foto_imagen_extra_3_pdf = await archivo_final.embedPng(foto_imagen_extra_3);
          let imagen_tamano_8 = foto_imagen_extra_3_pdf.scale(0.25);
          let pagina_8 = archivo_final.addPage();
          pagina_8.drawImage(foto_imagen_extra_3_pdf, {
            x: pagina_8.getWidth() / 2 - imagen_tamano_8.width / 2,
            y: pagina_8.getHeight() / 2 - imagen_tamano_8.height / 2,
            width: imagen_tamano_8.width,
            height: imagen_tamano_8.height,
          });
        };

        console.log(req.files)

        let nombre_archivo = Date.now() + "archivo_final.pdf";
        writeFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo), await archivo_final.save())
        res.render("cargado_exito",{nombre_archivo:nombre_archivo});
      }
      juntar_archivos().catch((err) => console.log(err)); 
    }
};

module.exports = controlador_humana;