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
				if (!message.member.permissions.has("ADMINISTRATOR") && !client.owners_id.includes(message.author.id))
					return;

				await message.guild.members.fetch();

                let first = await message.guild.roles.cache.find(role => role.id === '905951431398408243');
                let second = await message.guild.roles.cache.find(role => role.id === '905951559186260069');
                let third = await message.guild.roles.cache.find(role => role.id === '905952134233731082');

				let description = 'Acestea sunt rezultatele (Weekly XP)\n\n';

				users.sort(function(a, b) {
					if (b.weeklyxp === undefined) b.weeklyxp = 0;
					if (a.weeklyxp === undefined) a.weeklyxp = 0;
					
    				return parseFloat(b.weeklyxp) - parseFloat(a.weeklyxp);
				});

				let top10_users = users.slice(0, 10);

				let staff = (member) => {
					return (member.roles.cache.some(role => role.id === '843950648437112843') || member.roles.cache.some(role => role.id === '840233313582186496') || member.roles.cache.some(role => role.id === '839521297867603988'));
				}

				let top = (users) => {
					let i = 0;
					let top_user = [ ];

					for (; i < users.length; i++) {
						member = message.guild.members.cache.get(users[i].id);
						if (member !== undefined) {
							if (staff(member)) continue;
							else {
								top_user.push(member);
								i++;
								break;
							}
						}
					}

					for (; i < users.length; i++) {
						member = message.guild.members.cache.get(users[i].id);
						if (member !== undefined) {
							if (staff(member)) continue;
							else {
								top_user.push(member);
								i++;
								break;
							}
						}
					}

					for (; i < users.length; i++) {
						member = message.guild.members.cache.get(users[i].id);
						if (member !== undefined) {
							if (staff(member)) continue;
							else {
								top_user.push(member);
								i++;
								break;
							}
						}
					}

					return top_user;
				}

				let top3_users = top(users);

				first.members.forEach((member, i) => {
					setTimeout(() => {
                        member.roles.remove(first);
                    }, i * 500);
				});

				top3_users[0].roles.add(first);

				second.members.forEach((member, i) => {
					setTimeout(() => {
                        member.roles.remove(second);
                    }, i * 500);
				});

				top3_users[1].roles.add(second);

				third.members.forEach((member, i) => {
					setTimeout(() => {
                        member.roles.remove(third);
                    }, i * 500);
				});

				top3_users[2].roles.add(third);

				for (let i = 0; i < top10_users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
					}
				}

				for (const user of users) {
					let db_user = new DatabaseUser(user.username, user.id);
					await db_user.set('weeklyxp', 0);
				}

				description += `\n\nTop 1 weekly: **${top3_users[0]}**\nTop 2 weekly: **${top3_users[1]}**\nTop 3 weekly: **${top3_users[2]}**`;

				give_embed.description(description);
				await give_embed.send();
				break;
			}
			case 'w':
			case 'weekly': {
				let description = 'Top 10 Utilizatori weekly XP.\n\n';

				users.sort(function(a, b) {
    				return parseFloat(b.weeklyxp) - parseFloat(a.weeklyxp);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].username}** - \`${users[i].weeklyxp}\` <:troll_romania:996060026093441104>\n`; break;
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
					if (a.starboard === undefined) a.starboard = 0;
					if (b.starboard === undefined) b.starboard = 0;

    				return parseFloat(b.starboard) - parseFloat(a.starboard);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].username}** - \`${users[i].starboard}\` ⭐\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].username}** - \`${users[i].starboard}\` ⭐\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].username}** - \`${users[i].starboard}\` ⭐\n`; break;
						default: description += `${i+1}. **${users[i].username}** - \`${users[i].starboard}\` ⭐\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
			case 'xp': {
				let description = 'Top 10 XP.\n\n';

				users.sort(function(a, b) {
    				return parseFloat(b.xp) - parseFloat(a.xp);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].username}** - \`${users[i].xp}\` XP (mesaje)\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].username}** - \`${users[i].xp}\` XP (mesaje)\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].username}** - \`${users[i].xp}\` XP (mesaje)\n`; break;
						default: description += `${i+1}. **${users[i].username}** - \`${users[i].xp}\` XP (mesaje)\n`; break;
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
					if (a.trollboard === undefined) a.trollboard = 0;
					if (b.trollboard === undefined) b.trollboard = 0;

    				return parseFloat(b.trollboard) - parseFloat(a.trollboard);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].username}** - \`${users[i].trollboard}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].username}** - \`${users[i].trollboard}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].username}** - \`${users[i].trollboard}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].username}** - \`${users[i].trollboard}\` <:troll_romania:996060026093441104>\n`; break;
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
					if (a.nerdboard === undefined) a.nerdboard = 0;
					if (b.nerdboard === undefined) b.nerdboard = 0;

    				return parseFloat(b.nerdboard) - parseFloat(a.nerdboard);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].username}** - \`${users[i].nerdboard}\` 🤓\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].username}** - \`${users[i].nerdboard}\` 🤓\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].username}** - \`${users[i].nerdboard}\` 🤓\n`; break;
						default: description += `${i+1}. **${users[i].username}** - \`${users[i].nerdboard}\` 🤓\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
			default: {
				let description = 'Top 10 Utilizatori cu cei mai mulți bani (a nu se confunda cu troll board).\n\n';

				users.sort(function(a, b) {
    				return parseFloat(b.balance) - parseFloat(a.balance);
				});

				users = users.slice(0, 10);

				for (let i = 0; i < users.length; i++) {
					switch (i+1) {
						case 1: description += `🥇 ${i+1}. **${users[i].username}** - \`${users[i].balance}\` <:troll_romania:996060026093441104>\n`; break;
						case 2: description += `🥈 ${i+1}. **${users[i].username}** - \`${users[i].balance}\` <:troll_romania:996060026093441104>\n`; break;
						case 3: description += `🥉 ${i+1}. **${users[i].username}** - \`${users[i].balance}\` <:troll_romania:996060026093441104>\n`; break;
						default: description += `${i+1}. **${users[i].username}** - \`${users[i].balance}\` <:troll_romania:996060026093441104>\n`; break;
					}
				}

				give_embed.description(description);
				await give_embed.send();
				break;
			}
		}
	}
}