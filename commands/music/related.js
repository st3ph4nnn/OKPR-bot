const { embed } = require('../../embed.js');

module.exports = {
	name: 'related',
	aliases: [ 'rel' ],
	description: 'Adaugă în listă o nouă piesă, relată queue-ului curent.',
	category: 'Music',
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Related');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);

		if (!queue) {
			play_embed.description('Queue-ul este gol.');
			return play_embed.send();
		}

		if (!queue.songs[0]) {
			play_embed.description('Nu este nicio piesă in queue.');
			return play_embed.send();
		}

		queue.addRelatedSong().then((song) => {
			play_embed.description(`Am adăugat o nouă piesă.\n\n**Piesă**\n\`${song.name}\`\n\n**Durată**\n\`${song.formattedDuration}\``);
			return play_embed.send();
		});
	}
}