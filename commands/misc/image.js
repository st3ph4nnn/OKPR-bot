const { embed } = require('../../embed.js');
const google = require('googlethis');

module.exports = {
	name: 'image',
	aliases: [ 'img', 'im' ],
	description: 'Caută o imagine pe google.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		const image_embed = new embed(message, "Google Image Search");

        let image = await google.image(args.join(' '), {
            safe: true,
        }).catch((err) => {
            // ...
        });

        if (!image || !image.length || !image[0].url || !image[0].origin.title) {
        	image_embed.description(`Nu am găsit nimic legat de \`${args.join(" ")}\`\nÎn unele cazuri, nu primesc informații de la Larry Page, așa că te incurajez să încerci din nou.`);
            return image_embed.send();
        }

        let max = image.length;

        let index = 1;

        image_embed.image(image[0].url || image[0].preview.url);
        image_embed.description(`**Titlu**\n\`${image[0].origin.title}\`\n\nRezultat \`${index}\`/\`${max}\``);
        image_embed.url(image[0].url);

        const msg = await image_embed.send();

        if (max >= 2) {
            msg.react('⬅️');
            msg.react('➡️');

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
                        image_embed.image((image[index-1].url.includes(' ') ? null : image[index-1].url) || null);
       					image_embed.description(`**Titlu**\n\`${image[index-1].origin.title}\`\n\nRezultat \`${index}\`/\`${max}\``);
                        image_embed.url(image[index-1].url);
                        msg.edit({embeds: [image_embed.embed]});
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