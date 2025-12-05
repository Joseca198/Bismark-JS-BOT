require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

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

client.on("interactionCreate", (interaccion) => {
    if (!interaccion.isChatInputCommand()) return;

    console.log("El comando utilizado fue: " + interaccion.commandName);

    if (interaccion.commandName === "sumar") {
        var Num1 = interaccion.options.get("numero1").value;
        var Num2 = interaccion.options.get("numero2").value;

        interaccion.reply(`El resultado de la suma es: ${Num1 + Num2}`);
    }
    else if (interaccion.commandName === "embet") {
        const embed = new EmbedBuilder()
        .setTitle("Titulo del Embet")
        .setDescription(`Este es un mensaje embet enviado por ${interaccion.user.username}`);
        interaccion.reply ({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);
