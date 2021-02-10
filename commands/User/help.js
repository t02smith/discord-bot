const Discord = require("discord.js");
const fs = require("fs");
const maxLevel = require("./../../functions/maxLevel.js");
const config = require("../../config/config.json");

module.exports.run = async(client, message, args) => {
    const userLvl = maxLevel.maxLevel(message); //Gets the maximum permission level of the user
    let addedCommands = 0;

    let output = "```md\nUser Permission Level " + userLvl + "\n\n**Commands**".padEnd(23, " ") + "**Use**".padEnd(39, " ") + "**Description**\n";
    client.commands.forEach((command, i) => {
        if (command.help.level <= userLvl && (args.length === 0 || args.includes(command.help.name))) { //The help output will only include commands the user can run
            output += `${command.help.name.padEnd(20, " ")} ${config.prefix}${command.help.use.padEnd(38, " ")} ${command.help.description}\n`;
            addedCommands++;
        }
    })

    output += "```";

    if (addedCommands === 0) return message.channel.send("```Invalid command(s)```");
    return message.channel.send(output);
    
}

module.exports.help = {
    "name": "help",
    "description": "Lists all available commands or any specified ones",
    "use": "help <specified commands>",
    "level": 1
}