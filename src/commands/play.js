const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops, active) => {

  if (!message.member.voiceChannel) return message.channel.send('Please connect to a voicechannel.');
  if (!args[0]) return message.channel.send('Sorry, please input an URL following the command.');

  let validate = await ytdl.validateURL(args[0]);
  if (!validate) return message.channel.send('Sorry, please insert a ***valid** URL following the command.');

  let info = await ytdl.getInfo(args[0]);

  let data = ops.active.get(message.guild.id) || {};

  if (!data.connection) data.connection = await message.member.voiceChannel.join();
  if (!data.queue) data.queue = [];
  data.guildID = message.guild.id;


  data.queue.push({
    songTitle: info.songTitle,
    requester: message.author.tag,
    url: args[0],
    announceChannel: message.channel.id
  });

  if (!data.dispatcher) play(client, ops, data, active);
  else {
    message.channel.send(`Added to queue: ${info.title} | Requested by ${message.author.id}`)
  }

  ops.active.set(message.guild.id, data);
}


async function play(client, ops, data, active) {

  client.channels.get(data.queue[0].announceChannel).send(`Now playing: ${data.queue[0]} | Requested by: ${data.queue[0].requester}`);

  data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' } ));
  data.dispatcher.guildID = data.guildID;

  data.dispatcher.once('finish', function () {
    finish(client, ops, this);
  });
}

function finish(client, ops, dispatcher, active) {

  let fetched = ops.active.get(dispatcher.guildID);
  fetched.queue.shift();

  if (fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);
    play(client, ops, fetched);
  } else {
    ops.active.delete(dispatcher.guildID);
    let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
    if (vc) vc.leave();
  }
}