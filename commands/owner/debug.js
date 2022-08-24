module.exports = {
	name: 'debug',
	description: 'Oprește botul pentru investigații (#special-bucuresti-general)',
	category: 'Admin',
	cooldown: 0,
	async execute(message, args, client) {
		client.debug = !client.debug;
        message.reply('gata boss!!');
	}
}