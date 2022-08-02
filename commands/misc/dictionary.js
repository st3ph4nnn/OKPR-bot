const { embed } = require('../../embed.js');
const google = require('googlethis');

module.exports = {
	name: 'dictionary',
	aliases: [ 'dict' ],
	description: 'Caută un cuvănt anume în dicționarul englezesc.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		const search_embed = new embed(message, "Dictionary Google Search");

		if (!args[0]) {
			search_embed.description(`Te rog spune-mi ce cuvânt vrei să cauți. \n\nFolosire: \`${client.prefix}dictionary {cuvant}\``);
			return search_embed.send();
		}

		let response = await google.search("define " + args.join(' '), {
            page: 0,
            safe: true
        });

        if (!response.dictionary) {
			response = await google.search("define " + args.join(' '), {
            	page: 0,
           		safe: true
        	});
        	if (!response.dictionary) {
	            search_embed.description(`Nu am găsit niciun cuvânt cu numele \`${args.join(" ")}\`\nÎn unele cazuri, nu primesc informații de la Larry Page, așa că te incurajez să încerci din nou.`);
   	         	return search_embed.send();
        	}
        }

        search_embed.url(response.results[0].url);
        search_embed.description(`**Cuvânt**\n\`${response.dictionary.word}\`\n\n**Fonetică** \n\`${response.dictionary.phonetic}\`\n\n**Definiție / Definiții** \n\`${response.dictionary.definitions.join('\n')}\`\n\n**Exemplu / Exemple** \n\`${response.dictionary.examples.join('\n')}\``);
        return search_embed.send();
	}
}