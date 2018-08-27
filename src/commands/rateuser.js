const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    message.channel.send('Rating user...');
    var target = message.mentions.users.first() || message.author;

    var ratings = ['1', '2', '3', '4', '5', '6', '7', '8',  '9', '10', '11'];
    var rating = ratings[Math.floor(Math.random() * ratings.length)];
    
    await message.channel.send(`I give *${target.username}* a \`${rating}/10\`. Truly wonderful.`);
}