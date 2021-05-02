"use strict";

var Discord = require("discord.js");

module.exports.run = function _callee(client, message, args) {
  var target, warningRole, mute, muteRole;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          target = message.mentions.members.first();
          warningRole = message.guild.roles.cache.find(function (warning) {
            return warning.name === "Warning";
          });

          mute = function mute() {
            //If no mute option is given assume no mute
            if (args.length < 2) return false;
            var muteOption = args[1].toLowerCase();
            if (muteOption && muteOption === "true") return true;else return false;
          }; //If the user already has the warning role


          if (target.roles.cache.find(function (role) {
            return role === warningRole;
          })) {
            message.guild.members.ban(target);
            message.channel.send("".concat(target, " has been banned following a second warning."));
          } else {
            target.roles.add(warningRole);
            message.channel.send("".concat(target, " has been given a warning. Another warning will result in a ban."));

            if (mute()) {
              muteRole = message.guild.roles.cache.find(function (mute) {
                return mute.name === "Muted";
              });
              target.roles.add(muteRole);
              message.channel.send("".concat(target, " has been muted."));
            }
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.help = {
  "name": "warning",
  "description": "Gives a warning role to a user. Two warnings results in a ban.",
  "use": "warning <userTag> <mute(true/false)>",
  "level": 4
};