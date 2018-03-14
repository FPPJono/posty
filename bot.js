const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";
var gameMessage = new Function('return true')

const slurChannel = '421807112029732884'
const deleteEditChannel = '421807112029732884'
const warnChannel = '421807112029732884'
const admin = '414198754632269834'

function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var eightBall = ["I would say..... yes!","Probably not","heck maybe, idk","I dont think so","eh, probably","hmmm.... maybe not","*concentrate*, and try again","look man im just a bot go ask someone who cares","those who ask will get their answer eventually, try again","haha! yes!","hah, nope"]

bot.on('ready', () => {
    console.log('I am ready!');
    bot.user.setPresence({ game: { name: 'I turned on !!', type: 0 } }); //playing game
    //bot.setTimeout(gameMessage(), 5000);
    bot.user.setPresence({ game: { name: "in some dirt", type: 0}});
    bot.user.setUsername("Kevin Bacon");
});

bot.on('message', message => {
    var sender = message.author;
    if(message.author.bot) return;
    var args = message.content.substring(PREFIX.length).split(" ");
    var announcement = bot.channels.find("name", "announcements");
    let rip = message.content.toLowerCase()
    if (message.content.startsWith(PREFIX + "ping")) {
        message.channel.send(`Pong! ${new Date().getTime() - message.createdTimestamp}ms`)
    }
    if (message.content.startsWith(PREFIX + "announce")) {
         if (message.member.roles.has(admin)) {
            let content = args.join(" ")
            var useContent = content.substr(9);
            announcement.send(useContent)
            console.log(`${sender.username} just announced ${useContent}.`)
        }else
            message.channel.send("sorry, that command is for admins only")
                .then(m => m.delete(5000));
    }
    if (message.content.startsWith(PREFIX + "playing")) {
        if (message.member.roles.has(admin)) {
            let content = args.join(" ")
            var useContent = content.substr(8);
            bot.user.setPresence({ game: { name: useContent, type: 0 } });
            console.log(`${sender.username} just changed the game to ${useContent}`)
        }else
            message.channel.send("sorry, that command is for admins only")
                .then(m => m.delete(5000));
    }
    if (message.content.startsWith(PREFIX + "welcome")) {
        if (message.member.roles.has(admin)) {
            var welcome = bot.channels.find("name", "welcome");
            welcome.send("Welcome to the Swag Pigs Server!\nBy clicking the ✅ button below, you agree to all the rules stated in <#269998962717491201>.\nOnce you have hit the checkmark, go ahead to <#269990219665637377> to say hi to everyone, and check out the other channel topics we have on the server! 🐷")
                .then(function (message) {
            message.react("✅")
                    });
        }else
            message.channel.send("sorry, that command is for admins only")
                .then(m => m.delete(5000));
    }
    if (rip.includes("<@416446498264580096>")) {
        message.channel.send("shut up");
    }
    if (rip.includes("bacon")) {
       message.react("🐷")
    }
    if (rip.includes("dab")) {
        message.react('380221447295205376')
    }
    if (rip.includes("spreadsheet")) {
        message.react('416071297920008192')
        message.channel.send("ha loser")
    }
    if (message.content.startsWith(PREFIX + "piglet")) {
        let role = message.guild.roles.find("name", "Piglet");
        let guild = message.guild;
        let member = guild.member(message.author);
        member.addRole(role).catch(console.error);
        member.send("h")
    }
    const swearWords = ["nigger", "chink", "tranny", "fag", "dyke", "nigga", "kike", "retard", "autist", "negroid", "dike"];
    var swearCheck = rip.replace(/\s/g, '')
    const byPass = ["halfaglass", "klondike"]
    if( swearWords.some(word => swearCheck.includes(word))) {
        if (byPass.some(word => swearCheck.includes(word))) return;
        let guild = message.guild;
        message.delete()
        message.channel.send("Please refrain from using slurs. A copy of your message has been sent to the Admins.")
            .then(m => m.delete(7500));
        const embed = {
            "description": `${message.author.username} detected using slurs:\nMessage sent in channel #${message.channel.name}\nMessage sent by ${message.author.username} is below\n"${message.content}"`,
            "color": 99999,
            "thumbnail": {
                "url": `${message.author.avatarURL}`
            },
            "author": {
                "name": "The Slur Finder Machine",
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
            }
            };
            guild.channels.get(slurChannel).send({ embed });
    }
    if(message.content.startsWith(PREFIX + "send")) {
        if (message.member.roles.has(admin)) {
            const sayMessage = args.join(" ");
            var useContent = sayMessage.substr(5);
            message.delete().catch(O_o=>{}); 
            message.channel.send(useContent);
        }else
            message.channel.send("sorry thats for admins only");
    }
    if (message.content.startsWith(PREFIX + "rate")){
        const thingToRate = args.join(" ");
        var ratedThing = thingToRate.substr(5);
        const embed = {
            "description": `I would rate ${ratedThing} ${getRandomInt(10)} out of 10!`,
            "url": "https://discordapp.com",
            "color": 122353,
            "footer": {
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png",
                "text": "Copyright Jono's Jontronics Ltd. 2097"
            }
            };
            message.channel.send({ embed });
                }
    if (message.content.startsWith(PREFIX + "clear")) {
        if (message.member.roles.has(admin)) {
            message.delete()
            let messagecount = parseInt(args[1]) || 1;
            if (messagecount > 100) return;
            if (messagecount < 2) return;
            message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)})
            message.channel.bulkDelete(messagecount)
            .then(() => {
                    const embed = {
                        "description": `:white_check_mark: Deleted ${messagecount} messages.`,
                        "color": 123732,
                        "author": {
                            "name": "The Magical Message Deleter",
                            "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
                        }
                    };
                    message.channel.send({ embed })
                        .then(m => m.delete(5000));
            })
        }else
            message.channel.send("sorry thats for admins only :/")
                .then(m => m.delete(5000));
    }
    if (message.content.startsWith(PREFIX + "8ball")) {
        if (args[1] != null){
            const embed = {
                "description": `${eightBall[Math.floor(Math.random() * eightBall.length).toString(16)]}`,
                "url": "https://discordapp.com",
                "color": 122353,
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png",
                    "text": "The Magic 8 Ball Machine"
                }
                };
                message.channel.send({ embed });
        }else message.channel.send("what's your question? lol\n```Correct usage: !8ball question```");
    }
    if (message.content.startsWith(PREFIX + "warn")) {
        if (message.member.roles.has(admin)) {
            let guild = message.guild;
            let warning = message.content.substr(28)
            guild.member(message.mentions.users.first()).send(`you have been warned for:${warning}`)
            const embed = {
                "description": `${message.mentions.users.first().username} has been warned for the reason below:\n${warning}`,
                "color": 99999,
                "thumbnail": {
                    "url": `${message.author.avatarURL}`
                },
                "author": {
                    "name": "The Warning Machine",
                    "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
                }
            };
            guild.channels.get(warnChannel).send({ embed });
        }
        }else
            message.channel.send("sorry that command is for admins only")
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✅") {
        if (user.bot) return;
        let guild = bot.guild;
        let member = guild.member(reaction.user);
        console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
        user.send("ha");
        member.addRole('416075320190566400');
    }
});

bot.on('messageUpdate', (omsg, nmsg) => {
  if(omsg.author.bot) return;
  console.log(`${omsg.author.username} just edited their message`);
  let guild = omsg.guild;
  const embed = {
    "description": `${omsg.author.username} just edited their message\nMessage sent in channel #${omsg.channel.name}\nOriginal message:\n"${omsg.content}"\nNew Message:\n"${nmsg.content}"`,
    "color": 99999,
    "thumbnail": {
        "url": `${omsg.author.avatarURL}`
    },
    "author": {
        "name": "The Magical Edit Searcher",
        "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
    }
    };
    guild.channels.get(deleteEditChannel).send({ embed });
});

bot.on('messageDelete', message => {
    let guild = message.guild;
    if(message.author.bot) return;
    if(message.content.startsWith('!clear')) return;
    if(message.content.startsWith('!send')) return;
    const swearWords = ["nigger", "chink", "tranny", "fag", "dyke", "nigga", "kike", "retard", "autist", "negroid", "dike"];
    let rip = message.content.toLowerCase()
    var swearCheck = rip.replace(/\s/g, '')
    if(swearWords.some(word => swearCheck.includes(word))) return;
    console.log(`${message.author} just deleted their message`)
    const embed = {
        "description": `${message.author.username} just deleted their message\nMessage sent in channel #${message.channel.name}\nOriginal message:\n"${message.content}"`,
        "color": 99999,
        "thumbnail": {
            "url": `${message.author.avatarURL}`
        },
        "author": {
            "name": "The Delete Scanner",
            "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
        }
        };
    guild.channels.get(deleteEditChannel).send({ embed });
});

// Sneaky Sneaky Token. Dont Share Kiddos
bot.login(process.env.BOT_TOKEN);
