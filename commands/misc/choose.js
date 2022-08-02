const { embed } = require('../../embed.js');

module.exports = {
	name: 'choose',
	description: 'Alege dintr-o listă de răspunsuri.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		if (!args[0]) return message.reply(`Te rog frumos să îmi spui lista: \`${client.prefix}choose optiune1, optiune2, optiune3...\``);
		let options = [ ];

		let option = '';

		for (let i = 0; i < args.length; i++) {
			if (i == args.length-1) {
				option += args[i];
				options.push(option);
				option = '';
				break;
			}

			if (args[i].endsWith(',')) {
				args[i] = args[i].slice(0, -1);
				option += args[i];
				options.push(option);
				option = '';
				continue;
			}

			option += args[i] + ' ';
		}

		let val = options[Math.floor(Math.random() * options.length)];
		message.reply(`Am ales: \`${val}\``);
	}
}