const { embed } = require('../../embed.js');

module.exports = {
	name: 'pause',
	description: 'Oprește piesa curentă, momentan.',
	category: 'Music',
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Pause');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);

		if (!queue) {
			play_embed.description('Nu am ce să opresc.');
			return play_embed.send();
		}

		if (queue.paused) {
			queue.resume();
			play_embed.description('Se pare că piesa era deja oprita. Am dat resume piesei.');
			return play_embed.send();
		}

		queue.pause();
		play_embed.description('Am oprit piesa curentă, momentan.');
		return play_embed.send();
	}
}