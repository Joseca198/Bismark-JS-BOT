const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { getConfig } = require('../../utils/config');
const replaceTemplates = require('../../utils/replaceTemplates');
const generateWelcomeImage = require('../../utils/generateWelcomeImage');

/**
 * @param {*} client 
 * @param {import('discord.js').GuildMember} guildMember 
 */
module.exports = async (client, guildMember) => {
    try {
        const config = getConfig();

        if (guildMember.user.bot) return;
        if (!config.welcomeChannel) return;

        const welcomeChannel = guildMember.guild.channels.cache.get(config.welcomeChannel);
        if (!welcomeChannel) {
            console.log('El canal de bienvenida configurado ya no existe.');
            return;
        }

        const rulesChannel = guildMember.guild.rulesChannel;
        const avatarURL = guildMember.user.displayAvatarURL({ extension: 'png' });

        const custom = config.customWelcomeMessage || {};
        const rawTitle       = custom.title       || `🎉 ¡Bienvenido/a {member-name} a {server-name}! 🎉`;
        const rawDescription = custom.description || `{member-mention}, esperamos que disfrutes tu estadía.\n${rulesChannel ? `Verifica las reglas en ${rulesChannel}` : 'Lee las reglas del servidor'}`;
        const rawFooter      = custom.footer      || `Usuario: {username}`;
        const color          = custom.color       || '#FF0000';

        const title       = replaceTemplates(rawTitle, guildMember);
        const description = replaceTemplates(rawDescription, guildMember);
        const footer      = replaceTemplates(rawFooter, guildMember);

        // Generar imagen de bienvenida
        const imageBuffer = await generateWelcomeImage(guildMember, color);
        const attachment = new AttachmentBuilder(imageBuffer, { name: 'welcome.png' });

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setImage('attachment://welcome.png') // Imagen generada como banner
            .setFooter({ text: footer, iconURL: avatarURL });

        await welcomeChannel.send({ embeds: [embed], files: [attachment] });

    } catch (error) {
        console.log(`Error al enviar bienvenida: ${error}`);
    }
};