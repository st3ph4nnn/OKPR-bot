const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');

module.exports = {
	name: 'set',
	description: 'Setează o valoare (cuiva) din baza de date.',
	category: 'Economy',
	owner: true,
	cooldown: 5000,
	async execute(message, args, client) {
		let member = message.mentions.members.first();
		const set_embed = new embed(message, 'Set');

		if (!member) {
            set_embed.description(`Te rog specifică membrul caruia vrei să-i setezi ceva. \n\nFolosire: \`${client.prefix}set @membru {balance/xp} {valoare}\``);
            return set_embed.send();
		}

		if (!args[1]) {
            set_embed.description(`Te rog specifică ce vrei să setezi. \n\nFolosire: \`${client.prefix}set @membru {balance/xp} {valoare}\``);
            return set_embed.send();
        }

        if (isNaN(args[2]) || args[2] % 1 !== 0) {
            set_embed.description(`Valoarea specificată nu este validă. \n\nFolosire: \`${client.prefix}give @membru {bani}\``);
            return set_embed.send();
        }

		let db_user = new DatabaseUser(member.user.username, member.user.id);
		await db_user.set(args[1], parseInt(args[2]));

        set_embed.description(`Tocmai i-am setat valoarea de \`${args[1]}\` la \`${args[2]}\` lui \`${member.user.username}\`.`);
        return set_embed.send();
	}
}