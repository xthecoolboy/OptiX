const Discord = require('discord.js');

exports.run = (client, message) => {

    var phrases = [
        'Well, what do we have here?',
        'How did you find out about this!?',
        'You found out this secret command, congratz!',
        'Lemme guess, you want a cookie?',
        'Shoo!',
        '***NANI!?***',
        '***WHAT!?***',
        'oWo whats this? a secret command? ;)',
        'Don\'t let people know about me please!',
        '*Shh, only you have to know about this.*'
    ];

    var phrase = phrases[Math.floor(Math.random() * phrases.length)];

    message.channel.send(phrase);
}