const { Database } = require('../../database/database.js');
const fs = require('fs');
const { MessageAttachement } = require('discord.js')

module.exports = {
	name: 'list',
	owner: true,
	description: 'Arată data de baze.',
	category: 'Admin',
	cooldown: 1000,
	async execute(message, args, client) {
		let users = await Database.all();
		fs.writeFileSync('temp/list.txt', JSON.stringify(users, null, '\t'));

		await message.reply({files: ['temp/list.txt']});
	}
}