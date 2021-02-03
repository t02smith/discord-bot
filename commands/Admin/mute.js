const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === "Muted");
    const target = message.mentions.members.first();

    if (target.roles.cache.some(role => role.name === "Muted")) {
        message.channel.send(`${target} is already muted.`);
    } else {
        target.roles.add(muteRole);
        if (args[1]) { //If the user passed through a time
            const time = parseInt(args[1]);
            message.channel.send(`${target} has been muted for ${time} minutes.`);

            setTimeout(() => {
                target.roles.remove(muteRole);
            }, time*60000);
        } else { 
            message.channel.send(`${target} has been muted.`);
        }
    }
    
}

module.exports.help = {
    "name": "mute",
    "description" : "Mutes a user until they are unmuted or after an alloted time.",
    "use": "mute <userTag> <time>",
    "position": 4
}

