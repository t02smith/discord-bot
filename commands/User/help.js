const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(client, message, args) => {
    let output = "```md\n" + "**Commands**".padEnd(21, " ") + "**Description**\n";
    client.commands.forEach((command, i) => {
        output += `${command.help.name.padEnd(20, " ")} ${command.help.description}\n`;
    })

    output += "```";

    return message.channel.send(output);
    
}

module.exports.help = {
    "name": "help",
    "description": "Lists all available commands",
    "use": "roll <upperBound>",
    "level": 1
}