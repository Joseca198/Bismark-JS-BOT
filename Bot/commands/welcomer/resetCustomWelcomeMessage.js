const { Client, Interaction, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { getConfig, saveConfig } = require('../../utils/config');

module.exports = {
    name: "reset-custom-welcome-message",
    description: "Restablece el mensaje de bienvenida personalizado al valor predeterminado.",
    permissionsRequired: [PermissionFlagsBits.ManageGuild],

    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        const config = getConfig();

        if (!config.customWelcomeMessage) {
            await interaction.reply({
                content: "No hay ningún mensaje de bienvenida personalizado configurado.",
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        delete config.customWelcomeMessage;
        saveConfig(config);

        await interaction.reply({
            content: "✅ El mensaje de bienvenida personalizado fue restablecido correctamente.",
            flags: MessageFlags.Ephemeral
        });
    }
};