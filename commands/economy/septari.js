const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');
const random = require('random');

function shuffle() {
    const values = ['🍉', '🍇', '🍓', '🍌', '🍒', '🍊', '7️⃣'];
    var arr = [ [ random.int(0, 6), random.int(0, 6), random.int(0, 6) ], [ random.int(0, 6), random.int(0, 6), random.int(0, 6) ], [ random.int(0, 6), random.int(0, 6), random.int(0, 6) ] ];
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) arr[i][j] = values[arr[i][j]];
    return arr;
}

module.exports = {
	name: 'septari',
	aliases: [ 'slots' ],
	description: 'Practic, brăila cosplay.',
	category: 'Economy',
	cooldown: 1000,
	async execute(message, args, client) {
		const septari_embed = new embed(message, '🍉 Șeptari 🎰 🍒');

		let user = new DatabaseUser(message.author.username, message.author.id);

		if (!args[0]) {
            septari_embed.description(`Cât pariezi boss? \n\nFolosire: \`${client.prefix}septari {bani}\``);
            return septari_embed.send();
        }

        let bet = args[0];

        if (isNaN(bet) || bet % 1 !== 0) {
            septari_embed.description(`Ce monedă folosești? N-am înțeles cât vrei să pariezi. \n\nFolosire: \`${client.prefix}septari {bani}\``);
            return septari_embed.send();
        }
		
		if (bet < 50) {
			septari_embed.description(`Bă, știu că pula botswană costă mult, dar totuși, măcar 50 tre sa bagi...`);
            return septari_embed.send();
		}

		let balance = await user.get('balance');

		if (bet > balance) {
			septari_embed.description(`Ești sărac lipit, n-ai atâta.`);
            return septari_embed.send();
		} 

		const slots = shuffle();

		let description = '';

		slots.forEach((item) => {
            item.forEach((subitem) => {
                description += ` \`${subitem}\` `
            });
            description += '\n';
        });

        let multiplier = 0;

        slots[1].forEach((item) => {
        	switch (item) {
        		case '🍉': multiplier += 0.2; break;
        		case '🍇': multiplier += 0.3; break;
        		case '🍒': multiplier += 0.3; break;
        		case '🍓': multiplier += 0.5; break;
        		case '🍌': multiplier += 0.6; break;
        		case '🍊': multiplier += 0.7; break;
        		case '7️⃣': multiplier += 0.8; break;
        	}
        });

        multiplier = (Math.round(multiplier * 100) / 100);

        let original_bal = balance;
        
        balance -= bet;
        balance += (bet * multiplier);

        description += `\n\nĂsta-i factorul de multiplicare: \`${multiplier}\`\n\nAtât ai pariat: \`${bet}\`\nAsta era balanța ta acum 2 secunde: \`${original_bal}\`\nAsta-i balanța ta acum: \`${balance}\``;

        await user.set('balance', balance);

        septari_embed.description(description);
        await septari_embed.send();
	}
}