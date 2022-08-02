const { ActivityType } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		client.user.setPresence({
  			activities: [{ name: `r/okprietenretardat`, type: ActivityType.Watching }],
  			status: 'online'
		});

		console.log('[info] ready');
	}
}