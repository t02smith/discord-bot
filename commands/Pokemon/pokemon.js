const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async(client, message, args) => {
    if (args.length === 0) {
        message.reply("No pokemon specified.");
        return;
    }

    const link = `https://pokeapi.co/api/v2/pokemon/${args[0]}`;

    axios.get(link).then(res => {
        if (!res) {
            message.reply(`Pokemon "${args[0]}" not found.`);
            return;
        }

        const poke = res.data;

        let desc = "";

        poke.types.forEach(type => {
            desc += `[${type.type.name.toUpperCase()}]  `
        });
        desc += "\n";



        message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(`#${poke.id}: ${poke.name}`)
                .setDescription(desc)
                .setThumbnail(poke.sprites.front_default)
                .addFields(
                    poke.stats.map(stat => {
                        return {
                            name: `${stat.stat.name}: ${stat.base_stat}`,
                            value: "#".repeat(Math.floor(stat.base_stat/10))
                        }
                    })
                )
        )
    })


}

module.exports.help = {
    "name": "pokemon",
    "description": "Get a pokedex entry",
    "use": "pokemon <name>",
    "category": "GAME",
    "level": 1
}