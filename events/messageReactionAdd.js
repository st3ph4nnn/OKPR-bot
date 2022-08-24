const { DatabaseUser } = require('../database/database.js');
const { EmbedBuilder } = require('discord.js');
const random_col = require('random-hex-color');

module.exports = {
	name: "messageReactionAdd",
	once: false,
	async execute(reaction, user) {
		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				console.log(error);
				return;
			}
		}

		if (user.bot || reaction.message.author.id == user.id) return;

		const db_user = new DatabaseUser(reaction.message.author.username, reaction.message.author.id);

		switch (reaction.emoji.name) {
			case '🤓': {
				await db_user.add('nerdboard', 1);
				if (reaction.count == 4  && reaction.message.content != '') {
					let embed = new EmbedBuilder().setColor(random_col()).setDescription(`**${reaction.message.content}**\n\n${reaction.message.url}`).setTimestamp().setAuthor({ name: reaction.message.author.username, iconURL: reaction.message.author.avatarURL() });
					reaction.message.channelId = '905219942394241044';
					await reaction.message.channel.send({embeds: [embed]});
				}
				break;
			}
			case 'troll_romania': {
				await db_user.add('trollboard', 1);
				if (reaction.count == 4 && reaction.message.content != '') {
					let embed = new EmbedBuilder().setColor(random_col()).setDescription(`**${reaction.message.content}**\n\n${reaction.message.url}`).setTimestamp().setAuthor({ name: reaction.message.author.username, iconURL: reaction.message.author.avatarURL() });
					reaction.message.channelId = '842131828726693909';
					await reaction.message.channel.send({embeds: [embed]});
				}
				break;
			}
			case '⭐': {
				await db_user.add('starboard', 1); 
				if (reaction.count == 4 && reaction.message.content != '') {
					let embed = new EmbedBuilder().setColor(random_col()).setDescription(`**${reaction.message.content}**\n\n${reaction.message.url}`).setTimestamp().setAuthor({ name: reaction.message.author.username, iconURL: reaction.message.author.avatarURL() });
					reaction.message.channelId = '839559315820118026';
					await reaction.message.channel.send({embeds: [embed]});
				}
				break;
			}
		}
	}
}