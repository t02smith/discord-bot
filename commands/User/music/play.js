const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async(client, message, args) => {
    const link = args[0];
    const voiceChannel = message.member.voice.channel;

    if (voiceChannel) {
        if (link) {
            voiceChannel.join().then(connection => {
                const stream = ytdl(link, {filter: "audioonly"});
                const dispatcher = connection.play(stream);
        
                dispatcher.on("finish", () => voiceChannel.leave());
            })
        } else {
            message.channel.send("Please enter a link.");
        }
    } else {
        message.channel.send("Please enter a voice channel.");
    }

}


module.exports.help = {
    "name": "play",
    "description": "Plays a youtube video's audio",
    "use": "play <youtubeLink>",
    "level": 1
}