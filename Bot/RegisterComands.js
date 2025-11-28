require("dotenv").config(); 
const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: `registrarse`,
        description: `Regístrate para tener acceso al servidor.`,
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {

        console.log("Iniciando registro de comandos...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.botId, process.env.serverId),
            { body: commands }
        );
        
        console.log("Comandos registrados exitosamente.");

    } catch (error) {
        console.log(`Error al registrar comandos: ${error}`);
    }
})();