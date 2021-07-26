
# Discord Bot

This is a simple discord bot to help you level up your server and streamline interactions
between server admins and users as well as improve the overall user experience of using
your server.

## Commands

All commands start with a prefix that can be changed inside config.json but by default
it's "!". \
By running "!help" the user is sent this message:

```txt
User Permission Level 5

**Commands**         **Use**                                **Description**
boom                 !boom                                   Prints a message back to the user
nuke                 !nuke                                   Deletes all messages in a channel
promote              !promote <userTag>                      Promotes a user to the manager role
updateRoles          !updateRoles                            Updates the roles that can be assigned by the bot
count                !count <letter/string> | <word/phrase>  Counts the number of time a string appears in a word/phrase
repeat               !repeat <n> <word>                      repeats a word a given number of times
roll                 !roll <upperBound>                      Pass through an upperbound greater than 1 and it will randomly select a value
help                 !help <specified commands>              Lists all available commands or any specified ones
id                   !id                                     Returns a user's id
suggest              !suggest <suggestion>                   Sends a suggestion to the admins
mute                 !mute <userTag> <time>                  Mutes a user until they are unmuted or after an alloted time.
unmute               !unmute <userTag>                       Unmutes a muted user
warning              !warning <userTag> <mute(true/false)>   Gives a warning role to a user. Two warnings results in a ban.
play                 !play <youtubeLink>                     Plays a youtube video's audio
vote                 !vote <time(s)> <Question> <Options>    Lets users vote between some given options.
yesno                !yesno <time(s)> <Question>             Creates a yes or no poll
```

### User levels

If you look at the help command you will notice the following

```txt
User Permission Level 5
```

This bot uses a levelling system to determine which users can use what commands based
upon what roles they have been given. However the bot will only recognise certain roles
that are stored inside the roles.json file and can be added to your server using the 
!updateRoles command. By default the server owner can run any command.

In terms of user roles: \
**0.** Unverified User \
**1.** Verified User \
**4.** Server Managers \
**5.** Server Admins

In general, server managers will only be allowed to use commands based around users 
whereas a Server Admin will access commands to alter the server. Note that levels **2** 
and **3** are left out; as more commands are added we may limit some commands to certain
users that are not managerial commands.

## How To Use

This bot was written in JavaScript as is run with Node.js. \
To create your own discord bot, I would recommend the following tutorial: \
[How-to Geek](https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/)

After creating your bot and adding it to your server:

- Clone the repository using "git clone https://github.com/t02smith/discord-bot.git"
- Add your bot token to the .env file
- Run "npm start" to start the bot
