const Discord = require("discord.js");
const fs = require("fs");
const maxLevel = require("./../../functions/maxLevel.js");
const config = require("../../config/config.json");

//Command categories to be listed by default
const CATERGORIES = new Set([
    "USER",
    "MUSIC",
    "GAME"
])

module.exports.run = async(client, message, args) => {
    const userLvl = maxLevel.maxLevel(message); //Gets the maximum permission level of the user
    let addedCommands = 0;

    //Add any extra categories
    args.forEach(cat => CATERGORIES.add(cat));

    let output = "```md\nUser Permission Level " + userLvl + "\n\n**Commands**".padEnd(23, " ") + "**Use**".padEnd(39, " ") + "**Description**\n";
    client.commands.forEach((command, i) => {

        //The help output will only include commands the user can run
        if (command.help.level <= userLvl && 
            CATERGORIES.has(command.help.category)) { 

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
    "use": "help <categories>",
    "category": "USER",
    "level": 1
}