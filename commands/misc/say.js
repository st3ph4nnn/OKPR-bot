module.exports = {
	name: 'say',
	aliases: ['spune'],
	description: 'Fă botul să spună ceva.',
	category: 'Misc',
	permissions: [ 'ADMINISTRATOR' ],
	cooldown: 10000,
	async execute(message, args, client) {
		if (!args[0]) return message.reply('Ce vrei să spun?');

		if (message.mentions.members.first() || message.mentions.everyone) return message.reply('Nu permit mențiuni :nerd:!!!');

		await message.delete({timeout: 1000});

		return message.channel.send(args.join(' '));
	}
}