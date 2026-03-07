const { testServer } = require("../../../config.json");
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    
    // 1. Obtenemos el gestor de comandos Globales (para todos los servidores)
    const globalApplicationCommands = await getApplicationCommands(client);
    
    // 2. Obtenemos el gestor de comandos Locales (solo para tu servidor de pruebas)
    const testApplicationCommands = await getApplicationCommands(client, testServer);

    for (const localCommand of localCommands) {
      const { name, description, options, deleted, testOnly } = localCommand;

      // Determinamos a qué entorno enviaremos este comando específico
      const targetApplicationCommands = testOnly ? testApplicationCommands : globalApplicationCommands;
      const entorno = testOnly ? 'Local (Pruebas)' : 'Global (Producción)';

      const existingCommand = await targetApplicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (deleted) {
          await targetApplicationCommands.delete(existingCommand.id);
          console.log(`🗑 Comando Eliminado "${name}" de entorno ${entorno}.`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await targetApplicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`🔁 Comando Editado "${name}" en entorno ${entorno}.`);
        }
      } else {
        if (deleted) {
          console.log(`⏩ Saltando comando "${name}" porque fue marcado como eliminado.`);
          continue;
        }

        await targetApplicationCommands.create({
          name,
          description,
          options,
        });
        console.log(`👍 Comando Registrado "${name}" en entorno ${entorno}.`);
      }
    }
  } catch (error) {
    console.log(`Error al registrar comandos: ${error}`);
  }
};