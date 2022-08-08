const fs = require('fs');

module.exports = {
	name: 'markov',
	description: 'Lucruri legate de markov.',
	category: 'Admin',
    owner: true,
	cooldown: 0,
	async execute(message, args, client) {
        if (args[0] == 'wipe') {
 	        fs.writeFileSync('database/strings.txt', '', 'utf-8');
        	await client.ftp.uploadFrom('database/strings.txt', 'strings.txt');
	        return message.reply('wiped out my knowledge...')
        }

        if (args[0] == 'list') {
        	await client.ftp.downloadTo('database/strings.txt', 'strings.txt');
        	let quotes = fs.readFileSync('database/strings.txt', 'utf8').toString();
        
        	let msg = `\`\`\`\n${quotes}\`\`\``;

	        return message.reply(msg + `\n size: ${quotes.length}`);
        }

        if (args[0] == 'stop') {
        	client.markov_stop = true;
        	return;
        }
	}
}