const { embed } = require('../../embed.js');
const translate = require('@vitalets/google-translate-api');

const language_names = new Intl.DisplayNames(['ro'], {
    type: 'language'
});
    
module.exports = {
    name: 'translate',
    aliases: ['tr'],
    description: 'Translatează dintr-o limbă in alta.',
    category: 'Misc',
    cooldown: 5000,
    async execute(message, args, client) {
        const tr_embed = new embed(message, 'Translate');

        let translation = 'ro';
        let to_translate = '';

        for (let i = 0; i < args.length; i++) {
            if (args[i].startsWith('-to')) {
                translation = args[i+1];
                i++;
                continue;
            }

            to_translate += args[i] + ' ';
        }

        to_translate = to_translate.slice(0, -1);

        try {
            const msg = await message.fetchReference();

            translate(msg.content, {
                to: translation
            }).then(res => {
            		if (!res)
            			return;

                let from = language_names.of(res.from.language.iso);
                from = from.charAt(0).toUpperCase() + from.slice(1);

                let to = language_names.of(translation);
                to = to.charAt(0).toUpperCase() + to.slice(1);

                tr_embed.title(`Translate: ${from} -> ${to}`);
                if (['nigger', 'nigga'].includes(res.text.toLowerCase())) {
                    tr_embed.description(`**${from}**: \`${msg.content}\` \n\n**${to}**: \`(se traduce intr-un cuvant urat care este rasist si jignitor asupra unei minoritate anume (bercenaru stie))\``);
                } else {
                    tr_embed.description(`**${from}**: \`${msg.content}\` \n\n**${to}**: \`${res.text}\``);
                }
                return tr_embed.send();
            }).catch((err) => {
                tr_embed.description(`Ups! Nu am reușit să translatam acest mesaj.\n\nEroare: \`${err}\``);
                console.error(err);
                return tr_embed.send();
            });
        } catch (err) {
            if (!args[0]) {
                tr_embed.description(`Te rog spune-mi ce vrei să translatezi. \n\nFolosire: \`${client.prefix}translate [OPTIONAL: '-to {en/ro...}' pentru a traduce in en/ro...] {mesaj}\``);
                return tr_embed.send();
            }

            translate(to_translate, {
                to: translation
            }).then(res => {
            		if (!res)
            			return;

                let from = language_names.of(res.from.language.iso);
                from = from.charAt(0).toUpperCase() + from.slice(1);

                let to = language_names.of(translation);
                to = to.charAt(0).toUpperCase() + to.slice(1);

                tr_embed.title(`Translate: ${from} -> ${to}`);
                if (['nigger', 'nigga'].includes(res.text.toLowerCase())) {
                    tr_embed.description(`**${from}**: \`${to_translate}\` \n\n**${to}**: \`(se traduce intr-un cuvant urat care este rasist si jignitor asupra unei minoritate anume (bercenaru stie))\``);
                } else {
                    tr_embed.description(`**${from}**: \`${to_translate}\` \n\n**${to}**: \`${res.text}\``);
                }
                return tr_embed.send();
            }).catch((err) => {
                tr_embed.description(`Ups! Nu am reușit să translatam acest mesaj.\n\nEroare: \`${err}\``);
                console.error(err);
                return tr_embed.send();
            });
        }
    }
}