require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { CommandKit } = require('commandkit');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});


new CommandKit({
    client,
    eventsPath: `${__dirname}/events`,
    //commandsPath: `${__dirname}/commands`
});


// eventHandler(client);

client.login(process.env.TOKEN);
