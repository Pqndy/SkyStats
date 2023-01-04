const {
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js')
const ms = require('ms');
const {
    getLatestProfile
} = require('../../../API/functions/getLatestProfile');
const {
    addNotation,
    capitalize,
    addCommas
} = require('../../contracts/helperFunctions')
const {
    getNetworth,
    getPrices,
    getItemNetworth
} = require('skyhelper-networth');
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const config = require('../../../config.json');
const {
    trimEnd,
    lowerCase
} = require('lodash');


module.exports = {
    name: 'player',
    description: 'Fetches Hypixel Data',
    options: [{
        name: 'name',
        description: 'Minecraft Username',
        type: 3,
        required: true
    }],


    execute: async (interaction, client) => {
        const name = interaction.options.getString("name")
        const rank = (await hypixel.getPlayer(name)).rank
        const guild = (await hypixel.getPlayer(name)).guild || `? ? ?`
        const mcversion = (await hypixel.getPlayer(name)).mcVersion || `1.8x`
        const status = (await hypixel.getPlayer(name)).isOnline
        const level = (await hypixel.getPlayer(name)).level
        const expall = (await hypixel.getPlayer(name)).totalExperience
        const karma = (await hypixel.getPlayer(name)).karma
        const nickname = (await hypixel.getPlayer(name)).nickname
        const lang = (await hypixel.getPlayer(name)).userLanguage
        const expofall = addCommas(expall)
        const language = lowerCase(lang)
        const lanng = capitalize(language)
        const karmadata = addCommas(karma)


        const embeded = {
            title: `Showing Hypixel Stats For ${name}`,
            description: (`\n`),
            fields: [{
                    name: 'Rank',
                    value: `${rank}`,
                    inline: true,
                },
                {
                    name: 'Guild',
                    value: `${guild}`,
                    inline: true,
                },
                {
                    name: 'Online Status',
                    value: `${status}`,
                    inline: true,
                },
                {
                    name: 'Level',
                    value: `${level}`,
                },
                {
                    name: 'Total Experience',
                    value: `${expofall}`,
                    inline: true,
                },
                {
                    name: `Total Karma`,
                    value: `${karmadata}`,
                    inline: true,
                },
                {
                    name: 'Mc Version',
                    value: `${mcversion}`,
                },
                {
                    name: 'Nickname',
                    value: `${nickname}`,
                },
                {
                    name: 'Language',
                    value: `${lanng}`,
                },
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `🌹  SkyStats 🌹`,
            },
        };

        await interaction.reply({
            embeds: [embeded]
        })
    },
};