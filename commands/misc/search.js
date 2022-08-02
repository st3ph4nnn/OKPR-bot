const { embed } = require('../../embed.js');
const google = require('googlethis');

module.exports = {
	name: 'search',
	aliases: [ 'google' ],
	description: 'Caută ce vrea inima ta pe google.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		const search_embed = new embed(message, "Google Search");

		if (!args[0]) {
			search_embed.description(`Te rog spune-mi ce vrei să cauți. \n\nFolosire: \`${client.prefix}search {query}\``);
			return search_embed.send();
		}

    	let response = await google.search(args.join(' '), {
            page: 0,
            safe: true
        }).catch(() => {
            search_embed.description(`Nu am găsit nimic legat de \`${args.join(" ")}\`\nÎn unele cazuri, nu primesc informații de la Larry Page, așa că te incurajez să încerci din nou.`);
            return search_embed.send();
        })
        
        if (!response.results[0]) {
            search_embed.description(`Nu am găsit nimic legat de \`${args.join(" ")}\`\nÎn unele cazuri, nu primesc informații de la Larry Page, așa că te incurajez să încerci din nou.`);
            return search_embed.send();
        }


        let image = await google.image(args.join(' '), {
            page: 0,
            safe: true,
        });

        if (image && !image[0].url.includes(' '))
            search_embed.image(image[0].url);

        let max;

        try {
            max = (response.results.length >= image.length ? image.length : response.results.length);
        } catch {
            max = response.results.length;
        }

        search_embed.description(`**Titlu**\n\`${response.results[0].title}\`\n\n**Descriere** \n\`${response.results[0].description}\`\n\nRezultat \`1\`/\`${max}\``);
        search_embed.url(response.results[0].url);

        const msg = await search_embed.send();

        if (max >= 2) {
            msg.react('⬅️');
            msg.react('➡️');

            let index = 1;

            let author_id = message.author.id;

            const filter = (reaction, user) => {
               return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️');
            }

            const collector = msg.createReactionCollector({ filter, time: 120000 });

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
                        if (image[index-1] && image[index-1].url && !image[index-1].url.includes(' '))
                            search_embed.image(image[index-1].url);

                        search_embed.description(`**Titlu**\n\`${response.results[index-1].title}\`\n\n**Descriere** \n\`${response.results[index-1].description}\`\n\nRezultat \`${index}\`/\`${max}\``);
                        search_embed.url(response.results[index-1].url);
                        msg.edit({embeds: [search_embed.embed]});
                    } catch {
                        // ...
                    }
                }

                if (!user.bot) reaction.users.remove(user.id);
            });

            collector.on('end', () => {
                msg.delete({timeout: 1000});
            });
        }
	}
}