const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";


bot.on('ready', () => {
    console.log('I am ready!');
    bot.user.setPresence({ game: { name: 'you sleep', type: 0 } }); //playing game
});

bot.on('message', message => {
    var sender = message.author;
    var args = message.content.substring(PREFIX.length).split(" ");
    var announcement = bot.channels.find("name", "announcements");
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
    if (message.content.startsWith(PREFIX + "announce")) {
         if (message.member.roles.has("269993616456417280")) {
            let content = args.join(" ")
            var useContent = content.substr(9);
            announcement.send(useContent)
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
});

bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✅") {
        const guildMember = reaction.member;
        guildMember.sendMessage("wow nice")
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
