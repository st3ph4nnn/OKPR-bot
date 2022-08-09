const { EmbedBuilder, Collection } = require('discord.js');

const random = require('random');
const fs = require('fs');

module.exports = {
	name: "messageDelete",
	once: false,
	async execute(message, client) {
		if (message.author.bot) return;
        client.last_deleted_message = `${message.author.username}|${message.content}`;
	}
}