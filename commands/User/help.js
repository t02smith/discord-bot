const Discord = require("discord.js");
const fs = require("fs");
const maxLevel = require("./../../functions/maxLevel.js");

module.exports.run = async(client, message, args) => {
    const userLvl = maxLevel.maxLevel(message); //Gets the maximum permission level of the user

    let output = "```md\nUser Permission Level " + userLvl + "\n**Commands**".padEnd(21, " ") + "**Description**\n";
    client.commands.forEach((command, i) => {
        if (command.help.level <= userLvl) { //The help output will only include commands the user can run
            output += `${command.help.name.padEnd(20, " ")} ${command.help.description}\n`;
        }
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