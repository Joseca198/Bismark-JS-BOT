const { Client, Interaction , ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "ban",
  description: "Banea a un miembro del server.",
  options: [
    {
      name: "usuario",
      description: "El usuario a banear",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "razon",
      description: "La razon del baneo.",
      type: ApplicationCommandOptionType.String,
    }
  ],

  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],

  /**
   * Funcion del comando
   * 
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('usuario').value;
    const reason = interaction.options.get('razon')?.value || 'Sin razón proveída.';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("El usuario no existe en este servidor.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "No se puede banear al dueño del servidor."
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Rango del usuario a banear
    const requestUserRolePosition = interaction.member.roles.highest.position; // Rango del usuario que ejecuta el cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Rango del rol del bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "No puedes banear a un miembro con un rango mayor/igual al tuyo."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "No puedo banear al usuario porque tiene un rol mayor que el mío."
      );
      return;
    }

    // Ban the targetUser
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `El usuario ${targetUser} fue baneado\nRazon: ${reason}`
      );
    } catch (error) {
      console.log(`Error al utilizar el comando de baneo: ${error}`);
    }
  },

};