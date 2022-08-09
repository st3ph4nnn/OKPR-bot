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
		if (args[0] == 'list') {
			let users = await Database.all();
			fs.writeFileSync('database/list.txt', JSON.stringify(users, null, '\t'));
	
			await message.reply({files: ['database/list.txt']});
			return;
		}

		if (args[0] == 'upload') {
			await client.ftp.uploadFrom('database/userDB.sqlite', 'userDB.sqlite').catch((err) => {});
			await message.reply('gata boss!!');
		}
	}
}