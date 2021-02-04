const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const admins = message.guild.roles.cache.find(role => role.name === "Admin").members;
    const suggestion = args.join(" ");
    
    admins.forEach((admin) => {
        admin.send(suggestion)
    })
}

module.exports.help = {
    "name": "suggest",
    "description": "Sends a suggestion to the admins",
    "use": "!suggestion <suggestion>",
    "level": 1
}