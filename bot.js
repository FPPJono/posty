//bot requirements
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";
const fs = require('fs')
var gameMessage = new Function('return true')

var PImage = require('pureimage');
var img1 = PImage.make(500,500);
var tmp = require('tmp')

var scoreFont = PImage.registerFont('scorefont.ttf', 'Score Font')



//Bot Code

//channels
const memesChannel = '450243552681918465'
const hof = '450244347137359874'
const collections = '450243593026666507'
const artChannel = '450243533799161856'
const suggestChannel = '450568346824343555'

//roles
const admin = '450156424694071296'

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function basicEmbed(color, text) {
    var embed = { "description": `${text}`, "color": color };
    return embed
}

//lists
var eightBall = ["I would say..... yes!", "Probably not", "heck maybe, idk", "I dont think so", "eh, probably", "hmmm.... maybe not", "*concentrate*, and try again", "look man im just a bot go ask someone who cares", "those who ask will get their answer eventually, try again", "haha! yes!", "hah, nope"]
var coinFlip = ["The coin landed on heads!", "The coin landed on tails"]

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function decimalToHexString(number) {
    if (number < 0) { number = 0xFFFFFFFF + number + 1 }
    return number.toString(16).toUpperCase();
}

bot.on('ready', () => {
    console.log('I am ready!');
    bot.user.setPresence({ game: { name: 'I turned on !!', type: 0 } }); //playing game
    wait(5000)
    bot.user.setPresence({ game: { name: 'something heck idk', type: 0 } });
    bot.user.setUsername("Leon Dechino");
});

bot.on('message', message => {
    var sender = message.author;
    if (message.author.bot) return;
    const args = message.content.split(" ");
    let rip = message.content.toLowerCase()
    if (message.content.startsWith(PREFIX + "ping")) {
        message.channel.send(`Pong! ${new Date().getTime() - message.createdTimestamp}ms`)
    }
    if (message.content.startsWith('!score')) { 
        PImage.decodePNGFromStream(fs.createReadStream("scorecards/beerbongs.png")).then((img) => {
            console.log("size is",img.width,img.height);
            var img2 = PImage.make(500,500);
            var c = img2.getContext('2d');
            c.drawImage(img,
                0, 0, img.width, img.height, // source dimensions
                0, 0, 500, 500               // destination dimensions
            );
            PImage.encodeJPEGToStream(img2,fs.createWriteStream('scorecards/score.jpg')).then(() => {
                console.log("done writing");
                message.channel.send({files:[{attachment: 'scorecards/score.jpg', name:'score.jpg'}] })
            });
        });
        if (message.author.id === '246840305741987840') {
            message.channel.send('toot')
        }

    }
    if (message.content.startsWith(PREFIX + "playing")) {
        if (message.member.roles.has(admin)) {
            let content = args.join(" ")
            var useContent = content.substr(8);
            bot.user.setPresence({ game: { name: useContent, type: 0 } });
            console.log(`${sender.username} just changed the game to ${useContent}`)
        } else
            message.channel.send("sorry, that command is for staff only")
                .then(m => m.delete(5000));
    }
    if (message.content.startsWith(PREFIX + "watching")) {
        if (message.member.roles.has(admin)) {
            let content = args.join(" ")
            var useContent = content.substr(9);
            bot.user.setPresence({ game: { name: useContent, type: 3 } });
            console.log(`${sender.username} just made the bot watching ${useContent}`)
        } else
            message.channel.send("sorry, that command is for staff only")
                .then(m => m.delete(5000));
    }
    if (message.channel.id === collections) {
        let a = message.attachments.array().length;
        if (a >= 1) {
            message.react('👌')
        }
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
    if (message.channel.id === hof) {
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
    if (message.content.startsWith(PREFIX + "randomhex")) {
        let color = getRandomInt(16777215)
        var embed = basicEmbed(color, `#${decimalToHexString(color)}`)
        message.channel.send({ embed });
    }

    if (message.content.startsWith(PREFIX + "send")) {
        if (message.member.roles.has(admin)) {
            const sayMessage = args.join(" ");
            var useContent = sayMessage.substr(5);
            var attachments = (message.attachments).array()
            message.delete().catch(O_o => { })
            if (message.attachments.array().length >= 1) {
                message.channel.send(`${useContent}`)
                attachments.forEach(function (attachment) { message.channel.send({ file: `${attachment.url}` }) })
            }
            if (message.attachments.array().length <= 0) { message.channel.send(`${useContent}`) }
        } else
            message.channel.send("sorry thats for staff only");
    }
    if (message.content.startsWith(PREFIX + "rate")) {
        const thingToRate = args.join(" ");
        var ratedThing = thingToRate.substr(5);
        var embed = basicEmbed(65535, `I would rate ${ratedThing} ${getRandomInt(10)} out of 10!`)
        message.channel.send({ embed });
    }
    if (message.content.startsWith(PREFIX + "clear")) {
        if (message.member.roles.has(admin)) {
            message.delete()
            let messagecount = parseInt(args[1]) || 1;
            if (messagecount > 100) return;
            if (messagecount < 2) return;
            message.channel.fetchMessages({ limit: Math.min(messagecount + 1, 100) })
            message.channel.bulkDelete(messagecount)
                .then(() => {
                    var embed = basicEmbed(123732, `:white_check_mark: Deleted ${messagecount} messages.`)
                    message.channel.send({ embed })
                        .then(m => m.delete(5000));
                })
        } else
            message.channel.send("sorry thats for staff only :/")
                .then(m => m.delete(5000));
    }
    if (message.content.startsWith(PREFIX + "8ball")) {
        if (args[1] != null) {
            var embed = basicEmbed(122353, `${eightBall[Math.floor(Math.random() * eightBall.length).toString(16)]}`)
            message.channel.send({ embed });
        } else message.channel.send("where is the question? \n```Correct usage: !8ball question```");
    }
    if (message.content.startsWith(PREFIX + "coinflip")) {
        var embed = basicEmbed(16776448, `${coinFlip[Math.floor(Math.random() * coinFlip.length).toString(16)]}`)
        message.channel.send({ embed });
    }
    if (message.content.startsWith(PREFIX + "warn")) {
        if (message.member.roles.has(admin)) {
            let guild = message.guild;
            let warning = message.content.substr(28)
            guild.member(message.mentions.users.first()).send(`you have been warned for: \`${warning}\` Please improve your behaviour or you may be kicked or banned from this server in the future.`)
        } else message.channel.send("sorry that command is for staff only");
    }
    if (message.content.startsWith(PREFIX + "userinfo")) {
        let guild = message.guild;
        if (message.mentions.users.array().toString().length >= 1) {
            var person = message.mentions.users.first()
        } else {
            var person = message.author
        }
        let color = message.guild.member(person).displayColor
        const embed = {
            "color": color,
            "thumbnail": {
                "url": `${person.avatarURL}`
            },
            "author": {
                "name": `${person.username}`,
                "icon_url": `${person.avatarURL}`
            },
            "fields": [
                {
                    "name": "Display name",
                    "value": `${message.guild.member(person).displayName}`
                },
                {
                    "name": "User ID",
                    "value": `${person.id}`
                },
                {
                    "name": "Roles",
                    "value": `${message.guild.member(person).roles.array().toString().substr(0, 1024)}`
                },
                {
                    "name": "Top Role Color",
                    "value": `${message.guild.member(person).displayHexColor}`
                },
                {
                    "name": "Joined",
                    "value": `${message.guild.member(person).joinedAt.toUTCString()}`
                }
            ]
        };
        message.channel.send({ embed });
    }
    if (message.content.startsWith(PREFIX + "suggest")) {
        let guild = message.guild;
        let suggestion = message.content.substr(8)
        let color = message.guild.member(message.author).displayColor
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
                "icon_url": "https://github.com/FPPJono/posty/blob/master/post-malone-youtube-640x407.jpg?raw=true"
            }
        };
        guild.channels.get(suggestChannel).send({ embed });
    }
    if (message.content.startsWith(PREFIX + "avatar")) {
        if (message.mentions.users.array().toString().length >= 1) {
            var pfp = message.mentions.users.first().avatarURL
            message.channel.send({ files: [{ attachment: pfp, name: `avatar${pfp.slice(0, -10).substr(pfp.slice(0, -10).length - 4)}` }] })
        } else {
            var pfp = message.author.avatarURL
            message.channel.send({ files: [{ attachment: pfp, name: `avatar${pfp.slice(0, -10).substr(pfp.slice(0, -10).length - 4)}` }] })
        }
    }
    if (message.content.startsWith(PREFIX + "morse")) {
        var chars = { ' ': '/', 'a': '.- ', 'b': '-... ', 'c': '-.-. ', 'd': '-.. ', 'e': '. ', 'f': '..-. ', 'g': '--. ', 'h': '.... ', 'i': '.. ', 'j': '.--- ', 'k': '-.- ', 'l': '.-.. ', 'm': '-- ', 'n': '-. ', 'o': '--- ', 'p': '.--. ', 'q': '--.- ', 'r': '.-. ', 's': '... ', 't': '- ', 'u': '..- ', 'v': '...- ', 'w': '.-- ', 'x': '-..- ', 'y': '-.-- ', 'z': '--.. ', '1': '.---- ', '2': '..--- ', '3': '...-- ', '4': '....- ', '5': '..... ', '6': '-.... ', '7': '--... ', '8': '---.. ', '9': '----. ', '0': '----- ' };
        var s = rip.substr(7);
        s = s.replace(/[abcdefghijklmnopqrstuvwxyz1234567890 ]/g, m => chars[m]);
        message.channel.send(`${s}`)
    }
    if (message.content.startsWith(PREFIX + "emote")) {
        var chars = { ' ': '⬜', 'a': '🅰 ', 'b': '🅱 ', 'c': '🇨 ', 'd': '🇩 ', 'e': '🇪 ', 'f': '🇫 ', 'g': '🇬 ', 'h': '🇭 ', 'i': '🇮 ', 'j': '🇯 ', 'k': '🇰 ', 'l': '🇱 ', 'm': '🇲 ', 'n': '🇳 ', 'o': '🅾 ', 'p': '🇵 ', 'q': '🇶 ', 'r': '🇷 ', 's': '🇸 ', 't': '🇹 ', 'u': '🇺 ', 'v': '🇻 ', 'w': '🇼 ', 'x': '🇽 ', 'y': '🇾 ', 'z': '🇿 ' };
        var s = rip.substr(7);
        s = s.replace(/[abcdefghijklmnopqrstuvwxyz ]/g, m => chars[m]);
        message.channel.send(`${s}`)
    }

});

// Sneaky Sneaky Token. Dont Share Kiddos
bot.login(process.env.BOT_TOKEN);
