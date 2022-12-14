const { Database, DatabaseUser } = require('../database/database.js')

module.exports = {
	name: "guildMemberRemove",
	once: false,
	async execute(member) {
		if (member.user.bot)
			return;

		const user = new DatabaseUser(member.user.username, member.user.id);

		if ((await user.get('username') !== undefined))
			await Database.delete(member.user.id);
	}
}