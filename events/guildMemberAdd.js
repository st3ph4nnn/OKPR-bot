const { decancer } = require('@imranbarbhuiya/decancer');

module.exports = {
	name: "guildMemberAdd",
	once: false,
	async execute(member) {
		if (member.user.bot)
			return;

		let username = member.user.username;
		member.setNickname(decancer(username));
	}
}