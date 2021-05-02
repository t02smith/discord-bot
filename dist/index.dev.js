"use strict";

//Discord client - Don Cheadle
//Ensures we have the correct libraries available
var Discord = require("discord.js");

var express = require("express");

var fs = require("fs");

require("dotenv").config();

var maxLevel = require("./functions/maxLevel.js");

var loadCommands = require("./functions/loadCommands.js"); //Config file


var config = require("./config/config.json"); //Discord client to control the bot


var client = new Discord.Client(); //Called when the bot goes online

client.on("ready", function () {
  client.user.setStatus("online");
  client.user.setPresence({
    activity: {
      name: config.botPresence.name,
      type: config.botPresence.type
    }
  });
  console.log("->".concat(client.user.username, " is online.<-\n")); //Loads commands

  client.commands = new Discord.Collection();
  loadCommands.loadCommands("./commands", client); //Waits before seeing how many commands are loaded

  setTimeout(function () {
    console.log("".concat(Array.from(client.commands.values()).length, " commands loaded.\n"));
  }, 100);
}); //Organises messages received by the bot

var prefix = config.prefix;
client.on("message", function _callee(message) {
  var content, command, args, commandFile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(message.channel.type === "dm")) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          //Content of the message
          content = message.content.split(" ");
          command = content[0];
          args = content.slice(1); //Checks if it is a command

          commandFile = client.commands.get(command.slice(prefix.length)); //Runs the command if it exists and the user is allowed to

          if (commandFile && commandFile.help.level <= maxLevel.maxLevel(message)) {
            commandFile.run(client, message, args);
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
client.login(process.env.DISCORD_TOKEN);
var app = express();
app.set("view engine", "html");
var port = config.port;
app.listen(port, function () {
  console.log("Server running at port ".concat(port, "\n"));
});
app.get("/", function (req, res) {
  res.render("hello world");
});