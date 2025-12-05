// ------ Get All Files ------
// Funcion auxilar para poder obtener todos los archivos dentro del BOT
// ------


// Importamos librerias necesarias
const fs = require('fs');
const path = require('path');

module.exports = (directorios, foldersOnly=false) => {

    // hacemos una lista para guardar los archivos
    // y una variable archivo que distinga entre archivos y carpetas
    let filesNames = [];
    const files = fs.readdirSync(directorios, { withFileTypes: true});

    for (const file of files ) {
        const filePath=path.join(directorios, file.name)
        
        if (foldersOnly) {
            if (file.isDirectory()) {
                filesNames.push(filePath)
            }
        } else {
            if (file.isFile()) {
                filesNames.push(filePath);
            }
        }
    }

    return filesNames
};