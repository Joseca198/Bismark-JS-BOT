const { devs, server } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        await interaction.reply({
          content: 'Solo desarrolladores pueden utilizar este comando.',
          ephemeral: true,
        });
        return;
      }
    }

    if (interaction.guild?.id !== server) {
    await interaction.reply({
      content: 'Este bot no está disponible en este servidor.',
      ephemeral: true,
    });
    return;
  }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          await interaction.reply({
            content: 'No se tienen permisos para ejecutar este comando.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          await interaction.reply({
            content: "El bot no tiene permisos para ejecutar este comando.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`Error al ejecutar comando: ${error}`);
  }
};