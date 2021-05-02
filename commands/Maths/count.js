const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let matches = 0;

    const input = args.join(" ").split("|");
    const searchFor = input[0].trim().split("");
    const searchIn = input[1].trim().split("");

    let searchIndex = 0;
    for (let i = 0; i < searchIn.length; i++) {
        if (searchIn[i] == searchFor[searchIndex]) searchIndex++;
        else searchIndex = 0;

        if (searchIndex == searchFor.length) {
            matches++;
            searchIndex = 0;
        }
    }

    message.channel.send(`'${input[0].trim()}' was found ${matches} times!`); 
}

module.exports.help = {
    "name": "count",
    "description": "Counts the number of time a string appears in a word/phrase",
    "use": "count <letter/string> | <word/phrase>",
    "level": 1

}