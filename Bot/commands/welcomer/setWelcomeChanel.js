const {client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const { permissionsRequired } = require('../moderation/ban');

module.exports = {
    name: "set-welcome-channel",
    description: "Establece el canal de bienvenida para el servidor.",
    options: [
        {
            name: "channel",
            description: "El canal de bienvenida",
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
    permissionsRequired: [PermissionFlagsBits.ManageGuild], // Requiere permiso de gestionar el servidor
    botPermissions: [PermissionFlagsBits.ManageGuild], // El bot también necesita este permiso
    devOnly: true, // Solo para desarrolladores

    callback: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        // Aquí iría la lógica para establecer el canal de bienvenida
    }
};