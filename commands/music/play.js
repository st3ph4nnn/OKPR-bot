const { embed } = require('../../embed.js');

module.exports = {
	name: 'play',
	aliases: [ 'p' ],
	description: 'Adaugă în listă o nouă piesă.',
	category: 'Music',
	cooldown: 5000,
	async execute(message, args, client) {
		const play_embed = new embed(message, 'Play');

		if (!message.member.voice.channel) {
			play_embed.description('Trebuie mai întâi să fii într-un voice channel.');
			return play_embed.send();
		}

		const queue = client.distube.getQueue(message);		

		if (queue && queue.paused && !args[0]) {
			queue.resume();
			play_embed.description('Am dat resume piesei.');
			return play_embed.send();
		}

		if (!args[0]) {
			play_embed.description('Te rog specifică piesa pe care vrei să o adaugi.');
			return play_embed.send();
		}

		if (args.join(' ').includes('youtube.com') && args.length > 1) {
			play_embed.description('Te rog să îmi dai **doar** link-ul.');
			return play_embed.send();
		}

		play_embed.description(`Acum caut șefule.\n**Query**\n\`${args.join(' ')}\` `);
		play_embed.send().then(() => {
			client.distube.play(message.member.voice.channel, args.join(' '), {
  	    		member: message.member,
   		   		textChannel: message.channel,
   		   		message
  		  	});
		})
	}
}