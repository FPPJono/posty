const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";
var gameMessage = new Function('return true')

//google sheets stuff
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '17_vjNCPU8lsbbEFfGBWPIE9AovE_Df1eX4xORNxLK5g',
    range: 'Class Data!A2:E',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      console.log('Name, Major:');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log('%s, %s', row[0], row[4]);
      }
    }
  });
}

//Bot Code

const slurChannel = '421794351224455169'
const deleteEditChannel = '421839991929569281'
const warnChannel = '421794304059768852'
const suggestChannel = '423547474704072715'
const memesChannel = '421790539021811722'
const artChannel = '421790550778183701'
const welcome = '421790758933233664'
const admin = '421779825699848212'

function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var eightBall = ["I would say..... yes!","Probably not","heck maybe, idk","I dont think so","eh, probably","hmmm.... maybe not","*concentrate*, and try again","look man im just a bot go ask someone who cares","those who ask will get their answer eventually, try again","haha! yes!","hah, nope"]
var coinFlip = ["The coin landed on heads!", "The coin landed on tails"]

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
            let guild = message.guild;
            guild.channels.get(welcome).send("Welcome to the Swag Pigs Server!\nBy clicking the ✅ button below, you agree to all the rules stated in <#421791585861238784>.\nOnce you have hit the checkmark, go ahead to <#421778879133384705> to say hi to everyone, and check out the other channel topics we have on the server! 🐷")
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
    const byPass = ["halfaglass", "klondike"]
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
});

bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✅") {
        if (user.bot) return;
        let guild = reaction.message.guild;
        let member = guild.member(user);
        let welcome = bot.channels.find("name","welcome")
        if (reaction.message.channel != welcome) { 
            return;
        }
        bot.channels.find("name","banter").send(`Welcome ${reaction.users.array().toString().substr(reaction.users.array().toString().length - 21)} to the Swag Pigs server!`);
        console.log(`${reaction.users.array().toString().substr(reaction.users.array().toString().length - 21)} reacted with "${reaction.emoji.name}".`);
        member.addRole('421793270142861322');
    }
});

bot.on('messageUpdate', (omsg, nmsg) => {
  if(omsg.author.bot) return;
  console.log(`${omsg.author.username} just edited their message`);
  let guild = omsg.guild;
  let color  = guild.member(omsg.author).displayColor
  const embed = {
    "description": `${omsg.author.username} just edited their message\nMessage sent in channel #${omsg.channel.name}\nOriginal message:\n"${omsg.content}"\nNew Message:\n"${nmsg.content}"`,
    "color": color,
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
    if(message.content.startsWith('!warn')) return;
    if(message.content.startsWith('!suggest')) return;
    const swearWords = ["nigger", "chink", "tranny", "fag", "dyke", "nigga", "kike", "retard", "autist", "negroid", "dike"];
    let rip = message.content.toLowerCase()
    var swearCheck = rip.replace(/\s/g, '')
    if(swearWords.some(word => swearCheck.includes(word))) return;
    console.log(`${message.author} just deleted their message`)
    let color  = message.guild.member(message.author).displayColor
    const embed = {
        "description": `${message.author.username} just deleted their message\nMessage sent in channel #${message.channel.name}\nOriginal message:\n"${message.content}"`,
        "color": color,
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
