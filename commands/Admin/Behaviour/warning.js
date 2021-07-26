const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const target = message.mentions.members.first();
    const warningRole = message.guild.roles.cache.find(warning => warning.name === "Warning");
    const mute = () => {
        //If no mute option is given assume no mute
        if (args.length < 2) return false;
        const muteOption = args[1].toLowerCase();

        if (muteOption && muteOption === "true") return true;
        else return false;
    }

    //If the user already has the warning role
    if (target.roles.cache.find(role => role === warningRole)) {
        message.guild.members.ban(target);
        message.channel.send(`${target} has been banned following a second warning.`);
    } else { 
        target.roles.add(warningRole);
        message.channel.send(`${target} has been given a warning. Another warning will result in a ban.`);
        if (mute()) {
            const muteRole = message.guild.roles.cache.find(mute => mute.name === "Muted");
            target.roles.add(muteRole);
            message.channel.send(`${target} has been muted.`);
        }
    }
}

module.exports.help = {
    "name": "warning",
    "description": "Gives a warning role to a user. Two warnings results in a ban.",
    "use": "warning <userTag> <mute(true/false)>",
    "category": "ADMIN",
    "level": 4
}