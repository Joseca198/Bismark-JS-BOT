/**
 * Reemplaza las variables de plantilla en un string con los datos del miembro.
 * @param {string} text 
 * @param {import('discord.js').GuildMember} guildMember 
 * @returns {string}
 */
function replaceTemplates(text, guildMember) {
    return text
        // Templates fijos
        .replace(/{member-mention}/g, `<@${guildMember.id}>`)
        .replace(/{member-name}/g,    guildMember.displayName)
        .replace(/{username}/g,       guildMember.user.username)
        .replace(/{server-name}/g,    guildMember.guild.name)
        .replace(/{member-count}/g,   guildMember.guild.memberCount)
        // Template dinámico: {channel:ID}
        .replace(/{channel:(\d+)}/g, (_, channelId) => {
            const channel = guildMember.guild.channels.cache.get(channelId);
            return channel ? `<#${channelId}>` : `_(canal no encontrado)_`;
        });
}

module.exports = replaceTemplates;