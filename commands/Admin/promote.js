const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const user = message.mentions.members.first();
    const role = message.guild.roles.cache.find(managerRole => managerRole.name === "Manager");

    user.roles.add(role);

    return message.channel.send(`${user} has been promoted to Manager!`);
}

module.exports.help = {
    "name": "promote",
    "description": "Promotes a user to the manager role",
    "use": "promote <userTag>",
    "category": "ADMIN",
    "level": 5
}