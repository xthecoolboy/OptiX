exports.run = async(client, message, args, tools) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you do not have permission to use this command.");

    if (isNaN(args[0])) return message.channel.send("*Please supply a valid amount of messages to purge.*");

    if (args[0] > 100) return message.channel.send("*Please supply a number less than 100.*");

    message.channel.bulkDelete(args[0])
        .then(messages => {
            message.channel.send(`*Successfully deleted \`${messages.size}/${args[0]}\` messages.*`)
        });
}