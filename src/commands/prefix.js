const Discord = require('discord.js'),
    fs = require('fs');

exports.run = (client, message, args) => {
    let guildSett = JSON.parse(fs.readFileSync('./guildSettings.json', 'utf8'));

    if (!message.member.hasPermission("ADMINISTRATOR") && message.member.id !== "76063689064583168") return message.channel.send("Sorry, you do not have permission to use this command.");
    if (!args[0]) return message.channel.send("*Please specify a new prefix.*");

    guildSett[message.guild.id].GuildSettings.Prefix = args[0];

    fs.writeFile('./guildSettings.json', JSON.stringify(guildSett, null, 2), (err) => {
        if (err) console.log(error);
    })

    let sEmbed = new Discord.RichEmbed()
        .setTitle('Prefix Changed')
        .addField('Set to', `\`${args[0]}\``);

    message.channel.send(sEmbed);
}