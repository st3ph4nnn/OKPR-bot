const { embed } = require('../../embed.js');
const moment = require('moment');

module.exports = {
	name: 'ping',
	description: 'Verifică ping-ul bot-ului.',
	category: 'Misc',
	cooldown: 1000,
	async execute(message, args, client) {

		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.round(totalSeconds % 60);

		const ping_embed = new embed(message, 'Ping Pong <:troll_romania:996060026093441104>', `API Latency: \`${Math.round(client.ws.ping)}ms\`\nUptime: \`${days}\` day(s), \`${hours}\` hour(s), \`${minutes}\` minute(s), \`${seconds}\` second(s)`);
		ping_embed.send();
	}
}