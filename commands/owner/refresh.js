const command_handler = require('../../handlers/commandhandler.js');
const event_handler = require('../../handlers/eventhandler.js');

module.exports = {
	name: 'refresh',
	owner: true,
	description: 'Refresh la bot.',
	category: 'Admin',
	cooldown: 1000,
	async execute(message, args, client) {
		await command_handler(client);
		await event_handler(client);

		message.reply("Gata boss.").then((msg) => {
			setTimeout(() => { msg.delete(); message.delete() }, 2000);
		});
	}
}