const Discord = require('discord.js'),
    fs = require('fs');

exports.run = (client, message) => {
    //var cCommands = JSON.parse(fs.readFileSync('./commands.json'));

    let helpE = new Discord.RichEmbed()
        .setTitle('All Commands')
        .addField('Guild Owner', '`AdminRole`, `AutoRole`, `LoggingChannel`, `ModRole`, `WelcomeChannel`')
        .addField('Administrator', '`Prefix`, `Pause`, `Resume`')
        .addField('Moderator', '`Warn`, `Purge`')
        .addField('Music', '`Play`, `Queue`, `Skip`')
        .addField('Sound Eeffects', '`Leeroy`')
        .addField('Util', '`Guilds`, `Help`, `Ping`, `Settings`, `Stats`, `Warns`')
        .addField('Fun', '`Slots`, `RateUser`')
        .addField('NSFW', '`Ass`, `Anal`, `Boobs`, `PornGif`')
        .addField('NSFW Hentai', '`HBj`, `HBoobs`, `Hentai`, `HGif`, `HLes`, `HPussy`, `Neko`, `NekoGif`')
        .addField('Game Stats', '`CSGO`, `Fortnite`, `Overwatch`')
        .setFooter(`${client.user.tag} Made with Love and JS code by papershredder432#0883`)

    message.channel.send(helpE);
}