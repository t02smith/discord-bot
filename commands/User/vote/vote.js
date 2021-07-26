const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const time = parseInt(args[0])
    args.splice(0,1);
    const options = args.join(" ").split('" "');

    //Gets and removes the question
    const question = options[0].slice(1);
    options.splice(0,1)

    //Removes " from the end of the last option
    options[options.length-1] = options[options.length-1].substring(0,options[options.length-1].length-1);

    const num = ["\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"];

    let pollOptions = [];
    options.forEach((option, index) => {
        pollOptions.push({
            name: num[index],
            value: option
        });
    });

    const poll = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(question)
                    .setAuthor(message.member.user.tag)
                    .setDescription("Pick an option from below:")
                    .setThumbnail("https://clipground.com/images/poll-clipart-6.jpg")
                    .addFields(
                        pollOptions
                    )

    //Emojis for numbers 1 to 10
    message.channel.send(poll)
        .then((message) => {
            //Puts the vote reactions onto the message
            options.forEach((option, index) => {
                message.react(num[index]);
            })

            //Waits for the vote to end
            setTimeout(() => {
                let resultList = [];
                options.forEach((option, index) => {
                    resultList.push({
                        name: `${num[index]}:\t${message.reactions.cache.get(num[index]).count-1}`,
                        value: option
                    });
                })

                const result = new Discord.MessageEmbed()
                                    .setColor("#0099ff")
                                    .setTitle(question)
                                    .setAuthor(message.member.user.tag)
                                    .setDescription("Results!")
                                    .setThumbnail("https://clipground.com/images/poll-clipart-6.jpg")
                                    .addFields(
                                        resultList
                                    )

                message.channel.send(result);

            }, time*1000)
        });
}

module.exports.help = {
    "name": "vote",
    "description": "Lets users vote between some given options.",
    "use": 'vote <time(s)> <Question> <Options>',
    "category": "USER",
    "level": 1
}