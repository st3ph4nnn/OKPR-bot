const textract = require('textract');

module.exports = {
	name: 'recognize',
	aliases: ['ocr'],
	description: 'Extrage mesaje dintr-o imagine (URL).',
	category: 'Misc',
	cooldown: 10000,
	async execute(message, args, client) {
		if (!args[0] || !args[0].startsWith('https:'))
			return message.reply('Am nevoie de un link.');

		if (args[0].endsWith('mp4'))
			return message.reply('Am nevoie de o imagine.');

		textract.fromUrl(args[0], (err, txt) => {
			if (err) return message.reply(`Nu am putut să iti convertim imaginea. Eroare: \`${txt}\``)
			return message.reply(`\`\`\`${txt}\`\`\``);
		})
	}
}