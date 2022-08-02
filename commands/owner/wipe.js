const fs = require('fs');

module.exports = {
	name: 'wipe',
	description: 'Resetează progresul botului în învățare.',
	category: 'Admin',
    owner: true,
	cooldown: 0,
	async execute(message, args, client) {
        if (!client.learning)
            client.learning = true;

        fs.writeFileSync('database/strings', '', 'utf-8');

        message.reply('wiped out my knowledge...')
	}
}