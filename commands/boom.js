const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    return message.reply("BOOM! You looking for this?");
}

module.exports.help = {
    "name": "boom",
    "description": "Prints a message back to the user",
    "use": "boom",
    "level": 1
}