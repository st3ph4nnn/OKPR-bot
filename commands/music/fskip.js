const { embed } = require('../../embed.js');

module.exports = {
	name: 'fskip',
	description: 'Forțează trecerea peste piesa curentă.',
	category: 'Music',
	staff: true,
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Skip');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);

		if (!queue) {
			play_embed.description('Nu am peste ce să trec.');
			return play_embed.send();
		}

		if (!queue.songs[1]) {
			queue.stop();
			play_embed.description('Aceasta era ultima piesă din queue.');
			return play_embed.send();
		}

		const song = queue.songs[1];
		queue.skip();
		play_embed.description(`Am sărit la următoarea piesă.\n\n**Piesă**\n\`${song.name}\`\n\n**Durată**\n\`${song.formattedDuration}\``);
		return play_embed.send();
	}
}	