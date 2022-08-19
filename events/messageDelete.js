module.exports = {
	name: "messageDelete",
	once: false,
	async execute(message, client) {
		if (!message || !message.author) return;
        client.last_deleted_message = `${message.author.username}|${message.content}`;
	}
}