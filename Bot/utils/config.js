/**
 * Funcion auxiliar para manejar las configuraciones del bot.
 * Accede al archivo config.json para cargar configuraciones o guardarlas.
 * Ejemplo de uso:
 * 
 * const { getConfig, saveConfig } = require('../../utils/config');
 * 
 * Leer
 * const config = getConfig();
 * 
 * Modificar lo que necesitemos
 * config.logChannel = channel.id;
 * config.muteRole = role.id;
 * 
 * Guardar
 * saveConfig(config);
 */


const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../config.json');

// Funcion para cargar la configuracion del bot
function getConfig() {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

// Funcion para guardar la configuracion del bot
function saveConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

module.exports = { getConfig, saveConfig };

