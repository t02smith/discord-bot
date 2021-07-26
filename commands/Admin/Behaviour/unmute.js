const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === "Muted");
    const target = message.mentions.members.first();

    if (target.roles.cache.find(role => role === muteRole)) {
        target.roles.remove(muteRole);
        message.channel.send(`${target} was unmuted.`);
    } else {
        message.channel.send(`${target} is not muted.`);
    }
}

module.exports.help = {
    "name": "unmute",
    "description": "Unmutes a muted user",
    "use": "unmute <userTag>",
    "category": "ADMIN",
    "level": 4
}