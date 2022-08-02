const { embed } = require('../../embed.js');

module.exports = {
	name: 'resume',
	description: 'Repornește piesa curentă.',
	category: 'Music',
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Resume');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);

		if (!queue) {
			play_embed.description('Nu am ce să repornesc.');
			return play_embed.send();
		}

		if (!queue.paused) {
			play_embed.description('Piesa nu este oprită.');
			return play_embed.send();
		} 

		queue.resume();
		play_embed.description('Am repornit piesa curentă.');
		return play_embed.send();
	}
}