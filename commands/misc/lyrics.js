const { embed } = require('../../embed.js');
const google = require('googlethis');

module.exports = {
	name: 'lyrics',
	description: 'Caută versurile unei melodi anume.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		const lyrics_embed = new embed(message, "Song Lyrics");

		if (!args[0]) {
			lyrics_embed.description(`Te rog spune-mi numele melodiei căruia vrei să îi cauți versurile. \n\nFolosire: \`${client.prefix}lyrics {melodie}\``);
			return lyrics_embed.send();
		}

		const response = await google.search((args.join(" ") + " song lyrics"));

        if (response.results.length == 0) {
            lyrics_embed.description(`Nu am găsit niciun vers legat de melodia \`${args.join(' ')}\`.\nÎn unele cazuri, nu primesc informații de la Larry Page, așa că te incurajez să încerci din nou.`);
            return lyrics_embed.send();
        }

        lyrics_embed.url(response.results[0].url);
        lyrics_embed.description(`**${response.results[0].title}**\n\n\`${response.knowledge_panel.lyrics == undefined ? `Nu am găsit lyrics-urile oficiale. Dă click pe titlu pentru site-ul thirdparty pe care l-am găsit, totuși.` : response.knowledge_panel.lyrics }\``);
        return lyrics_embed.send();
	}
}