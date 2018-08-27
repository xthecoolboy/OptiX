const Discord = require('discord.js'),
    fs = require('fs');

exports.run = (client, message) => {
    let guildSett = JSON.parse(fs.readFileSync('./guildSettings.json', 'utf8'));
    let warns = guildSett[message.guild.id].Warns;

    let user = message.guild.member(message.mentions.members.first()) || message.author;
    if (!warns[user.id]) warns[user.id] = '0';

    message.channel.send(`User \`${user.tag}\` has \`${guildSett[message.guild.id].Warns[user.id]}\` warns.`);
}