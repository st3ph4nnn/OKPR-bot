const { embed } = require('../../embed.js');

let skip = 0;
let voted_to_skip = [ ];
let needed = 0;

module.exports = {
	name: 'skip',
	aliases: [ 's' ],
	description: 'Treci peste piesa curentă.',
	category: 'Music',
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

		needed = Math.floor(message.member.voice.channel.members.size / 2);

		if (skip < needed && !voted_to_skip.includes(message.member.user.id)) {
			skip++;
			if (skip >= needed) {
				skip = 0;
				voted_to_skip = [ ];
				needed = 0;

				if (!queue.songs[1]) {
					queue.stop();
					play_embed.description('Aceasta era ultima piesă din queue.');
					return play_embed.send();
				}

				const song = queue.songs[1];
				queue.skip();
				play_embed.description(`Am sărit la următoarea piesă.\n\n**Piesă**\n\`${song.name}\`\n\n**Durată**\n\`${song.formattedDuration}\``);
				return play_embed.send();
			} else {
				voted_to_skip.push(message.member.user.id);
				return message.reply(`**Skip**: \`${skip}/${needed}\` de voturi pentru a da skip.`);
			}
		}
	}
}