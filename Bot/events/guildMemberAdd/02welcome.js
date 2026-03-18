const { EmbedBuilder } = require('discord.js');
const { getConfig } = require('../../utils/config');

/**
 * @param {*} client 
 * @param {import('discord.js').GuildMember} guildMember 
 */

module.exports = async (client, guildMember) => {
    try {
        const config = getConfig();

        // Si el usuario es un bot no dar bienvenida
        if (guildMember.user.bot) return;

        // Si no hay canal de bienvenida configurado, se cancela
        if (!config.welcomeChannel) return;

        // Buscar el canal, si fue borrado cache.get() devuelve undefined
        const welcomeChannel = guildMember.guild.channels.cache.get(config.welcomeChannel);

        if (!welcomeChannel) {
            console.log('El canal de bienvenida configurado ya no existe.');
            return;
        }

        const rulesChannel = guildMember.guild.rulesChannel;
        const avatarURL = guildMember.user.displayAvatarURL({ dynamic: true });

        const embed = new EmbedBuilder()
            .setTitle(`🎉 ¡Bienvenido/a! ${guildMember.displayName} 🎉`)
            .setDescription(
                `${guildMember.toString()}, esperamos que disfrutes tu estadía.\n` +
                `${rulesChannel ? `Verifica las reglas en ${rulesChannel.toString()}` : 'Lee las reglas del servidor'}`
            )
            .setColor('Red')
            .setThumbnail(avatarURL)
            .setFooter({
                text: `Usuario: ${guildMember.user.username}`,
                iconURL: avatarURL,
            });

        await welcomeChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(`Error al enviar bienvenida: ${error}`);
    }
};