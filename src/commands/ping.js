const Discord = require("discord.js"); // Defining Discord

exports.run = async (client, message) => {
    const m = await message.channel.send("Ping?");

    let E = new Discord.RichEmbed()
        .setTitle("Pong!")
        .addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`)
        .addField("API Latency", `${Math.round(client.ping)}ms`);

    message.channel.send(E);
}