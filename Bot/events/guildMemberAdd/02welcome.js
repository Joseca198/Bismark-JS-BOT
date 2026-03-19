const { EmbedBuilder } = require('discord.js');
const { getConfig } = require('../../utils/config');
const replaceTemplates = require('../../utils/replaceTemplates');

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
        const avatarURL = guildMember.user.displayAvatarURL({ dynamic: true });

        // Defaults si no hay mensaje personalizado configurado
        const custom = config.customWelcomeMessage || {};
        const rawTitle       = custom.title       || `🎉 ¡Bienvenido/a {member-name} a {server-name}! 🎉`;
        const rawDescription = custom.description || `{member-mention}, esperamos que disfrutes tu estadía.\n${rulesChannel ? `Verifica las reglas en ${rulesChannel}` : 'Lee las reglas del servidor'}`;
        const rawFooter      = custom.footer      || `Usuario: {username}`;
        const color          = custom.color       || 'Red';

        // Aplicar templates a todos los campos de una vez
        const title       = replaceTemplates(rawTitle, guildMember);
        const description = replaceTemplates(rawDescription, guildMember);
        const footer      = replaceTemplates(rawFooter, guildMember);

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setThumbnail(avatarURL)
            .setFooter({ text: footer, iconURL: avatarURL });

        await welcomeChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(`Error al enviar bienvenida: ${error}`);
    }
};