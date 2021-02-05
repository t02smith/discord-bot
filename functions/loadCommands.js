const Discord = require("discord.js");
const fs = require("fs");

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

module.exports = { loadCommands };