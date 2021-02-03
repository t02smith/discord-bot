//Discord client - Don Cheadle

//Ensures we have the correct libraries available
const Discord = require("discord.js");
const express = require("express");
const fs = require("fs");

//Config file
const config = require("./config/config.json");

//Discord client to control the bot
const client = new Discord.Client();


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
            let command = require(`${path}/${commandPath}`);
            console.log(`${commandPath} loaded`);
            client.commands.set(command.help.name, command);
        });

    });

}

//Called when the bot goes online
client.on("ready", () => {
    client.user.setStatus("online");
    client.user.setPresence({
        game: {
            name: "with your feelings ;)",
        }
    });

    console.log(`->${client.user.username} is online.<-\n`)
    console.log("Active Commands:");

    //Loads commands
    client.commands = new Discord.Collection();
    loadCommands("./commands", client);

    
});

//Organises messages received by the bot
const prefix = config.prefix;
client.on("message", async (message) => {
    //if (message.author.client) return;          //If the bot sends the message
    if (message.channel.type === "dm") return;  //If someone private messages the bot

    //Content of the message
    
    let content = message.content.split(" ");   
    let command = content[0];
    let args = content.slice(1);

    //Checks if it is a command
    let commandFile = client.commands.get(command.slice(prefix.length));
    if (commandFile) commandFile.run(client, message, args);
});


client.login(config.token);

let app = express();

app.set("view engine", "html");

const port = config.port;
app.listen(port, () => {
    console.log(`Server running at port ${port}\n`);
});

app.get("/", function (req, res) {
    res.render("hello world");
});