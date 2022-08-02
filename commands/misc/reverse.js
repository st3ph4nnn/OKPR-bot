const { embed } = require('../../embed.js');
const google = require('googlethis');

module.exports = {
	name: 'reverse',
	aliases: [ 'rs' ],
	description: 'Reverse search folosind Google Images.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		const reverse_embed = new embed(message, "Reverse Image Google Search");

		if (!args[0]) {
			reverse_embed.description(`Te rog spune-mi **link-ul** pozei căruia vrei să îi dai reverse search. \n\nFolosire: \`${client.prefix}reverse {link}\``);
			return reverse_embed.send();
		}

		const response = await google.search(args[0], {
            page: 0,
            safe: true,
            ris: true
        });

        if (response.results.length == 0) {
            reverse_embed.description(`Nu am găsit nimic folosind \`${args[0]}\`.\nÎn unele cazuri, nu primesc informații de la Larry Page, așa că te incurajez să încerci din nou.`);
            return reverse_embed.send();
        }

        reverse_embed.url(response.results[0].url);
        reverse_embed.description(`**Titlu**\n\`${response.results[0].title}\`\n\n**Descriere** \n\`${response.results[0].description}\``);
        return reverse_embed.send();
	}
}