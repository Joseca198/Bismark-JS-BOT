require("dotenv").config(); 
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: `sumar`,
        description: `Suma dos numeros dados por el usuario.`,
        options: [
            {
                name: "numero1",
                description: "El primer numero a sumar.",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "numero2",
                description: "El primer numero a sumar.",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: `embet`,
        description: `Envía un mensaje embet sobre la persona que lo solicito.`,
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