const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    return message.reply(message.author.id);
}

module.exports.help = {
    "name": "id",
    "description": "Returns a user's id",
    "use": "id",
    "level": 1
}