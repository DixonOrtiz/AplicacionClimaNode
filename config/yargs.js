// Se especifian la entrada de comandos que require la ejecución del programa
const argumentos = require("yargs")
    .options({
        direccion: {
            alias: "d",
            desc: "Descripción de la ciudad para obtener el clima",
            demand: true
        }
    })
    .argv;

module.exports = {
    argumentos
}