const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const letter = args[0];

    const reg = /"(.*?)"/g
    let msg = message.content.match(reg);
    msg.forEach((phrase, i) => {
        msg[i] = phrase.substring(1, phrase.length-1);
    })

    //For now im gonna assume that the user is only gonna input a letter to search for
    const phrase = msg[0];
    let count = 0;

    for (let i = 0; i < phrase.length; i++) {
        if (phrase.charAt(i) === letter) count++;
    }

    message.channel.send(`"${letter}" was found ${count} times`);
}

module.exports.help = {
    "name": "count",
    "description": "Counts the number of time a letter/string appears in a word/phrase",
    "use": "count <letter/string> <word/phrase>",
    "level": 1

}