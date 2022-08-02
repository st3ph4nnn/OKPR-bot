const command_handler = require('../../handlers/commandhandler.js');

module.exports = {
	name: 'refresh',
	owner: true,
	description: 'Refresh la lista de comenzi.',
	category: 'Admin',
	cooldown: 1000,
	async execute(message, args, client) {
		await command_handler(client);

		message.reply("Gata boss.").then((msg) => {
			setTimeout(() => { msg.delete(); message.delete() }, 2000);
		});
	}
}