const { embed } = require('../../embed.js');

module.exports = {
	name: 'stop',
	description: 'Oprește queue-ul pentru totdeauna.',
	category: 'Music',
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Stop');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);

		if (!queue) {
			play_embed.description('Nu am ce să opresc.');
			return play_embed.send();
		}

		if (!queue.songs[0]) {
			play_embed.description('Nu am ce să opresc.');
			return play_embed.send();
		}

		queue.stop();
		play_embed.description('Am oprit muzica.');
		return play_embed.send();
	}
}