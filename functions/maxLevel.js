const Discord = require("discord.js");

function maxLevel(message) {
    const roles = require("../config/roles.json");
    let max = 0;
    
    if (message.member.id === message.guild.ownerID) { //If the user is the owner their role doesn't matter
        max = 5;
    } else {
        for (const roleName in roles) { //Finds the highest ranking role
            if (message.member.roles.cache.find(r => r.name === roleName)) {
                if (roles[roleName].level > max) max = roles[roleName].level;
            }
        }
    }

    return max;
}

module.exports = { maxLevel };