const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const target = message.mentions.members.first();
    message.channel.send(`${target} has been kicked.`);
    target.kick();
}

module.exports.help = {
    "name": "kick",
    "description": "Kicks a user from the server.",
    "use": "kick <userTag>",
    "Level": 4
}