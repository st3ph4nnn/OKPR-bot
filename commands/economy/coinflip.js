const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');
const random = require('random');

module.exports = {
	name: 'coinflip',
	aliases: [ 'cf', 'aruncabanu' ],
	description: 'Practic, dai cu banul.',
	category: 'Economy',
	cooldown: 1000,
	async execute(message, args, client) {
		const coinflip_embed = new embed(message, 'Arunca cu banu 🤑');
		if (!args[0] || !['cap', 'pajura'].includes(args[0].toLowerCase())) {
            coinflip_embed.description(`Cap sau pajură șefule? \n\nFolosire: \`${client.prefix}coinflip {cap/pajura} {bani}\``);
            return coinflip_embed.send();
		}

		args[0] = args[0].toLowerCase();

		if (!args[1]) {
            coinflip_embed.description(`Câți bani vrei sa arunci bossule? \n\nFolosire: \`${client.prefix}coinflip {bani}\``);
            return coinflip_embed.send();
        }

        if (isNaN(args[1]) || args[1] % 1 !== 0) {
            coinflip_embed.description(`Valoarea de bani specificată nu este validă. \n\nFolosire: \`${client.prefix}coinflip {bani}\``);
            return coinflip_embed.send();
        }

        let bet = parseInt(args[1]);

		let db_user = new DatabaseUser(client, message.author.username, message.author.id);
		let balance = await db_user.get('balance');
		
		if (bet < 50) {
            coinflip_embed.description(`Trebuie să pariezi măcar \`50\` de <:troll_romania:996060026093441104>`);
            return coinflip_embed.send();
		}

		if (bet > balance) {
            coinflip_embed.description(`Mă tem ca nu ai atâția bani. \n\nValorea de bani pe care o ai: \`${balance}\` de <:troll_romania:996060026093441104>\nTu ai încercat să pariezi: \`${args[1]}\` de <:troll_romania:996060026093441104>`);
            return coinflip_embed.send();
		}

		let val = random.int(0, 1);

		if (val == 0) {
			if (args[0] == 'cap') {
				coinflip_embed.description(`**Bravo boss, era cap.**\n\n**Te-ai ales cu**: +\`${args[1]}\` de <:troll_romania:996060026093441104>\n**Acum ai**: \`${balance + bet}\` de <:troll_romania:996060026093441104>`);
            	await db_user.add('balance', bet);
            	return coinflip_embed.send();
			} else {
				coinflip_embed.description(`**Aia e, nu era cap.**\n\n**Te-ai ales cu**: -\`${args[1]}\` de <:troll_romania:996060026093441104>\n**Acum ai**: \`${balance - bet}\` de <:troll_romania:996060026093441104>`);
            	await db_user.sub('balance', bet);
            	return coinflip_embed.send();
			}
		} else {
			if (args[0] == 'pajura') {
				coinflip_embed.description(`**Bravo boss, era pajură.**\n\n**Te-ai ales cu**: +\`${args[1]}\` de <:troll_romania:996060026093441104>\n**Acum ai**: \`${balance + bet}\` de <:troll_romania:996060026093441104>`);
            	await db_user.add('balance', bet);
            	return coinflip_embed.send();
			} else {
				coinflip_embed.description(`**Aia e, nu era pajură.**\n\n**Te-ai ales cu**: -\`${args[1]}\` de <:troll_romania:996060026093441104>\n**Acum ai**: \`${balance - bet}\` de <:troll_romania:996060026093441104>`);
            	await db_user.sub('balance', bet);
            	return coinflip_embed.send();
			}
		}
	}
}