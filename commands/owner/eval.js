module.exports = {
	name: 'eval',
	owner: true,
	description: 'Evaluează o comandă.',
	category: 'Admin',
	cooldown: 1000,
	async execute(message, args, client) {
		if (!args[0]) return;

		eval(args.join(' '));
		message.delete();
	}
}