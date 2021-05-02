"use strict";

var Discord = require("discord.js");

module.exports.run = function _callee(client, message, args) {
  var admins, suggestion;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          admins = message.guild.roles.cache.find(function (role) {
            return role.name === "Admin";
          }).members;
          suggestion = args.join(" ");
          admins.forEach(function (admin) {
            admin.send("Suggestion from ".concat(message.member, " for **").concat(message.guild.name, "**:\n > ").concat(suggestion));
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.help = {
  "name": "suggest",
  "description": "Sends a suggestion to the admins",
  "use": "suggest <suggestion>",
  "level": 1
};