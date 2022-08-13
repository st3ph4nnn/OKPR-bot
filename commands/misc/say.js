module.exports = {
	name: 'say',
	aliases: ['spune'],
	description: 'Fă botul să spună ceva.',
	category: 'Misc',
	cooldown: 10000,
	async execute(message, args, client) {
		if (!args[0]) return message.reply('Ce vrei să spun?');

		return message.channel.send(args.join(' '));
	}
}