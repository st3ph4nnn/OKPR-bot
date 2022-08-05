const { embed } = require('../../embed.js');
const moment = require('moment');

module.exports = {
	name: 'ping',
	description: 'Verifică ping-ul bot-ului.',
	category: 'Misc',
	cooldown: 1000,
	async execute(message, args, client) {
		const ping_embed = new embed(message, 'Ping Pong <:troll_romania:996060026093441104>', `API Latency: \`${Math.round(client.ws.ping)}ms\`\nUptime: ${moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");}`);
		ping_embed.send();
	}
}