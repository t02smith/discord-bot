"use strict";

var Discord = require("discord.js");

var fs = require("fs");

function loadCommands(path, client) {
  fs.readdir(path, function (err, files) {
    if (err) console.log(err); //Searches for commands in all directories

    var commands = [];
    files.forEach(function (dir) {
      if (dir != "dist") {
        if (dir.split(".").pop() === "js") {
          commands.push(dir);
        } else if (fs.existsSync("".concat(path, "/").concat(dir))) {
          loadCommands("".concat(path, "/").concat(dir), client);
        }
      }
    }); //Loads all the found commands

    commands.forEach(function (commandPath) {
      var command = require("../".concat(path, "/").concat(commandPath));

      client.commands.set(command.help.name, command);
    });
  });
}

module.exports = {
  loadCommands: loadCommands
};