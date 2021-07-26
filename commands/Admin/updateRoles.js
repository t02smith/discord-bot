const Discord = require("discord.js");
const roles = require("../../config/roles.json");

module.exports.run = async(client, message, args) => {
    message.guild.roles.everyone.setPermissions(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]);

    for (const roleName in roles) {
        if (!message.guild.roles.cache.find(role => role.name == roleName)) {
            message.guild.roles.create({
                data: {
                    name: roleName,
                    permissions: roles[roleName].permissions,
                    color: roles[roleName].color,
                    position: roles[roleName].position
                }
            })
            .then(role => console.log(`-${role.name} created-`))
            .catch(console.log);
        } else {
            //Update role permissions
        }
    }
}

module.exports.help = {
    "name": "updateRoles",
    "description": "Updates the roles that can be assigned by the bot",
    "use": "updateRoles",
    "category": "ADMIN",
    "level": 5
}