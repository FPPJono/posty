const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";
var gameMessage = new Function('return true')

//google sheets stuff
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
 
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('_vjNCPU8lsbbEFfGBWPIE9AovE_Df1eX4xORNxLK5g');
 
// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {
  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    console.log(rows);
  });
});

//Bot Code

//channels
const slurChannel = '421794351224455169'
const deleteEditChannel = '421839991929569281'
const warnChannel = '421794304059768852'
const suggestChannel = '423547474704072715'
const memesChannel = '421790539021811722'
const artChannel = '421790550778183701'
const announcements = '421770846915264526'
const welcome = '421790758933233664'
const banter = '421778879133384705'

//roles
const admin = '421779825699848212'

function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//lists
var eightBall = ["I would say..... yes!","Probably not","heck maybe, idk","I dont think so","eh, probably","hmmm.... maybe not","*concentrate*, and try again","look man im just a bot go ask someone who cares","those who ask will get their answer eventually, try again","haha! yes!","hah, nope"]
var coinFlip = ["The coin landed on heads!", "The coin landed on tails"]

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

bot.on('ready', () => {
    console.log('I am ready!');
    bot.user.setPresence({ game: { name: 'I turned on !!', type: 0 } }); //playing game
    wait(5000)
    bot.user.setPresence({ game: { name: 'in some dirt', type: 0 } });
    bot.user.setUsername("Kevin Bacon");
    bot.channels.get(welcome).send("test")
    bot.channels.get(welcome).bulkDelete(2)
    bot.channels.get(welcome).send("Welcome to the Swag Pigs Server!\nBy clicking the ✅ button below, you agree to all the rules stated in <#421791585861238784>.\nOnce you have hit the checkmark, go ahead to <#421778879133384705> to say hi to everyone, and check out the other channel topics we have on the server! 🐷")
        .then(function (message) {
    message.react("✅")
            });
});

bot.on('message', message => {
    var sender = message.author;
    if(message.author.bot) return;
    var args = message.content.substring(PREFIX.length).split(" ");
    var announcement = bot.channels.get(announcements);
    let rip = message.content.toLowerCase()
    if (message.content.startsWith(PREFIX + "ping")) {
        message.channel.send(`Pong! ${new Date().getTime() - message.createdTimestamp}ms`)
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
    if (message.channel.id === artChannel) {
        let a = message.attachments.array().length;
        if (a >= 1) {
            message.react('👌')
        }
    }
    if (message.channel.id === memesChannel) {
        let a = message.attachments.array().length;
        if (a >= 1) {
            message.react('👌')
            message.react('👎')
        }
        if (rip.includes('http')) {
            message.react('👌')
            message.react('👎')
        }
    }
    const swearWords = ["nigger", "chink", "tranny", "fag", "dyke", "nigga", "kike", "retard", "autist", "negroid", "dike"];
    var swearCheck = rip.replace(/\s/g, '')
    var swearCheck = rip.replace(/​/g, '')
    const byPass = ["halfaglass", "klondike", "warfage"]
    if( swearWords.some(word => swearCheck.includes(word))) {
        if (byPass.some(word => swearCheck.includes(word))) return;
        let guild = message.guild;
        let color  = message.guild.member(message.author).displayColor
        message.delete()
        message.channel.send("Please refrain from using slurs. A copy of your message has been sent to the Admins.")
            .then(m => m.delete(7500));
        const embed = {
            "description": `${message.author.username} detected using slurs:\nMessage sent in channel #${message.channel.name}\nMessage sent by ${message.author.username} is below\n"${message.content}"`,
            "color": color,
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
            var attachments = (message.attachments).array()
            message.delete().catch(O_o=>{}); 
            if (message.attachments.array().length >= 1){ message.channel.send(`${useContent}`)
                attachments.forEach(function(attachment){message.channel.send({file:`${attachment.url}`})})}
            if (message.attachments.array().length <= 0){ message.channel.send(`${useContent}`)}
        }else
            message.channel.send("sorry thats for admins only");
    }
    if (message.content.startsWith(PREFIX + "rate")){
        const thingToRate = args.join(" ");
        var ratedThing = thingToRate.substr(5);
        const embed = {
            "description": `I would rate ${ratedThing} ${getRandomInt(10)} out of 10!`,
            "url": "https://discordapp.com",
            "color": 65535,
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
    if (message.content.startsWith(PREFIX + "coinflip")) {
        const embed = {
            "description": `${coinFlip[Math.floor(Math.random() * coinFlip.length).toString(16)]}`,
            "url": "https://discordapp.com",
            "color": 16776448,
            "footer": {
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png",
                "text": "The Coin Flipper 3,000"
            }
        };
        message.channel.send({ embed });
    }
    if (message.content.startsWith(PREFIX + "warn")) {
        if (message.member.roles.has(admin)) {
            let guild = message.guild;
            let warning = message.content.substr(28)
            let color  = message.guild.member(message.mentions.users.first()).displayColor
            guild.member(message.mentions.users.first()).send(`you have been warned for: \`${warning}\` Please improve your behaviour or you may be kicked or banned from this server in the future.`)
            const embed = {
                "description": `${message.mentions.users.first().username} has been warned for the reason below:\n${warning}`,
                "color": color,
                "thumbnail": {
                    "url": `${message.mentions.users.first().avatarURL}`
                },
                "author": {
                    "name": "The Warning Machine",
                    "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
                }
            };
            guild.channels.get(warnChannel).send({ embed });
        }else message.channel.send("sorry that command is for admins only");
    }
    if (message.content.startsWith(PREFIX + "dm")) {
        if (message.member.roles.has(admin)) {
            let guild = message.guild;
            let content = message.content.substr(26)
            guild.member(message.mentions.users.first()).send(content)
            var attachments = (message.attachments).array()
            if (message.attachments.array().length >= 1){ guild.member(message.mentions.users.first()).send(content)
                attachments.forEach(function(attachment){guild.member(message.mentions.users.first()).send({file:`${attachment.url}`})
            if (message.attachments.array().length <= 0){ guild.member(message.mentions.users.first()).send(content)}
        }else message.channel.send("sorry that command is for admins only");
    }
    if (message.content.startsWith(PREFIX + "suggest")) {
        let guild = message.guild;
        let suggestion = message.content.substr(8)
        let color  = message.guild.member(message.author).displayColor
        message.delete()
        message.channel.send(`\`\`\`Thank you for your suggestion!\`\`\``)
            .then(m => m.delete(5000));
        const embed = {
        "description": `${message.author.username} has suggested the change/modification below:\n${suggestion}`,
            "color": color,
            "thumbnail": {
                "url": `${message.author.avatarURL}`
            },
            "author": {
                "name": "The Suggestion Box",
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
            }
        };
        guild.channels.get(suggestChannel).send({ embed });
    }   
    if (message.content.startsWith(PREFIX + "avatar")) {
        if (message.mentions.users.array().toString().length >= 1) {
            var pfp = message.mentions.users.first().avatarURL
            message.channel.send({files:[{attachment: pfp, name: `avatar${pfp.slice(0, -10).substr(pfp.slice(0, -10).length - 4)}`}]})
        } else {
            var pfp = message.author.avatarURL
            message.channel.send({files:[{attachment: pfp, name: `avatar${pfp.slice(0, -10).substr(pfp.slice(0, -10).length - 4)}`}]})
        }
    }
    if (message.content.startsWith(PREFIX + "morse")) {
        var chars = {' ':'/','a':'.- ','b':'-... ','c':'-.-. ','d':'-.. ','e':'. ','f':'..-. ','g':'--. ','h':'.... ','i':'.. ','j':'.--- ','k':'-.- ','l':'.-.. ','m':'-- ','n':'-. ','o':'--- ','p':'.--. ','q':'--.- ','r':'.-. ','s':'... ','t':'- ','u':'..- ','v':'...- ','w':'.-- ','x':'-..- ','y':'-.-- ','z':'--.. ','1':'.---- ','2':'..--- ','3':'...-- ','4':'....- ','5':'..... ','6':'-.... ','7':'--... ','8':'---.. ','9':'----. ','0':'----- '};
        var s = rip.substr(7);
        s = s.replace(/[abcdefghijklmnopqrstuvwxyz1234567890 ]/g, m => chars[m]);
        message.channel.send(`${s}`)
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✅") {
        if (user.bot) return;
        let guild = reaction.message.guild;
        let member = guild.member(user);
        if (reaction.message.channel != bot.channels.get(welcome)) { 
            return;
        }
        bot.channels.get(banter).send(`Welcome ${reaction.users.array().toString().substr(reaction.users.array().toString().length - 21)} to the Swag Pigs server!`);
        console.log(`${reaction.users.array().toString().substr(reaction.users.array().toString().length - 21)} reacted with "${reaction.emoji.name}".`);
        member.addRole('421793270142861322');
    }
});

bot.on('messageUpdate', (omsg, nmsg) => {
    if (omsg.author.bot) return;
    if (omsg.content === nmsg.content) return;
    console.log(`${omsg.author.username} just edited their message`);
    let guild = omsg.guild;
    let color = guild.member(omsg.author).displayColor
    var attachments = (omsg.attachments).array()
    if (omsg.attachments.array().length >= 1) {
        var embed = {
            "title": `${omsg.author.username} just edited their message`,
            "description": `Message sent in channel #${omsg.channel.name}`,
            "color": color,
            "thumbnail": {
                "url": `${omsg.author.avatarURL}`
            },
            "image": {
                "url": `${attachments[0].url}`
            },
            "author": {
                "name": "The Magical Edit Searcher",
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
            },
            "fields": [
                {
                    "name": "Original message:",
                    "value": `${omsg.content.substr(0, 1024)}`
                },
                {
                    "name": "New Message:",
                    "value": `${nmsg.content.substr(0, 1024)}`
                },
                {
                    "name": "Attached Image",
                    "value": `Link: ${attachments[0].url}`
                }
            ]
        }
    }
    if (omsg.attachments.array().length <= 0) {
        var embed = {
            "title": `${omsg.author.username} just edited their message`,
            "description": `Message sent in channel #${omsg.channel.name}`,
            "color": color,
            "thumbnail": {
                "url": `${omsg.author.avatarURL}`
            },
            "author": {
                "name": "The Magical Edit Searcher",
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
            },
            "fields": [
                {
                    "name": "Original message:",
                    "value": `${omsg.content.substr(0, 1024)}`
                },
                {
                    "name": "New Message:",
                    "value": `${nmsg.content.substr(0, 1024)}`
                }
            ]
        }
    }
    guild.channels.get(deleteEditChannel).send({ embed });
});

bot.on('messageDelete', message => {
    let guild = message.guild;
    if(message.author.bot) return;
    if(message.content.startsWith('!clear')) return;
    if(message.content.startsWith('!send')) return;
    if(message.content.startsWith('!warn')) return;
    if(message.content.startsWith('!suggest')) return;
    const swearWords = ["nigger", "chink", "tranny", "fag", "dyke", "nigga", "kike", "retard", "autist", "negroid", "dike"];
    let rip = message.content.toLowerCase()
    var swearCheck = rip.replace(/\s/g, '')
    if(swearWords.some(word => swearCheck.includes(word))) return;
    console.log(`${message.author} just deleted their message`)
    let color  = message.guild.member(message.author).displayColor
    var attachments = (message.attachments).array()
    if (message.attachments.array().length >= 1) {
        var embed = {
            "title": `${message.author.username} just deleted their message`,
            "description": `Message sent in channel #${message.channel.name}`,
            "color": color,
            "thumbnail": {
                "url": `${message.author.avatarURL}`
            },
            "image": {
                "url": `${attachments[0].url}`
            },
            "author": {
                "name": "The Delete Scanner",
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
            },
            "fields": [
                {
                    "name": "Original message:",
                    "value": `${message.content.substr(0, 1024)}`
                },
                {
                    "name": "Attached Image",
                    "value": `Link: ${attachments[0].url}`
                }
            ]
        }
    }
    if (message.attachments.array().length <= 0) {
        var embed = {
            "title": `${message.author.username} just deleted their message`,
            "description": `Message sent in channel #${message.channel.name}`,
            "color": color,
            "thumbnail": {
                "url": `${message.author.avatarURL}`
            },
            "author": {
                "name": "The Delete Scanner",
                "icon_url": "https://cdn.discordapp.com/app-icons/416446498264580096/4f17fb88d33f4655d85154ee064f030d.png"
            },
            "fields": [
                {
                    "name": "Original message:",
                    "value": `${message.content.substr(0, 1024)}`
                }
            ]
        }
    }
    guild.channels.get(deleteEditChannel).send({ embed });
});

// Sneaky Sneaky Token. Dont Share Kiddos
bot.login(process.env.BOT_TOKEN);
