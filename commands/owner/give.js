const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');

module.exports = {
	name: 'give',
	description: 'Dă cuiva niște banuți.',
	category: 'Economy',
	owner: true,
	cooldown: 5000,
	async execute(message, args, client) {
		let member = message.mentions.members.first();
		const give_embed = new embed(message, 'Give');

		if (!member) {
            give_embed.description(`Te rog specifică membrul caruia vrei să-i dai bani. \n\nFolosire: \`${client.prefix}give @membru {bani}\``);
            return give_embed.send();
		}

		if (!args[1]) {
            give_embed.description(`Te rog specifică cât vrei să-i dai. \n\nFolosire: \`${client.prefix}give @membru {bani}\``);
            return give_embed.send();
        }

        if (isNaN(args[1]) || args[1] % 1 !== 0) {
            give_embed.description(`Valoarea de bani specificată nu este validă. \n\nFolosire: \`${client.prefix}give @membru {bani}\``);
            return give_embed.send();
        }

		let db_user = new DatabaseUser(client, member.user.username, member.user.id);
		await db_user.add('balance', parseInt(args[1]));

        give_embed.description(`Tocmai i-am dat \`${args[1]}\` de <:troll_romania:996060026093441104> lui \`${member.user.username}\`.`);
        return give_embed.send();
	}
}