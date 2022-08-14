const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');

module.exports = {
	name: 'zilnic',
    aliases: [ 'daily' ],
	description: 'Primește salariul zilnic.',
	category: 'Economy',
	cooldown: 86400,
	async execute(message, args, client) {
		const zilnic_embed = new embed(message, 'Daily');

		const user = new DatabaseUser(message.author.username, message.author.id);

		const val = Math.floor(Math.random() * 2000 + 1);

		await user.add('balance', val);
	
		zilnic_embed.description(`Tocmai ai primit salariul zilnic (furat), adica \`${val}\` de <:troll_romania:996060026093441104>.`);
		await zilnic_embed.send();
	}
}