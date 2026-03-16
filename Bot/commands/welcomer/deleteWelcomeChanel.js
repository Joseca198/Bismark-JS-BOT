const {client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType, MessageFlags, EntryPointCommandHandlerType } = require('discord.js');
const { getConfig, saveConfig } = require('../../utils/config');


module.exports = {
    name: "delete-welcome-channel",
    description: "Elimina el canal de bienvenida del servidor.",
    permissionsRequired: [PermissionFlagsBits.ManageGuild], // Requiere permiso de gestionar el servidor

    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        const config = getConfig(interaction.guild.id);

        // Verificamos que se halla creado un canal de bienvenida
        if (!config.welcomeChannel) {
            await interaction.reply({
                content: "No hay ningun canal de bienvenida configurado.",
                flags: MessageFlags.Ephemeral
            })
            return;
        }

        // Borrar el campo y guardar la configuración
        delete config.welcomeChannel;
        saveConfig(config);

        await interaction.reply({
            content: "✅ El canal de bienvenida fue eliminado correctamente.",
            flags: MessageFlags.Ephemeral
        });
    }
};

