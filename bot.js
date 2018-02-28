const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";
var gameMessage = new Function('return true')

const slurChannel = '416067707851505664'

bot.on('ready', () => {
    console.log('I am ready!');
    bot.user.setPresence({ game: { name: 'I turned on !!', type: 0 } }); //playing game
    //bot.setTimeout(gameMessage(), 5000);
    bot.user.setPresence({ game: { name: "in some dirt", type: 0}});
});

bot.on("message", async message => {
     const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
     if (message.content === '!ping') {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms.`);   	
  	}
    if(message.content.startsWith(PREFIX + "purge")) {
        // This command removes all messages from all users in the channel, up to 100.
        
        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);
    
        // Ooooh nice, combined conditions. <3
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    if(message.content.startsWith(PREFIX + "send")) {
        const sayMessage = args.join(" ");
        var useContent = sayMessage.substr(5);
        message.delete().catch(O_o=>{}); 
        message.channel.send(useContent);
    }
});

bot.on('message', message => {
    var sender = message.author;
    if(message.author.bot) return;
    var args = message.content.substring(PREFIX.length).split(" ");
    var announcement = bot.channels.find("name", "announcements");
    let rip = message.content.toLowerCase()
    if (message.content.startsWith(PREFIX + "test")) {
        member.addRole(role).catch(console.error);
    }
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
    if (rip.includes("spreadsheet")) {
        message.react('416071297920008192')
        message.channel.send("ha loser")
    }
    //if (message.content.startsWith(PREFIX + "piglet")) {
      //  let role = message.guild.roles.find("name", "Piglet");
        //let member = message.author;
        //member.addRole(role).catch(console.error);
    //}
    const swearWords = ["nigger", "chink", "tranny", "fag", "dyke", "nigga", "kike", "retard", "autist"];
    if( swearWords.some(word => rip.includes(word)) ) {
        let guild = message.guild;
        message.delete()
        message.channel.send("Please refrain from using slurs. A copy of your message has been sent to the Admins.")
        guild.channels.get(slurChannel).send("```" + message.author.username + " detected using slurs: \"" + message.content + "\"```")
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
