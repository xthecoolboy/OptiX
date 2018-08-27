const Discord = require('discord.js');
const { get } = require('snekfetch');

exports.run = async (client, message) => {

    if (!message.channel.nsfw) return message.channel.send("Cannot send NSFW content in a SFW channel.");
    const { body } = await get("https://nekos.life/api/v2/img/boobs");

    const embed = new Discord.RichEmbed()
        .setTitle('Click here if the image failed to load.')
        .setURL(body.url)
        .setColor(0x619232)
        .setImage(body.url)
        .setFooter(`Requested by: ${message.author.tag} | Powered by Nekos.Life API`)

    message.channel.send(embed);
}