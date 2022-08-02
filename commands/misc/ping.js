const { embed } = require('../../embed.js');

module.exports = {
	name: 'ping',
	description: 'Verifică ping-ul bot-ului.',
	category: 'Misc',
	cooldown: 1000,
	async execute(message, args, client) {
		const ping_embed = new embed(message, 'Ping Pong <:troll_romania:996060026093441104>', `API Latency: \`${Math.round(client.ws.ping)}ms\` `);
		ping_embed.send();
	}
}