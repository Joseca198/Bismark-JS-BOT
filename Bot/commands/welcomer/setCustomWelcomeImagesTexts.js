const {client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
const { getConfig, saveConfig } = require('../../utils/config');

module.exports = {
    name: "set-custom-welcome-image-texts",
    description: "Establece los textos para las imágenes de bienvenida personalizadas.",
    options: [
        {
            name: "title",
            description: "El título de la imagen de bienvenida.",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "title-color",
            description: "El color del título de la imagen de bienvenida (en formato hexadecimal, ej: #FF0000)",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "description",
            description: "La descripción de la imagen de bienvenida.",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "description-color",
            description: "El color de la descripción de la imagen de bienvenida (en formato hexadecimal, ej: #FF0000)",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "footer",
            description: "El pie de página de la imagen de bienvenida.",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "footer-color",
            description: "El color del pie de página de la imagen de bienvenida (en formato hexadecimal, ej: #FF0000)",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "avatar-border-color",
            description: "El color de la imagen de bienvenida (en formato hexadecimal, ej: #FF0000)",
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.ManageGuild], // Requiere permiso de gestionar el servidor
    devOnly:true, // Solo para desarrolladores
    
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        const title            = interaction.options.getString("title");
        const description      = interaction.options.getString("description");
        const footer           = interaction.options.getString("footer");
        const titleColor       = interaction.options.getString("title-color");
        const descriptionColor = interaction.options.getString("description-color");
        const footerColor      = interaction.options.getString("footer-color");
        const avatarBorderColor = interaction.options.getString("avatar-border-color");

        // Validar que los colores sean hex válidos
        const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        const colorsToValidate = { titleColor, descriptionColor, footerColor, avatarBorderColor };

        for (const [key, value] of Object.entries(colorsToValidate)) {
            if (value && !hexRegex.test(value)) {
                await interaction.reply({
                    content: `❌ El color **${key}** no es un formato hexadecimal válido. Ejemplo: \`#FF0000\``,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
        }

        // Verificar que se pasó al menos una opción
        const hasAnyValue = [title, description, footer, titleColor, descriptionColor, footerColor, avatarBorderColor]
            .some(v => v !== null);

        if (!hasAnyValue) {
            await interaction.reply({
                content: "❌ Debes proporcionar al menos una opción para configurar.",
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        // Guardar solo los campos que se proporcionaron
        const config = getConfig();
        config.welcomeImageTexts = {
            ...config.welcomeImageTexts, // 👈 mantiene lo que ya estaba guardado
            ...(title            && { title }),
            ...(description      && { description }),
            ...(footer           && { footer }),
            ...(titleColor       && { titleColor }),
            ...(descriptionColor && { descriptionColor }),
            ...(footerColor      && { footerColor }),
            ...(avatarBorderColor && { avatarBorderColor }),
        };
        saveConfig(config);

        // Confirmación mostrando qué se actualizó
        const updated = Object.entries({
            title, description, footer,
            titleColor, descriptionColor, footerColor, avatarBorderColor
        })
            .filter(([, v]) => v !== null)
            .map(([k, v]) => `• **${k}**: \`${v}\``)
            .join('\n');

        await interaction.reply({
            content: `✅ Configuración de la imagen de bienvenida actualizada:\n${updated}`,
            flags: MessageFlags.Ephemeral
        });
    }
};