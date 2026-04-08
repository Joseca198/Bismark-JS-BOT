const { Client, Interaction, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { getConfig, saveConfig } = require('../../utils/config');

module.exports = {
    name: "reset-welcome-images-texts",
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
                content: "No hay textos de bienvenida personalizados configurados.",
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        delete config.customWelcomeMessage;
        saveConfig(config);

        await interaction.reply({
            content: "✅ Los textos de bienvenida personalizados fueron restablecidos correctamente.",
            flags: MessageFlags.Ephemeral
        });
    }
};