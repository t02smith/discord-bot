const Discord = require("discord.js");

//Removes all messages from current text channel
module.exports.run = async(client, message, args) => {
    for (let i = 0; i < 100; i++) {
        message.channel.bulkDelete(100)
        .then(messages => {
            if (messages.size === 0) {
                return;
            }
        })
        .catch(console.error);
    }
    
}

module.exports.help = {
    "name": "nuke",
    "description": "Deletes all messages in a channel",
    "use": "nuke",
    "level": 1
}