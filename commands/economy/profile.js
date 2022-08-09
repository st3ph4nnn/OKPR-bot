const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');

module.exports = {
	name: 'profile',
	description: 'Vezi profilul tău.',
	category: 'Economy',
	cooldown: 5000,
	async execute(message, args, client) {
		let member = message.mentions.members.first() || message.member;
		const profile_embed = new embed(message, 'Profile');

		let db_user = new DatabaseUser(client, member.user.username, member.user.id);
		let balance = await db_user.get('balance');
		let xp = await db_user.get('xp');
		let level = await db_user.get('level');

        profile_embed.description(`Membru: \`${member.user.username}\`\nBalanță: \`${balance}\` <:troll_romania:996060026093441104>\nXP (mesaje): \`${xp}\`\nLevel: \`${level}\``);
        return profile_embed.send();
	}
}