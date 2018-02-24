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
    if (message.content.startsWith(PREFIX + "resetWelcome")) {
         if (message.member.roles.has("269993616456417280")) {
                var welcome = bot.channels.find("name", "welcome");
                welcome.bulkDelete(99)
                    let msg = await welcome.send("Welcome to the Swag Pigs Server!\nBy clicking the :white_check_mark: button below, you agree to all the rules stated in <#269998962717491201>.\nOnce you have hit the checkmark, go ahead to <#269990219665637377> to say hi to everyone, and check out the other channel topics we have on the server! :pig:")
                        .then(function (message) {
                        message.react("✅")
                    }).catch(function() {
                        //Something
                        });
                    await msg.react("✅");
        }else
            message.author.send("sorry, that command is for admins only")
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
