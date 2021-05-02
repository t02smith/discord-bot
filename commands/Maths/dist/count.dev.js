"use strict";

var Discord = require("discord.js");

module.exports.run = function _callee(client, message, args) {
  var matches, input, searchFor, searchIn, searchIndex, i;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          matches = 0;
          input = args.join(" ").split("|");
          searchFor = input[0].trim().split("");
          searchIn = input[1].trim().split("");
          searchIndex = 0;

          for (i = 0; i < searchIn.length; i++) {
            if (searchIn[i] == searchFor[searchIndex]) searchIndex++;else searchIndex = 0;

            if (searchIndex == searchFor.length) {
              matches++;
              searchIndex = 0;
            }
          }

          message.channel.send("'".concat(input[0].trim(), "' was found ").concat(matches, " times!"));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.help = {
  "name": "count",
  "description": "Counts the number of time a string appears in a word/phrase",
  "use": "count <letter/string> | <word/phrase>",
  "level": 1
};