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
        	await client.ftp.uploadFrom('database/strings.txt', 'strings.txt');
	        return message.reply('wiped out my knowledge...')
        }

        if (args[0] == 'list') {
        	await client.ftp.downloadTo('database/strings.txt', 'strings.txt');
        	let quotes = fs.readFileSync('database/strings', 'utf8').toString();
        
        	let msg = `\`\`\`\n${quotes}\`\`\``;

	        return message.reply(msg);
        }
	}
}