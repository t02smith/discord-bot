//Discord client - Don Cheadle

//Ensures we have the correct libraries available
const Discord = require("discord.js");
const express = require("express");
const fs = require("fs");
require("dotenv").config();

const maxLevel = require("./functions/maxLevel.js");
const loadCommands = require("./functions/loadCommands.js");

//Config file
const config = require("./config/config.json");

//Discord client to control the bot
const client = new Discord.Client();

//Called when the bot goes online
client.on("ready", () => {
    client.user.setStatus("online");
    client.user.setPresence({
        activity: {
            name: config.botPresence.name,
            type: config.botPresence.type
        }
    });

    console.log(`->${client.user.username} is online.<-\n`);

    //Loads commands
    client.commands = new Discord.Collection();
    loadCommands.loadCommands("./commands", client);

    //Waits before seeing how many commands are loaded
    setTimeout(() => {
        console.log(`${Array.from(client.commands.values()).length} commands loaded.\n`);
    },100);

});

//Organises messages received by the bot
const prefix = config.prefix;
client.on("message", async (message) => {
    //if (message.author.client) return;          //If the bot sends the message

    //If someone private messages the bot
    if (message.channel.type === "dm") return;

    //Content of the message
    let content = message.content.split(" ");   
    let command = content[0];
    let args = content.slice(1);

    //Checks if it is a command
    let commandFile = client.commands.get(command.slice(prefix.length));

    //Runs the command if it exists and the user is allowed to
    if (commandFile && commandFile.help.level <= maxLevel.maxLevel(message)) {
        commandFile.run(client, message, args);
    } 
    
});

client.login(process.env.DISCORD_TOKEN);

let app = express();
app.set("view engine", "html");

const port = config.port;
app.listen(port, () => {
    console.log(`Server running at port ${port}\n`);
});

app.get("/", function (req, res) {
    res.render("hello world");
});
