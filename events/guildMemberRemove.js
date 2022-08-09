const { Database, DatabaseUser } = require('../database/database.js')

module.exports = {
	name: "guildMemberRemove",
	once: false,
	async execute(member, client) {
		if (member.user.bot)
			return;

		const user = new DatabaseUser(client, member.user.username, member.user.id);

		if ((await user.fetch_user()))
			await Database.delete(member.user.id);
	}
}