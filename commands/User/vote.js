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

    //Creates the vote message
    let output = "```" + question + "\n";
    options.forEach((option, index) => {
        output += `${index+1}. ${option}\n`
    })

    output += "```";

    //Emojis for numbers 1 to 10
    const num = ["\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"];
    message.channel.send(output)
        .then((message) => {
            //Puts the vote reactions onto the message
            options.forEach((option, index) => {
                message.react(num[index]);
            })

            //Waits for the vote to end
            setTimeout(() => {
                //Creates the message to output the results
                let result = `Question: ${question}\nResults:\n`;

                options.forEach((option, index) => {
                    let reaction = message.reactions.cache.get(num[index]);
                    result += `${reaction.count-1} votes -> ${index+1}. ${option}\n`
                });

                message.channel.send("```" + result + "```"); 
            }, time*1000)
        });
}

module.exports.help = {
    "name": "vote",
    "description": "Lets users vote between some given options.",
    "use": 'vote <time> <Question> <Options>',
    "level": 1
}