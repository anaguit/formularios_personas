let { PDFDocument, StandardFonts } = require("pdf-lib");
let { writeFileSync,readFileSync } = require("fs");
let path = require("path");
let fileupload = require("express-fileupload");

let controlador_juridica = {
    formulario:(req,res)=>{
        res.render("persona_juridica")
    },
    guardar:(req,res)=>{
      
      async function juntar_archivos(){

        let archivo_final = await PDFDocument.create();
        
        if(req.files.formulario_juridica){

          let input_formulario_juridica = await req.files.formulario_juridica;
          let nombre_archivo_1 = await input_formulario_juridica.name + Date.now() + path.extname(input_formulario_juridica.name);
          await input_formulario_juridica.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_1));

          let formulario_juridica = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_1)));
          let copiar_formulario_juridica = await archivo_final.copyPages(formulario_juridica, formulario_juridica.getPageIndices());
          copiar_formulario_juridica.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.afip){

          let input_afip = await req.files.afip;
          let nombre_archivo_2 = await input_afip.name + Date.now() + path.extname(input_afip.name);
          await input_afip.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_2));

          let afip = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_2)));
          let copiar_afip = await archivo_final.copyPages(afip, afip.getPageIndices());
          copiar_afip.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.mi_pyme){

          let input_mi_pyme = await req.files.mi_pyme;
          let nombre_archivo_3 = await input_mi_pyme.name + Date.now() + path.extname(input_mi_pyme.name);
          await input_mi_pyme.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_3));

          let mi_pyme = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_3)));
          let copiar_mi_pyme = await archivo_final.copyPages(mi_pyme, mi_pyme.getPageIndices());
          copiar_mi_pyme.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.estatuto_social){

          let input_estatuto_social = await req.files.estatuto_social;
          let nombre_archivo_4 = await input_estatuto_social.name + Date.now() + path.extname(input_estatuto_social.name);
          await input_estatuto_social.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_4));

          let estatuto_social = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_4)));
          let copiar_estatuto_social = await archivo_final.copyPages(estatuto_social, estatuto_social.getPageIndices());
          copiar_estatuto_social.forEach((page) => archivo_final.addPage(page));
        };

        if(req.files.acta_asignacion){

          let input_acta_asignacion = await req.files.acta_asignacion;
          let nombre_archivo_5 = await input_acta_asignacion.name + Date.now() + path.extname(input_acta_asignacion.name);
          await input_acta_asignacion.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_5));

          let acta_asignacion = await PDFDocument.load(readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_5)));
          let copiar_acta_asignacion = await archivo_final.copyPages(acta_asignacion, acta_asignacion.getPageIndices());
         copiar_acta_asignacion.forEach((page) => archivo_final.addPage(page));  
        };

        if(req.files.servicio){

          let input_servicio = await req.files.servicio;
          let nombre_archivo_6 = await input_servicio.name + Date.now() + path.extname(input_servicio.name);
          await input_servicio.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_6));

          let servicio = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_6));
          let servicio_pdf = await archivo_final.embedJpg(servicio);
          let imagen_tamano_2 = servicio_pdf.scale(0.25);
          let pagina_2 = archivo_final.addPage();
          pagina_2.drawImage(servicio_pdf, {
            x: pagina_2.getWidth() / 2 - imagen_tamano_2.width / 2,
            y: pagina_2.getHeight() / 2 - imagen_tamano_2.height / 2,
            width: imagen_tamano_2.width,
            height: imagen_tamano_2.height,
          });
        };

        if(req.files.foto_local){

          let input_foto_local = await req.files.foto_local
          let nombre_archivo_7 = await input_foto_local.name + Date.now() + path.extname(input_foto_local.name);
          await input_foto_local.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_7));

          let foto_local = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_7));
          let foto_local_pdf = await archivo_final.embedJpg(foto_local);
          let imagen_tamano = foto_local_pdf.scale(0.25);
          let pagina = archivo_final.addPage();
          pagina.drawImage(foto_local_pdf, {
            x: pagina.getWidth() / 2 - imagen_tamano.width / 2,
            y: pagina.getHeight() / 2 - imagen_tamano.height / 2,
            width: imagen_tamano.width,
            height: imagen_tamano.height,
          });
        };

        if(req.files.foto_local_2){

          let input_foto_local_2 = await req.files.foto_local_2;
          let nombre_archivo_8 = await input_foto_local_2.name + Date.now() + path.extname(input_foto_local_2.name);
          await input_foto_local_2.mv(path.resolve(__dirname,"../public/imagenes",nombre_archivo_8));

          let foto_local_2 = await readFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo_8));
          let foto_local_pdf_2 = await archivo_final.embedJpg(foto_local_2);
          let imagen_tamano_1 = foto_local_pdf_2.scale(0.25);
          let pagina_1 = archivo_final.addPage();
          pagina_1.drawImage(foto_local_pdf_2, {
            x: pagina_1.getWidth() / 2 - imagen_tamano_1.width / 2,
            y: pagina_1.getHeight() / 2 - imagen_tamano_1.height / 2,
            width: imagen_tamano_1.width,
            height: imagen_tamano_1.height,
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

        console.log(req.files);     
        let nombre_archivo = Date.now() + "archivo_final.pdf";
        writeFileSync(path.resolve(__dirname,"../public/imagenes",nombre_archivo), await archivo_final.save());
        //res.send(req.files)
        console.log(req.files)
        res.render("cargado_exito",{nombre_archivo:nombre_archivo});
      }
      juntar_archivos().catch((err) => console.log(err)); 
    }
};

module.exports = controlador_juridica;