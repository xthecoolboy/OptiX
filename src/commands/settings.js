const Discord = require('discord.js'),
    fs = require('fs');

exports.run = (client, message) => {
    let guildSett = JSON.parse(fs.readFileSync('./guildSettings.json', 'utf8'));

    let guildData = guildSett[message.guild.id].GuildSettings;
    
    const sEmbed = new Discord.RichEmbed()
        .setTitle(`${message.guild.name}'s Settings`)
        .setThumbnail(message.guild.iconURL)
        .addField('Admin Role', guildData.AdminRole, true)
        .addField('Mod Role', guildData.ModRole, true)
        .addField('Logging Channel', guildData.LoggingChannel, true)
        .addField('Prefix', guildData.Prefix, true)
        .addField('Autorole Role', guildData.AutoroleRole, true)
        .addField('Welcome Channel', guildData.WelcomeChannel, true)
        .addField('Mute Role', guildData.MuteRole, true);

    message.channel.send(sEmbed);
}