const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');

module.exports = {
	name: 'balance',
	aliases: [ 'bal', 'bani', 'portofel' ],
	description: 'Vezi căți bani ai tu, sau alții.',
	category: 'Economy',
	cooldown: 1000,
	async execute(message, args, client) {
		let member = message.mentions.members.first() || message.member;
		const balance_embed = new embed(message, 'Balance');

		let db_user = new DatabaseUser(member.user.username, member.user.id);
		let balance = await db_user.get('balance');

        balance_embed.description(`Membru: \`${member.user.username}\`\nBalanță: \`${balance}\` <:troll_romania:996060026093441104>`);
        return balance_embed.send();
	}
}