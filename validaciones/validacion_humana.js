let {check} = require("express-validator");

let validaciones_humana = [
    check("dni_frente").notEmpty().withMessage("campo obligatorio")//.isIn(["pdf"]),
    //body("dni_dorso"),
    //body("servicio"),
    //body("foto_local"),
    //body("foto_local_2")
];

module.exports = validaciones_humana;
