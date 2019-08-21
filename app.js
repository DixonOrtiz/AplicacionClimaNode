const {argumentos} = require("./config/yargs"); 
const {getInfo} = require("./funciones/funciones");

getInfo(argumentos.direccion)
    .then(respuesta => console.log(respuesta))
    .catch(error => console.log(error));

