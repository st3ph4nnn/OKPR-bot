const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');
const random = require('random');

module.exports = {
	name: 'jaf',
	aliases: [ 'steal', 'furt' ],
	description: 'Practic, galați cosplay.',
	category: 'Economy',
	cooldown: 180000,
	async execute(message, args, client) {
		const jaf_embed = new embed(message, 'Fură 💸💸💸');
		let member = message.mentions.members.first();

		if (!member) {
            jaf_embed.description(`De la cine furi boss? \n\nFolosire: \`${client.prefix}jaf @membru\``);
            return jaf_embed.send();
		}

		let user = new DatabaseUser(member.user.username, member.user.id);

		let member_balance = await user.get('balance');
		
		if (member_balance < 1) {
			jaf_embed.description(`N-ai ce să furi de la \`${member.user.username}\`, e sarac lipit <:troll_romania:996060026093441104>`);
            return jaf_embed.send();
		}

		let value = random.int(1, 100);
		while (value < member_balance) value--;

		if (Math.floor(Math.random() * 3 + 1) == 1) {
			user = new DatabaseUser(message.author.username, message.author.id);
			if ((await user.get('balance')) >= value) {
				await user.sub('balance', value);
				jaf_embed.description(`Ai încercat și tu să furi \`${value}\` de <:troll_romania:996060026093441104> da n-ai reușit <:epicfail:839766619206057994>\nAcum ai: \`${await user.get('balance')}\` de <:troll_romania:996060026093441104>`);
        		return jaf_embed.send();
			}
		}

		user = new DatabaseUser(message.author.username, message.author.id);

		await user.add('balance', value);

		jaf_embed.description(`Ai băgat și tu \`${value}\` de <:troll_romania:996060026093441104> în ghiozdan (cu siguranță nu erau de la cineva din portofel)\nAcum ai: \`${await user.get('balance')}\` de <:troll_romania:996060026093441104>`);
        return jaf_embed.send();
	}
}