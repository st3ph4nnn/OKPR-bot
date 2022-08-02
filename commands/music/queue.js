const { embed } = require('../../embed.js');

module.exports = {
	name: 'queue',
	aliases: [ 'q' ],
	description: 'Vezi ce conține queue-ul.',
	category: 'Music',
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Queue');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);		

		if (!queue || !queue.songs) {
			play_embed.description('Queue-ul este gol, din păcate.');
			return play_embed.send();
		}

		let description = '';

		for (let i = 0; i < queue.songs.length; i++)
			if (i == 0) description += `**PLAYING** ${i + 1}. \`${queue.songs[i].name}\` - \`${queue.songs[i].formattedDuration}\`\n`;
			else description += `${i + 1}. \`${queue.songs[i].name}\` - \`${queue.songs[i].formattedDuration}\`\n`;

		play_embed.description(description);
		play_embed.send();
	}
}