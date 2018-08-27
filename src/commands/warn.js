const Discord = require('discord.js'),
    fs = require('fs');

exports.run = async (client, message, args) => {
    var guildSett = JSON.parse(fs.readFileSync('./guildSettings.json'));

    let user = message.guild.member(message.mentions.members.first());
    if (!user) return message.channel.send('*Please specify a valid user.*');
  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you do not have permission to use this command.");
    //if (user.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you do not have permission to warn this user.");

    let reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send('*Please have a reason.*');

    let warns = guildSett[message.guild.id].Warns;
    if (!warns[user.id]) warns[user.id] = 0;

    warns[user.id]++;

    fs.writeFile('./guildSettings.json', JSON.stringify(guildSett, null, 2), (err) => {
        if (err) console.log(error);
    })

    let embed = new Discord.RichEmbed()
        .setTitle('Incoming Report!')
        .setColor(0xEEEE00)
        .addField('Warned User', `${user}`, true)
        .addField('Warned By', `${message.author}`, true)
        .addField('Warned In', message.channel, true)
        .addField('Number of Warnings', guildSett[message.guild.id].Warns[user.id])
        .addField('Reason', reason)
        .setTimestamp();

    let loggingChannel = guildSett[message.guild.id].GuildSettings.LoggingChannel;
    let lChannel = client.channels.get(loggingChannel);
    if (!lChannel) return message.channel.send('Cannot send to logging channel, channel does not exist or has not been set.')

    lChannel.send(embed);
    return;
}