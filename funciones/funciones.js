const axios = require("axios"); //Paquete para hacer consultas http

// Función que obtiene las coordenaas geométricas de una ubicación consultando la api de geolocalización "opencagetada"
const getCoordenadas = async(direccion) => {

    let direccionAmigable = encodeURI(direccion);
    let apiKey = "Ingresar apiKey obtenida en el sitio oficial de 'opencagetada'";
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${direccionAmigable}&limit=1&key=${apiKey}`;

    let respuestaConsulta = await axios.get(url);

    if(respuestaConsulta.data["total_results"] === 0){
        throw new Error(`No coincidieron lugares para: ${direccion}`);
    }

    let respuestaConsultaResults = respuestaConsulta.data.results[0];
    
    let latitud = respuestaConsultaResults["geometry"].lat;
    let longitud = respuestaConsultaResults["geometry"].lng;

    return {
        latitud,
        longitud  
    }
}

// Función que obtiene el clima actual de una ubicación a partir de sus coordenadas geométricas
// consultando la api "openweathermap"
const getClima = async(latitud, longitud) => {
    let apiKey = "Ingresar apiKey obtenida en el sitio oficial de 'openweathermap'";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${apiKey}`;
    
    let respuestaConsulta = await axios.get(url);

    let clima = respuestaConsulta.data.main.temp;

    return clima;
}

//Función que utiliza la función de coordenadas y de clima y retorna un mensaje con la temperatura
const getInfo = async(direccion) => {
    try{
        let coordenadas = await getCoordenadas(direccion);
        let temperatura = await getClima(coordenadas.latitud, coordenadas.longitud);
        
        return `La temperatura en ${direccion} es de: ${temperatura}°`;
    
    }
    catch(error){
        return `No se pudo determinar el clima en "${direccion}"`;
    };
    

}

module.exports = {
    getInfo
}