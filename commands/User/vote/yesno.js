const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const time = parseInt(args[0]);
    args.splice(0,1);

    const question = args.join(" ");

    //Creates the initial poll
    const poll = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(question)
        .setAuthor(message.member.user.tag)
        .setDescription("Vote yes or no!")
        .setThumbnail("http://www.braindirector.com/wp-content/uploads/2015/01/yes-no-photo.jpg")
        .addFields(
            {name: "👍", value: "Yes"},
            {name: "👎", value: "No"}
        )
    
    //Sends the poll
    message.channel.send(poll)
        .then((message) => {
            message.react("👍");
            message.react("👎");

            //Waits for the given time
            setTimeout(() => {
                const yes = message.reactions.cache.get("👍").count - 1;
                const no = message.reactions.cache.get("👎").count -1;

                let output = "";
                if (yes > no) output = "YES!";
                else if (yes < no) output = "NO!";
                else output = "TIE!"

                const result = new Discord.MessageEmbed()
                                    .setColor("#0099ff")
                                    .setTitle(question)
                                    .setAuthor(message.member.user.tag)
                                    .setDescription(output)
                                    .setThumbnail("http://www.braindirector.com/wp-content/uploads/2015/01/yes-no-photo.jpg")
                                    .addFields(
                                        {name: "👍 Yes", value: yes},
                                        {name: "👎 No", value: no}
                                    )

                message.channel.send(result);
            }, time*1000)
        })
}

module.exports.help = {
    "name": "yesno",
    "description": "Creates a yes or no poll",
    "use": "yesno <time(s)> <Question>",
    "level": 1
}