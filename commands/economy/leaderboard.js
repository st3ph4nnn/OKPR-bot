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
			case 'r':
			case 'reset': {
				if (!message.member.permissions.has("ADMINISTRATOR"))
					return;

				await message.guild.members.fetch();

				// 905951431398408243 905951559186260069 905952134233731082

                let first = await message.guild.roles.cache.find(role => role.name === '1');
                let second = await message.guild.roles.cache.find(role => role.name === '2');
                let third = await message.guild.roles.cache.find(role => role.name === '3');

				let description = 'Acestea sunt rezultatele (Weekly XP)';

				let users = await Database.all();

				users.sort(function(a, b) {
					if (b.value.weeklyxp === undefined) b.value.weeklyxp = 0;
					if (a.value.weeklyxp === undefined) a.value.weeklyxp = 0;
					
    				return parseFloat(b.value.weeklyxp) - parseFloat(a.value.weeklyxp);
				});

				let top_users = users.slice(0, 10);

				let top1 = top_users[0].id;
				let top2 = top_users[1].id;
				let top3 = top_users[2].id;

				first.members.forEach((member, i) => {
					setTimeout(() => {
                        member.roles.remove(first);
                    }, i * 500);
				});

				let member;

				member = message.guild.members.cache.get(top1);
				member.roles.add(first);

				second.members.forEach((member, i) => {
					setTimeout(() => {
                        member.roles.remove(second);
                    }, i * 500);
				});

				member = message.guild.members.cache.get(top2);
				member.roles.add(second);

				third.members.forEach((member, i) => {
					setTimeout(() => {
                        member.roles.remove(third);
                    }, i * 500);
				});

				member = message.guild.members.cache.get(top3);
				member.roles.add(third);

				users.forEach((user) => {
					user.set('weeklyxp', 0);
				});

				for (let i = 0; i < top_users.length; i++) {
					if (users[i].value.username === undefined) {
						let member = message.guild.members.cache.get(users[i].id);
						users[i].value.username = member.user.username;
						user.set('username', member.user.username);
					}

					switch (i+1) {
						case 1: description += `🥇 **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				await message.delete({timeout: 1000});
				break;
			}
			case 'w':
			case 'weekly': {
				let description = 'Top 10 Utilizatori weekly XP.\n\n';

				let users = await Database.all();

				users.sort(function(a, b) {
    				return parseFloat(b.value.weeklyxp) - parseFloat(a.value.weeklyxp);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].value.username}** - \`${users[i].value.weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
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