const {client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
const { getConfig, saveConfig } = require('../../utils/config');

module.exports = {
    name: "set-custom-welcome-message",
    description: "Establece un mensaje de bienvenida personalizado. Ver documentacion para mas detalles.",
    options: [
        {
            name: "title",
            description: "El título del mensaje de bienvenida",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "description",
            description: "La descripción del mensaje de bienvenida",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "footer",
            description: "El pie de página del mensaje de bienvenida",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "color",
            description: "El color del mensaje de bienvenida (en formato hexadecimal, ej: #FF0000)",
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.ManageGuild], // Requiere permiso de gestionar el servidor
    devOnly: true, // Solo para desarrolladores
    
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        // Logica para establecer el mensaje de bienvenida personalizado
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");
        const footer = interaction.options.getString("footer");
        const color = interaction.options.getString("color");

        // si todas estan vacias entonces tira un mensaje de ayuda
        if (!title && !description && !footer && !color) {
            return interaction.reply({ 
                content: "Para tu mensaje de bienvenida debes proporcionar al menos un campo. Algunas templates: {mention-member}, {server-name}, {username}, {member-count}, {rules-channel}. Ejemplo: `¡Bienvenido {member-mention} a {server-name}! Ahora somos {member-count} miembros.` ", 
                flags: MessageFlags.Ephemeral 
            });
        }

        // Validar el color si fue proporcionado de manera correcta
        if (color && !/^#[0-9A-Fa-f]{6}$/.test(color)) {
            return interaction.reply({
                content: "El color debe estar en formato hexadecimal válido. Ejemplo: `#FF0000`",
                flags: MessageFlags.Ephemeral
            });
        }

        const config = getConfig();

        // Mergear con lo existente para no borrar campos que no se tocaron
        config.customWelcomeMessage = {
            ...config.customWelcomeMessage, // lo que ya había guardado antes
            ...(title       && { title }),
            ...(description && { description }),
            ...(footer      && { footer }),
            ...(color       && { color }),
        };

        saveConfig(config);

        // Mostrar resumen de cómo quedó la configuración completa
        const current = config.customWelcomeMessage;
        await interaction.reply({
            content: [
                "✅ Mensaje de bienvenida actualizado:",
                `**Título:** ${current.title ?? '_No configurado_'}`,
                `**Descripción:** ${current.description ?? '_No configurada_'}`,
                `**Footer:** ${current.footer ?? '_No configurado_'}`,
                `**Color:** ${current.color ?? '_No configurado_'}`,
            ].join("\n"),
            flags: MessageFlags.Ephemeral
        });


    }
};