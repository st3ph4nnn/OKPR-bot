const { embed } = require('../../embed.js');

module.exports = {
	name: 'repeat',
	description: 'Repetă queue-ul, la nesfârșit.',
	category: 'Music',
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Repeat');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);

		if (!queue) {
			play_embed.description('Nu am ce să repet.');
			return play_embed.send();
		}

		if (!queue.songs[0]) {
			play_embed.description('Nu am ce să repet.');
			return play_embed.send();
		}

		if (queue.repeatMode == 2) {
			queue.setRepeatMode(2);
			play_embed.description('Am oprit repetarea queue-ului.');
			return play_embed.send();
		}

		queue.setRepeatMode(2);
		play_embed.description('Repet queue-ul.');
		return play_embed.send();
	}
}