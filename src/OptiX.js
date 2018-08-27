const Discord = require('discord.js'),
    fs = require('fs'),
    mysql = require('mysql'),
    client =  new Discord.Client();

    // ************************* //

var botConf = JSON.parse(fs.readFileSync('./botConfig.json'));

    // ************************* //

client.login(botConf.token);

    // ************************* //

const active = new Map();

    // ************************* //

client.on("disconnect", () => console.warn('Disconnected!'));
client.on("reconnecting", () => console.warn('Reconnecting...'));

    // ************************* //

let statuses = [`To View Commands: ^help`, `Invite me to Your Guild!`, `Join Our Support Server`]
let status = statuses[Math.floor(Math.random() * statuses.length)];

client.on("ready", () => {

    console.log(`[LOG] Logged in as ${client.user.tag}`);

    client.user.setPresence({ game: { name: `${client.guilds.size} Guilds | ${client.users.size} Members` }, status: 'online' });

    setInterval(function() {
        client.user.setPresence({ game: { name: status }, status: 'online' });
    }, 10000);

    client.guilds.forEach((guild, id) => {
        console.log(`[SERVER] [${guild.memberCount}] ${guild.name} (${guild.id}) | Joined at: ${guild.joinedAt.toString()}\n`)
    });
});

    // ************************* //

client.on("guildCreate", guild => {
    console.log(`[SERVER JOINED] [${guild.memberCount}] ${guild.name} (${guild.id}) | Joined at: ${guild.joinedAt.toString()}`);
});

client.on("guildDelete", guild => {
    console.log(`[SERVER LEFT] [${guild.memberCount}] ${guild.name} (${guild.id})`);
});

    // ************************* //

client.on('message', async message => {

    let prefix = "^";

    // Variables
    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Return Statements
    if (!msg.startsWith(prefix)) return;
    if (message.author.bot) return;

    // Command Handler
    try {
        let ops = {
            ownerID: botConf.clientOwner,
            active: active
        }

        let userCommandFile = require(`./commands/${cmd}.js`);
        userCommandFile.run(client, message, args, ops, active);
    } catch (e) {
        console.log(e.message);
    } finally {
        console.log(`[LOG] | [${message.guild.id}] ${message.author.tag} Ran the command '${cmd}'`);
    }

});
    // ************************* //
var express = require('express'),
    app = express();

app.get('/', function (req, res) {
    res.send(`Hello world! \n` +
             `${client.user.tag}`);
});

app.listen(3000);