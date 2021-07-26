//Discord client

//Ensures we have the correct libraries available
const Discord = require("discord.js");
const express = require("express");
const fs = require("fs");
require("dotenv").config();


//Config file
const config = require("./config/config.json");

//Command management
const commands = require("./functions/commands.js");

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
    commands.loadCommands("./commands", client);

    //Waits before seeing how many commands are loaded
    setTimeout(() => {
        console.log(`${Array.from(client.commands.values()).length} commands loaded.\n`);
    },100);

});


//When a message is sent to a server the bot is in
client.on("message", async (message) => {
    //if (message.author.client) return;          //If the bot sends the message

    //If someone private messages the bot
    if (message.channel.type === "dm") return;

    commands.runCommand(client, message);
    
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
