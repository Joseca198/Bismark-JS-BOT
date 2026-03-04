const { EmbedBuilder } = require('discord.js');

/**
 * 
 * @param {*} client 
 * @param {import('discord.js').GuildMember} guildMember 
 * @returns 
 */

module.exports = async (client, guildMember) => {
    try {
        // Obtiene la configuración del canal de bienvenida del servidor
        const systemChannel = guildMember.guild.systemChannel;

        // Si el servidor no tiene canal de bienvenida configurado, se cancela
        if (!systemChannel) return;

        // Busca el canal de reglas del servidor (si tiene uno configurado)
        const rulesChannel = guildMember.guild.rulesChannel;

        // log de control para ver si se encuentra el canal de reglas y bienvenida
        console.log(`Canal de reglas encontrado: ${rulesChannel ? rulesChannel.name : 'No se encontró canal de reglas'}`);
        console.log(`Canal de bienvenida encontrado: ${systemChannel ? systemChannel.name : 'No se encontró canal de bienvenida'}`);

        // Obtiene el avatar del miembro, si no tiene usa el predeterminado
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

        await systemChannel.send({ embeds: [embed] });

    } catch (error) {
        console.log(`Error al enviar bienvenida: ${error}`);
    }
};