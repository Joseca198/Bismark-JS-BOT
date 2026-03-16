const {client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType} = require('discord.js');
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
    devOnly: true, // Solo para desarrolladores

    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        // Validar que el canal sea de texto
        if (channel.type !== ChannelType.GuildText) {
            await interaction.reply({
                content: "El canal seleccionado debe ser de texto.",
                ephemeral: true
            });
            return;
        }
    }
};