const Discord = require('discord.js');
const { get } = require('snekfetch');

exports.run = async (client, message) => {

    if (!message.channel.nsfw) return message.channel.send("Cannot send NSFW content in a SFW channel.");
    const { body } = await get("http://api.obutts.ru/butts/0/1/random");

    const embed = new Discord.RichEmbed()
        .setTitle('Click here if the image failed to load.')
        .setURL(`http://media.obutts.ru/${body[0].preview}`)
        .setColor(0x619232)
        .setImage(`http://media.obutts.ru/${body[0].preview}`)
        .setFooter(`Requested by: ${message.author.tag} | Powered by Obutts.Ru`)

    message.channel.send(embed);
}