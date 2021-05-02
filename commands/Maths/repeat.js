const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const n = parseInt(args[0]);
    args.shift();

    const phrase = args.join(" ");

    return message.channel.send(phrase.repeat(n) + " ");
}

module.exports.help = {
    "name": "repeat",
    "description": "repeats a word a given number of times",
    "use": "repeat <n> <word>",
    "level": 1
}