const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {

    /**
     * Calback de la funcion.
     * Lo ponemos aqui para no tener que ir hasta abajo en el caso que de halla algun problema con la logica.
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     * 
     */
    callback: async (client, interaction) => {

        const mentionable = interaction.options.get("target-user").value;
        const duration = interaction.options.get("duracion").value; // 1d, 1 day, 5s, 5m
        const reason = interaction.options.get("razon")?.value || "Sin razón proveída.";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable);
        if (!targetUser) {
            await interaction.editReply("El usuario no esta en este servidor");
            return;
        }
        if (targetUser.user.bot) {
            await interaction.editReply("No puedo aislar a un bot")
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply("Por favor dar una duracion valida.")
            return;
        }
        if (msDuration < 5000 || msDuration > 2.419e9 ) {
            await interaction.editReply("La duracion del aislamiento no puede ser menor a 5 segundos o mayor a 28 días");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
        await interaction.editReply(
            "No se puede aislar al dueño del servidor."
        );
        return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // Rango del usuario a aislar
        const requestUserRolePosition = interaction.member.roles.highest.position; // Rango del usuario que ejecuta el cmd
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Rango del rol del bot

        if (targetUserRolePosition >= requestUserRolePosition) {
        await interaction.editReply(
            "No puedes aislar a un miembro con un rango mayor/igual al tuyo."
        );
        return;
        }

        if (targetUserRolePosition >= botRolePosition) {
        await interaction.editReply(
            "No puedo aislar al usuario porque tiene un rol mayor que el mío."
        );
        return;
        }

        // Aislar al miembro
        try {
            const { default: prettyMs} = await import ('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`El aislamiento ${targetUser} se modifico a ${prettyMs(msDuration, { verbose: true })}\nRazon: ${reason}`);
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} fue aislado por ${prettyMs(msDuration, { verbose: true })}\nRazon: ${reason}`);
            
        } catch (error) {
            console.log("Error al utilizar el comando Timeout: "+error)
        }

    },

    name: "timeout",
    description: "Aisla a un usuario por un tiempo dado.",

    options: [
        {
            name: "target-user",
            description: "El usuario al que se quiere aislar",
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: "duracion",
            description: "duracion del aislamiento (5s, 1m, 1h, 1d)",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "razon",
            description: "La razon del aislamiento.",
            type: ApplicationCommandOptionType.String,
        }
    ],

    permissionsRequired: [
        PermissionFlagsBits.MuteMembers,
    ],
    botPermissions: [
        PermissionFlagsBits.MuteMembers,
    ],


}