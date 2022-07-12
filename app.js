let express = require("express");
let path = require("path");
let app = express();
let fileupload = require("express-fileupload");

let controlador_juridica = require("./controllers/controlador_juridica");
let controlador_humana = require("./controllers/controlador_humana");
let controlador_general = require("./controllers/controlador_general");

//let validaciones_humana = require("./validaciones/validacion_humana");

app.use(express.static(path.resolve(__dirname,"./public")))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(fileupload());

app.set("view engine","ejs");

app.listen(process.env.PORT||3000,()=>{console.log("servidor corriendo")});

//general
app.get("/",controlador_general.inicio);
app.post("/",controlador_general.limpiar_archivos);
app.get("/descargar/:archivo",controlador_general.descargar);

//persona_juridica
app.get("/persona_juridica",controlador_juridica.formulario);
app.post("/persona_juridica", controlador_juridica.guardar);

//persona_humana
app.get("/persona_humana",controlador_humana.formulario);
app.post("/persona_humana"/*, validaciones_humana*/, controlador_humana.guardar);