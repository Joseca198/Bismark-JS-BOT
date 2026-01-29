const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "tirar-dados",
    description: "Simula una tirada de dados.",
    options: [
        {
            name: "caras",
            description: "Las caras que tendra el dado, Entre 2 y 300 caras.",
            type: ApplicationCommandOptionType.Integer,
            MinValue: 2,
            MaxValue: 300,
            required: true,
        },
        {
            name: "cantidad",
            description: "cantidad de dados que se van a tirar, Entre 1 y 12 dados.",
            type: ApplicationCommandOptionType.Integer,
            MinValue: 1,
            MaxValue: 12,
        }
    ],

    /**
     * Hacemos Callback y damos parametros para hacer lo de los numeros aleatorios
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     * 
     * 
     */

    callback: async (client,interaction) => {
        const valCaras = interaction.options.get("caras").value;
        const valCantidad = interaction.options.get("cantidad")?.value || 1;

        await interaction.deferReply();

        const resultados = [];
        for (let i = 0; i < valCantidad; i++) {
            resultados.push(Math.floor(Math.random() * valCaras) + 1);
        }
        
        const total = resultados.reduce((a, b) => a + b, 0);
        
        await interaction.editReply(
            `🎲 **Tirando ${valCantidad} dado(s) de ${valCaras} caras:**\n` +
            `Resultados: ${resultados.join(', ')}\n` +
            `**Total: ${total}**`
        );
    }
}