require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", (c) => {
    console.log(`✅ El bot ${c.user.username} está listo.`);
});

client.on("messageCreate", (message) => {
    var mensaje = message.content;
    var usuario = message.author.username;
    console.log("Mensaje recibido: " + mensaje);
    if (usuario === "Joseca198" && mensaje === "Hola Bismarck") {
        message.channel.send("¡Hola creador! ¿Cómo estás?");
        return;
    }
    if (mensaje === "Hola Bismarck") {
        message.channel.send("¡Hola! ¿En qué puedo ayudarte?");
    }
});

client.login(process.env.TOKEN);
