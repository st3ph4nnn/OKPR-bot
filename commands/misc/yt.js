const youtube = require('youtube-search-without-api-key');

const { embed } = require('../../embed.js');
const google = require('googlethis');

module.exports = {
	name: 'youtube',
	aliases: [ 'yt' ],
	description: 'Caută ce vrea inima ta pe youtube.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		const search_embed = new embed(message, "Youtube Search");

		if (!args[0]) {
			search_embed.description(`Te rog spune-mi ce vrei să cauți. \n\nFolosire: \`${client.prefix}youtube {query}\``);
			return search_embed.send();
		}

		let video = await youtube.search(args.join(' '));

        if (!video || !video[0] || !video[0].url) {
            search_embed.description(`Nu am găsit nimic legat de \`${args.join(" ")}\`\nÎn unele cazuri, nu primesc informații de la Larry Page, așa că te incurajez să încerci din nou.`);
            return search_embed.send();         
        }

        if (video[0].snippet.thumbnails.url)
            search_embed.image(video[0].snippet.thumbnails.url);


        let max = video.length;

        search_embed.description(`**Titlu**\n\`${video[0].title}\`\n\n**Descriere** \n\`${video[0].description == '' ? 'Nu are descriere.' : video[0].description}\`\n\n**Durată** \n\`${video[0].duration_raw}\`\n\nRezultat \`1\`/\`${max}\``);
        search_embed.url(video[0].url);

        const msg = await search_embed.send();

        if (max >= 2) {
            msg.react('⬅️');
            msg.react('➡️');

            let index = 1;

            let author_id = message.author.id;

            const filter = (reaction, user) => {
               return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️');
            }

            const collector = msg.createReactionCollector({ filter, time: 300000 });

            collector.on('collect', (reaction, user) => {
                if (message && author_id === user.id) {
                    switch (reaction.emoji.name) {
                        case '⬅️': {
                            if (index != 0)
                                index--;
                            break;
                        }
                        case '➡️': {
                           if (index + 1 <= max)
                                index++;
                            break;
                        }
                    }

                    try {
        				if (video[index-1].snippet.thumbnails.url) search_embed.image(video[index-1].snippet.thumbnails.url);
						search_embed.description(`**Titlu**\n\`${video[index-1].title}\`\n\n**Descriere** \n\`${video[index-1].description == '' ? 'Nu are descriere.' : video[index-1].description}\`\n\n**Durată** \n\`${video[index-1].duration_raw}\`\n\nRezultat \`${index}\`/\`${max}\``);
                        search_embed.url(video[index-1].url);
                        msg.edit({embeds: [search_embed.embed]});
                    } catch {
                        // ...
                    }
                }

                if (!user.bot) reaction.users.remove(user.id);
            });

            collector.on('end', () => {
                msg.reactions.removeAll();
            });
        }
	}
}