const { Database } = require('../../database/database.js');
const fs = require('fs');
const { MessageAttachement } = require('discord.js')

module.exports = {
	name: 'database',
	owner: true,
	description: 'Arată data de baze.',
	category: 'Admin',
	cooldown: 1000,
	async execute(message, args, client) {
		let users = await Database.all();
		fs.writeFileSync('database/list.txt', JSON.stringify(users, null, '\t'));

		await message.reply({files: ['database/list.txt']});
	}
}