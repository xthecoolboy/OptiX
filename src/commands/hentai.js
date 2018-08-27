const Discord = require('discord.js');
const { get } = require('snekfetch');

exports.run = async (client, message) => {

    if (!message.channel.nsfw) return message.channel.send("Cannot send NSFW content in a SFW channel.");
    const { body } = await get("https://nekobot.xyz/api/image?type=hentai");

    const embed = new Discord.RichEmbed()
        .setTitle('Click here if the image failed to load.')
        .setURL(body.message)
        .setColor(0x619232)
        .setImage(body.message)
        .setFooter(`Requested by: ${message.author.tag} | Powered by NekoBot API`)

    message.channel.send(embed);
}