const { embed } = require('../../embed.js');
const { Database, DatabaseUser } = require('../../database/database.js');

module.exports = {
	name: 'leaderboard',
	aliases: [ 'lb' ],
	description: 'Vezi leaderboard-ul.',
	category: 'Economy',
	cooldown: 5000,
	async execute(message, args, client) {
		const give_embed = new embed(message, 'Leaderboard');

		let users = await Database.all();

		switch (args[0]) {
			case 's':
			case 'star': {
				let description = 'Top 10 Utilizatori cu cele mai multe star react-uri primite.\n\n';

				users.sort(function(a, b) {
					if (a.value.starboard === undefined) a.value.starboard = 0;
					if (b.value.starboard === undefined) b.value.starboard = 0;

    				return parseFloat(b.value.starboard) - parseFloat(a.value.starboard);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].value.username}** - \`${users[i].value.starboard}\` ⭐\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].value.username}** - \`${users[i].value.starboard}\` ⭐\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].value.username}** - \`${users[i].value.starboard}\` ⭐\n`; break;
						default: description += `${i+1}. **${users[i].value.username}** - \`${users[i].value.starboard}\` ⭐\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
			case 'xp': {
				let description = 'Top 10 XP.\n\n';

				users.sort(function(a, b) {
    				return parseFloat(b.value.xp) - parseFloat(a.value.xp);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].value.username}** - \`${users[i].value.xp}\` XP (mesaje)\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].value.username}** - \`${users[i].value.xp}\` XP (mesaje)\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].value.username}** - \`${users[i].value.xp}\` XP (mesaje)\n`; break;
						default: description += `${i+1}. **${users[i].value.username}** - \`${users[i].value.xp}\` XP (mesaje)\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
			case 't':
			case 'troll': {
				let description = 'Top 10 Utilizatori cu cele mai multe :troll_romania: react-uri primite.\n\n';

				users.sort(function(a, b) {
					if (a.value.trollboard === undefined) a.value.trollboard = 0;
					if (b.value.trollboard === undefined) b.value.trollboard = 0;

    				return parseFloat(b.value.trollboard) - parseFloat(a.value.trollboard);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].value.username}** - \`${users[i].value.trollboard}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].value.username}** - \`${users[i].value.trollboard}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].value.username}** - \`${users[i].value.trollboard}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].value.username}** - \`${users[i].value.trollboard}\` <:troll_romania:996060026093441104>\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
			case 'n':
			case 'nerdboard':
			case 'nerd': {
				let description = 'Top 10 Utilizatori cu cele mai multe nerd react-uri primite.\n\n';

				users.sort(function(a, b) {
					if (a.value.nerdboard === undefined) a.value.nerdboard = 0;
					if (b.value.nerdboard === undefined) b.value.nerdboard = 0;

    				return parseFloat(b.value.nerdboard) - parseFloat(a.value.nerdboard);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].value.username}** - \`${users[i].value.nerdboard}\` 🤓\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].value.username}** - \`${users[i].value.nerdboard}\` 🤓\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].value.username}** - \`${users[i].value.nerdboard}\` 🤓\n`; break;
						default: description += `${i+1}. **${users[i].value.username}** - \`${users[i].value.nerdboard}\` 🤓\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
			default: {
				let description = 'Top 10 Utilizatori cu cei mai mulți bani (a nu se confunda cu troll board).\n\n';

				let users = await Database.all();

				users.sort(function(a, b) {
    				return parseFloat(b.value.balance) - parseFloat(a.value.balance);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].value.username}** - \`${users[i].value.balance}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].value.username}** - \`${users[i].value.balance}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].value.username}** - \`${users[i].value.balance}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].value.username}** - \`${users[i].value.balance}\` <:troll_romania:996060026093441104>\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
		}
	}
}