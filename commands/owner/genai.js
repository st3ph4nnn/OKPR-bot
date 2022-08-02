const fs = require('fs');

module.exports = {
	name: 'genai',
	description: 'Lucruri legate de genAI.',
	category: 'Admin',
    owner: true,
	cooldown: 0,
	async execute(message, args, client) {
        if (args[0] == 'wipe') {
 	        fs.writeFileSync('database/strings', '', 'utf-8');
	        return message.reply('wiped out my knowledge...')
        }

        if (args[0] == 'list') {
        	let quotes = fs.readFileSync('database/strings', 'utf8').toString();
        	var msg = `\`\`\`\n${quotes}\`\`\``;

	        return message.reply(msg);
        }
	}
}