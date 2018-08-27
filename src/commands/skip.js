exports.run = async (client, message, ops) => {

    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send('There currently isn\'t any music playing in this guild.');
  
    if (message.author.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Sorry, you aren\'t connected to the same voicechannel.');
  
    let userCount = message.member.voiceChannel.members.size;
    let required = Math.ceil(userCount / 2);
  
    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
  
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry, you already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);
  
    fetched.queue[0].voteSkips.push(message.member.id);
  
    ops.active.set(message.guild.id, fetched);
  
    if (fetched.queue[0].voteSkips.length >= required) {
      message.channel.send('Successfully skipped song!');
      return fetched.dispatcher.emit('finish');
    }
    message.channel.send(`Successfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`)
}