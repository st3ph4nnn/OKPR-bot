const { MessageAttachement } = require('discord.js');

module.exports = {
	name: 'chad',
	description: 'Chadează pe cineva anume.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		try {
            const msg = await message.fetchReference();

            msg.react("<:gigachad:839780450322481162>");
            msg.reply('https://c.tenor.com/epNMHGvRyHcAAAAd/gigachad-chad.gif');

            await message.delete({timeout:1000});
        } catch(err) {
            const msg = await message.channel.messages.fetch({ limit: 2 });

            msg.last().react("<:gigachad:839780450322481162>");
            msg.last().reply('https://c.tenor.com/epNMHGvRyHcAAAAd/gigachad-chad.gif');

            await message.delete({timeout:1000});
        }
	}
}