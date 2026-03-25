const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, MessageFlags, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const generateWelcomeImage = require('../../utils/generateWelcomeImage'); // ajusta el path a tu función
const { getConfig } = require('../../utils/config');
const replaceTemplates = require('../../utils/replaceTemplates');

module.exports = {
    name: "preview-welcome",
    description: "Previsualiza el mensaje de bienvenida sin necesidad de unirse al servidor.",
    devOnly: true, // Solo el desarrollador puede usarlo
    options: [
        {
            name: "usuario",
            description: "El usuario a simular. Si no se especifica, se usa el tuyo.",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    permissionsRequired: [PermissionFlagsBits.ManageGuild],

    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        try {
            const config = getConfig();

            // Usa el usuario especificado o el que ejecutó el comando
            const targetUser = interaction.options.getUser('usuario');
            const member = targetUser
                ? await interaction.guild.members.fetch(targetUser.id)
                : interaction.member;

            if (!member) {
                await interaction.editReply('No se pudo encontrar al usuario en este servidor.');
                return;
            }

            const rulesChannel = interaction.guild.rulesChannel;
            const avatarURL = member.user.displayAvatarURL({ extension: 'png' });
            const custom = config.customWelcomeMessage || {};

            const rawTitle       = custom.title       || `🎉 ¡Bienvenido/a {member-name} a {server-name}! 🎉`;
            const rawDescription = custom.description || `{member-mention}, esperamos que disfrutes tu estadía.\n${rulesChannel ? `Verifica las reglas en ${rulesChannel}` : 'Lee las reglas del servidor'}`;
            const rawFooter      = custom.footer      || `Usuario: {username}`;
            const color          = custom.color       || '#FF0000';

            const title       = replaceTemplates(rawTitle, member);
            const description = replaceTemplates(rawDescription, member);
            const footer      = replaceTemplates(rawFooter, member);

            const imageBuffer = await generateWelcomeImage(member, color);
            const attachment = new AttachmentBuilder(imageBuffer, { name: 'welcome.png' });

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                .setImage('attachment://welcome.png')
                .setFooter({ text: footer, iconURL: avatarURL });

            await interaction.editReply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.log(`Error en preview-welcome: ${error}`);
            await interaction.editReply('Ocurrió un error al generar la preview.');
        }
    },
};