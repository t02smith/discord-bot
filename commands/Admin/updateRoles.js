const Discord = require("discord.js");
const roles = require("../../config/roles.json");

module.exports.run = async(client, message, args) => {
    for (const roleName in roles) {
        if (!message.guild.roles.find(role => role.name == roleName)) {
            message.guild.createRole({
                name: roleName,
                permissions: roles[roleName].permissions,
                color: roles[roleName].color,
                position: roles[roleName].position
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
    "position": 1
}