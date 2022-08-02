const { embed } = require('../../embed.js');

module.exports = {
    name: "clear",
    aliases: [ 'purge' ],
    category: "Moderation",
    cooldown: 1,
    permissions: [ "DELETE_MESSAGES" ],
    role: [ '843950648437112843' ],
    description: "Șterge ultimele X mesaje din canal.",
    async execute(message, args, client) {
        const off_embed = new embed(message, 'Clear');

        let len = args.length > 0 ? parseInt(args[0]) : 10;

        if (len > 50) len = 50;
        if (len <= 0) len = 1;

        const channel = message.channel;
        await message.channel.bulkDelete(len).then(() => {
            channel.send(`Am șters ultimele \`${len}\` mesaje.`).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 2000);
            });
        });
    }
}