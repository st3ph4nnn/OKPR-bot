const { Database, DatabaseUser } = require('../../database/database.js');
const { embed } = require('../../embed.js');
const fs = require('fs');

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

			await message.reply({ files: ['database/list.txt'] });
			return;
		}

		if (args[0] == 'upload') {
			await client.upload('database/userDB.json');
			await message.reply('gata boss!!');
		}

		if (args[0] == 'set') {
			let member = message.mentions.members.first();
			const set_embed = new embed(message, 'Set');

			if (!member) {
				set_embed.description(`Te rog specifică membrul caruia vrei să-i setezi ceva. \n\nFolosire: \`${client.prefix}set @membru {balance/xp} {valoare}\``);
				return set_embed.send();
			}

			if (!args[2]) {
				set_embed.description(`Te rog specifică ce vrei să setezi. \n\nFolosire: \`${client.prefix}database set @membru {balance/xp} {valoare}\``);
				return set_embed.send();
			}

			if (isNaN(args[3]) || args[3] % 1 !== 0) {
				set_embed.description(`Valoarea specificată nu este validă. \n\nFolosire: \`${client.prefix}database set @membru {balance/xp} {valoare}\``);
				return set_embed.send();
			}

			let db_user = new DatabaseUser(member.user.username, member.user.id);
			await db_user.set(args[2], parseInt(args[3]));

			set_embed.description(`Tocmai i-am setat valoarea de \`${args[2]}\` la \`${args[3]}\` lui \`${member.user.username}\`.`);
			return set_embed.send();
		}

		if (args[0] == 'remove') {
			let member = message.mentions.members.first();
			const remove_embed = new embed(message, 'Remove');

			if (!member) {
				remove_embed.description(`Te rog specifică membrul pe care vrei sa-l stergi. \n\nFolosire: \`${client.prefix}database remove @membru\``);
				return remove_embed.send();
			}

			let user = new DatabaseUser(member.user.username, member.user.id);
			let username = await user.get('username');
			await Database.deleteOne({id: member.user.id});

			remove_embed.description(`Membrul \`${username}\` tocmai a fost șters.`);
			await remove_embed.send();
		}
	}
}