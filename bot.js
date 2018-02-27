const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";


bot.on('ready', () => {
    console.log('I am ready!');
    bot.user.setPresence({ game: { name: 'I turned on !!', type: 0 } }); //playing game
    scope.setTimeout(slowAlert, 5000);
    bot.user.setPresence({ game: { name: "in some dirt", type: 0}});
});

bot.on("message", async message => {
     if (message.content === '!ping') {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms.`);   	
  	}
});

bot.on('message', message => {
    var sender = message.author;
    var args = message.content.substring(PREFIX.length).split(" ");
    var announcement = bot.channels.find("name", "announcements");
    if (message.content.startsWith(PREFIX + "announce")) {
         if (message.member.roles.has("269993616456417280")) {
            let content = args.join(" ")
            var useContent = content.substr(9);
            announcement.send(useContent)
            console.log(`${sender.username} just announced ${useContent}.`)
        }else
            message.author.send("sorry, that command is for admins only")
    }
    if (message.content.startsWith(PREFIX + "playing")) {
         if (message.member.roles.has("269993616456417280")) {
            let content = args.join(" ")
            var useContent = content.substr(8);
            bot.user.setPresence({ game: { name: useContent, type: 0 } });
            console.log(`${sender.username} just changed the game to ${useContent}`)
        }else
            message.author.send("sorry, that command is for admins only")
    }
    if (message.content.startsWith(PREFIX + "welcome")) {
        var welcome = bot.channels.find("name", "welcome");
        welcome.bulkDelete(99)
        welcome.send("Welcome to the Swag Pigs Server!\nBy clicking the ✅ button below, you agree to all the rules stated in <#269998962717491201>.\nOnce you have hit the checkmark, go ahead to <#269990219665637377> to say hi to everyone, and check out the other channel topics we have on the server! 🐷")
            .then(function (message) {
        message.react("✅")
                });
    }
    if (message.content.includes("<@416446498264580096>")) {
        message.channel.send("shut up");
    }
    if (message.content.includes("Bacon")) {
       message.react("🐷")
    }
    if (message.content.includes("dab")) {
        message.react('380221447295205376')
    }
});



// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);


//bot.on('message', message => {
  //  var sender = message.author;
    
    //allows custom commands
    //var args = message.content.substring(PREFIX.length).split(" ");
    //var announcement = bot.channels.find("name", "announcements");
    

//bot.login(process.env.BOT_TOKEN);

    
    //member.addRole(member.guild.roles.find("name", "INSERTNAMEOFROLE"))
