const { DatabaseUser } = require('../database/database.js') 

module.exports = {
	name: "messageReactionRemove",
	once: false,
	async execute(reaction, user, client) {
		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				return;
			}
		}

		if (user.bot || reaction.message.author.id == user.id) return;

		const db_user = new DatabaseUser(client, reaction.message.author.username, reaction.message.author.id);

		switch (reaction.emoji.name) {
			case '🤓': await db_user.sub('nerdboard', 1); break;
			case '⭐': await db_user.sub('starboard', 1); break;
			case 'troll_romania': await db_user.sub('trollboard', 1); break;
		}
	}
}