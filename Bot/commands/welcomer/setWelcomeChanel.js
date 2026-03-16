const {client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
const { getConfig, saveConfig } = require('../../utils/config');

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
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        try {
            const config = getConfig();
            config.welcomeChannel = channel.id;
            saveConfig(config);
            await interaction.reply({
                content: `Canal de bienvenida establecido a ${channel}.`,
                flags: MessageFlags.Ephemeral
            });
        }catch (error) {
            console.error("Error al guardar la configuración:", error);
            await interaction.reply({
                content: "Hubo un error al guardar la configuración. Por favor, inténtalo de nuevo.",
                flags: MessageFlags.Ephemeral
            });
        }
    }
};