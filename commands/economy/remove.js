const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');

module.exports = {
	name: 'remove',
	description: 'Scoate cuiva niște banuți.',
	category: 'Economy',
	permissions: [ "ADMINISTRATOR" ],
	cooldown: 5000,
	async execute(message, args, client) {
		let member = message.mentions.members.first();
		const remove_embed = new embed(message, 'Remove');

		if (!member) {
            remove_embed.description(`Te rog specifică membrul caruia vrei să-i scoți bani. \n\nFolosire: \`${client.prefix}remove @membru {bani}\``);
            return remove_embed.send();
		}

		if (!args[1]) {
            remove_embed.description(`Te rog specifică cât vrei să-i scoți. \n\nFolosire: \`${client.prefix}remove @membru {bani}\``);
            return remove_embed.send();
        }

        if (isNaN(args[1]) || args[1] % 1 !== 0) {
            remove_embed.description(`Valoarea de bani specificată nu este validă. \n\nFolosire: \`${client.prefix}remove @membru {bani}\``);
            return remove_embed.send();
        }

        let db_user = new DatabaseUser(member.user.username, member.user.id);

		let value = await database.get('balance');

		if (value === undefined) {
        	remove_embed.description(`Ups! dintr-un motiv sau altul, nu i-am putut scoate bani lui \`${member.user.username}\` (probabil că nu există în data de baze?).`);
        	return remove_embed.send();
		}

		if (value < parseInt(args[1])) {
			remove_embed.description(`Membrul \`${member.user.username}\` Nu are atâția bani, așa că i-am setat banii la 0.`);
			await db_user.set('balance', 0);
        	return remove_embed.send();
		}

		await db_user.sub(parseInt(args[1]));

        remove_embed.description(`Tocmai i-am scos \`${args[1]}\` de <:troll_romania:996060026093441104> lui \`${member.user.username}\`.`);
        return remove_embed.send();
	}
}