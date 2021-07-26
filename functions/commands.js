const Discord = require("discord.js");
const fs = require("fs");
const maxLevel = require("./maxLevel.js");
const config = require("../config/config.json")

/**
 * Loads all the commands the bot can run
 * @param {String} path The location of the commands folder
 * @param {Discord.Client} client The discord client
 */
function loadCommands(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) console.log(err);

        //Searches for commands in all directories
        let commands = []
        files.forEach((dir) => {
            if (dir != "dist") {
                if (dir.split(".").pop() === "js") {
                    commands.push(dir);
                } else if (fs.existsSync(`${path}/${dir}`)) {
                    loadCommands(`${path}/${dir}`, client);
                }
            }  
        })
        
        //Loads all the found commands
        commands.forEach((commandPath) => {
            let command = require(`../${path}/${commandPath}`);
            client.commands.set(command.help.name, command);
        });

    });
    
}

/**
 * Runs a given command
 * @param {Discord.Client} client The discord client
 * @param {String} message The user's message with the command
 */
function runCommand(client, message) {
    if (!message.content.startsWith(config.prefix)) return;

    //Content of the message
    let content = message.content.split(" ");   
    let command = content[0];
    let args = content.slice(1);

    //Checks if it is a command
    let commandFile = client.commands.get(command.slice(config.prefix.length));

    //Runs the command if it exists and the user is allowed to
    if (commandFile && commandFile.help.level <= maxLevel.maxLevel(message)) {
        commandFile.run(client, message, args);
    } 
}

module.exports = { loadCommands, runCommand }

