const { EmbedBuilder, Collection } = require('discord.js');
const { DatabaseUser } = require('../database/database.js');

const random = require('random');
const fs = require('fs');

module.exports = {
	name: "messageCreate",
	once: false,
	async execute(message, client) {
		try {
			if (message.author.bot) {
				if (message.author.id == '302050872383242240' && message.embeds[0].description.includes("Check")) {
					message.channel.send('mulțam mult!!!');
        			setTimeout(() => {
            			message.channel.send(`<@&${"908092967074553926"}> vă rog bampuiți!!!`)
        			}, 7200000)
				}
				return;
			}

			if (client.debug && message.channelId != '997570224419254362')
				return;

			if (message.content == 'shutdown' && client.owners_id.includes(message.author.id)) {
				await client.upload('database/userDB.json');
				await message.reply('gata boss!!!');
				process.exit();
			}

			if (message.guildId == '839520481475952650') {
				if (client.nerd_users.includes(message.author.id)) {
					await message.react('🤓').catch((err) => {});
				}

				let db_user = new DatabaseUser(message.author.username, message.author.id);
				await db_user.check_user();
				let xp = (parseInt(await db_user.get('xp'))) + 1;

				if (xp.toString()[0] == '0' && xp.toString()[1] >= 0) xp = 1;

				await db_user.set('xp', xp);
				await db_user.add('weeklyxp', 1);

				let db_level = await db_user.get('level');

    			const requirments = [0, 600, 1200, 2000, 3000, 5000, 8000, 10000, 15000, 20000, 25000];
    			const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    			const roles = [839521627082850355, 839554062668398623, 839554062059700244, 839554061517717504, 839563197793959966, 839554060679381035, 839550840616517662, 839563659045896243, 839563775655804998, 839563846409650246, 839563964270772265];

    			if (message && message.author) {
    				for (let i = requirments.length - 1; i >= 0; i--) {
      	 				if (xp >= requirments[i]) {
      		      			if (db_level != levels[i] && levels[i] > db_level) {
       	   	  					let rank = await message.guild.roles.cache.find(role => role.id == roles[i]);

            					const level_embed = new EmbedBuilder()
                					.setColor('#97a832')
                					.setTitle(`Ce smecher esti. Tocmai ai ajuns la levelul \`${levels[i]}\`.\nAcum ai rank-ul \`${rank.name}\`.`)
                					.setDescription(`Utilizator: \`${message.author.username}\`\n XP: \`${xp}\``)
                					.setTimestamp();

            					message.reply({embeds: [level_embed]});

            					await db_user.set('level', levels[i]);
           					}
        				}
        			}
        		}
			}

			if (message.member.roles.cache.some(role => role.name === 'off')) {
				setTimeout(() => message.delete(), 250);
				return;
			}

			const has_bot_mention = (message.mentions.has(client.user) && message.type != 19);

			if (!message.content.startsWith(client.prefix) && !has_bot_mention) {
				if (message.channelId === '839520481475952654' && !client.markov_stop) {
					let val = random.int(0, 15);

					if (val == 0) {
						if (message.mentions.everyone)
							return;

						if (message.mentions !== undefined)
							return;

						if (message.content.includes('http'))
							return;

						await client.download("strings.txt", "database/strings.txt");

						let quotes = fs.readFileSync('database/strings.txt', 'utf8').toString().split(' ').map(element => {
							return element.toLowerCase();
						})

						while (quotes.length >= 100 || quotes.join(' ').length >= 2000) {
							quotes.splice(random.int(0, quotes.length), 10);
							fs.writeFileSync('database/strings.txt', quotes.join(' '), 'utf-8');
						}

						let words = message.content.split(' ');

						if (!words.length)
							return;

						let final_words = [ ];

						for (let i = 0; i < words.length; i++) {
							if (!quotes.includes(words[i].toLowerCase()) && words[i] != '@everyone' && words[i] != '@here' && !words[i].startsWith('<@&')) {
								final_words.push(words[i]);
							}
						}

						let final_string = final_words.join(' ');
						final_string = final_string.replace(/\r?\n|\r/g, " ");
						fs.appendFileSync('database/strings.txt', final_string + ' ');

						console.log("Added: " + final_string);

    					await client.upload('database/strings.txt');
					}

					if (val == 1) {
						try {
							await client.download("strings.txt", "database/strings.txt");
							let quotes = fs.readFileSync('database/strings.txt', 'utf8').toString().split(' ');
							if (!quotes.length) return;

							if (quotes.includes('@everyone') || quotes.includes('@here')) {
								fs.writeFileSync('database/strings.txt', '');
								await client.upload('database/strings.txt');
							   	return;
							}

							let s = fs.createReadStream('database/strings.txt');
				
							try {
								client.chain.seed(s, () => {
									let res = client.chain.respond(client.chain.pick(), random.int(1, 6));
									if (res === undefined || res.includes('@everyone') || res.includes('@here')) return;
									message.reply(res.join(' '));
								})
							} catch(err) {
								return;
							}
						} catch(err) {		
							console.log('[markov: error (messageCreate)] ' + err);
						}
					}
				}

				return;
			}
		
			let args = message.content.split(/ +/);

			if (has_bot_mention && args[0] === '<@995939755118297140>') {
				args = message.content.slice(21).trim().split(/ +/);

				if (args[0] === '')
					args[0] = 'help';
			} else {
				if (has_bot_mention || args[0] === '.')
					return;

				args = message.content.slice(client.prefix.length).trim().split(/ +/);
			}

			let command_name = args.shift().toLowerCase();
			const command = client.commands.get(command_name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));

			if (!command) {
				const cmd_embed = new EmbedBuilder()
         	   		.setColor('#cf1b1b')
            		.setTitle(`Comanda \`${command_name}\` nu există. Vezi \`${client.prefix}help\` `)
            		.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            		.setTimestamp();

           		const msg = await message.reply({embeds: [cmd_embed]});
          		setTimeout(() => msg.delete(), 2000);
            	return;
			}

			if (command.owner && !client.owners_id.includes(message.author.id))
				return;

			if (command.staff && !client.owners_id.includes(message.author.id) && (!message.member.roles.cache.some(role => role.id === '843950648437112843') && !message.member.roles.cache.some(role => role.id === '839521297867603988'))) {
				const perm_embed = new EmbedBuilder()
            		.setColor('#cf1b1b')
            		.setTitle(`[INFO] ${command_name}`)
            		.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            		.setDescription(`Această comandă este doar pentru membrii din staff.`)
            		.setTimestamp();

           		message.reply({embeds: [perm_embed]}).then((msg) => {
          			setTimeout(() => msg.delete(), 5000);
           		});
            	return;
			}

			if (!client.owners_id.includes(message.author.id)) {
				const cooldowns = client.cooldowns;

				if (!cooldowns.has(command.name))
					cooldowns.set(command.name, new Collection());

				const now = Date.now();
				const timestamps = cooldowns.get(command.name);
				const cooldown_amount = command.cooldown || 1000;

				if (timestamps.has(message.author.id)) {
					const exp_time = timestamps.get(message.author.id) + cooldown_amount;

					if (now < exp_time) {
						const left = (exp_time - now) / 1000;
						const time_embed = new EmbedBuilder()
         			   	.setColor('#cf1b1b')
           		 		.setTitle(`${command_name}`)
           		 		.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            			.setDescription(`Trebuie să mai aștepți \`${left}s\` până să poți folosi această comandă din nou.`)
            			.setTimestamp();

           				const msg = await message.reply({embeds: [time_embed]});
          				setTimeout(() => msg.delete(), 3000);
          				return;
					}
				}

				timestamps.set(message.author.id, now);
				setTimeout(() => { timestamps.delete(message.author.id); }, cooldown_amount)
			}

			try {
				message.channel.sendTyping();
				await command.execute(message, args, client);
			} catch (err) {
				console.error(`[ERROR] ${err}`);
				const error_embed = new EmbedBuilder()
            		.setColor('#cf1b1b')
            		.setTitle(`[ERROR] ${command_name}`)
            		.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            		.setDescription(`Ceva groaznic s-a intâmplat!!! Arata-i asta lui \`stephan#4353\`\n\n**${err}**\n\nComandă: \`${command_name}\``)
            		.setTimestamp();

           		message.reply({embeds: [error_embed]});
            	message.channel.send(`<@${client.owners_id[1]}>`);
            }
		} catch(err) {
			const error_embed = new EmbedBuilder()
            	.setColor('#cf1b1b')
            	.setTitle(`[ERROR] `)
            	.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            	.setDescription(`Ceva groaznic s-a intâmplat!!! Arata-i asta lui \`stephan#4353\`\n\n**${err}**\n\nEvent: \`messageCreate\``)
            	.setTimestamp();

			message.channel.send(`<@${client.owners_id[1]}>`);
            return message.reply({embeds: [error_embed]});
		}
	}
}