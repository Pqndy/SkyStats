//EZ GG WP wxkydoodle @ W4ckydoodle 4ever!!!!
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const { addCommas } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')

module.exports = {
    name: 'bedwars',
    description: 'Gets BedWars Data',
    options: [
        {
            name: 'player',
            description: 'Minecraft Username',
            type: 3,
            required: true
        },  
      ],

    execute: async (interaction, client, InteractionCreate) => {
        let play = interaction.options.getString('player')
        const player = await hypixel.getPlayer(play)
        const uuid = getUUID(play)
        const embed = {
            color: 0xffa600,
            title: `Bedwars Stats For ${player}`,
            description: (`\n`),
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${play}`,
            },
            fields: [
            {
                name: 'Level',
                value: `[${player.stats.bedwars.level}✫]`,
            },
            {
                name: `Final Kills`,
                value: `${addCommas(player.stats.bedwars.finalKills)}`,
            },
            {
                name: `FKDR`,
                value: `${player.stats.bedwars.finalKDRatio}`,
            },
            {
                name: `Wins`,
                value: `${player.stats.bedwars.wins}`,
            },
            {
                name: `WLR`,
                value: `${player.stats.bedwars.WLRatio}`,
            },
            {
                name: `Beds Broken`,
                value: `${player.stats.bedwars.beds.broken}`,
            },
            {
                name: `BBLR`,
                value: `${player.stats.bedwars.beds.BLRatio}`,
            },
            {
                name: `:sparkles: Winstreak :sparkles:`,
                value: `${player.stats.bedwars.winstreak}`,
            },
        ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.defaultbetter}` , iconURL: `${messages.footer.icon}`,
            },
        };
 
            await interaction.reply({ embeds:[embed] })

    }
};;