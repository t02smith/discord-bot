const Discord = require("discord.js");

//Rolls a random number
module.exports.run = async(client, message, args) => {
    const upperbound = parseInt(args[0]);

    if (args.length === 0 || upperbound <= 1) {
        return message.reply("Please use an argument greater than or equal to 1.")
    } else {
        return message.reply(`I have rolled a **${Math.floor((Math.random()*upperbound)) + 1}!**`);
    }
}

module.exports.help = {
    "name": "roll",
    "description": "Randomly generate a number",
    "use": "roll <upperBound>",
    "level": 1
}