const fs = require('fs');
const random = require('random');

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

	        return message.reply(msg + `\n size: \`${quotes.length}\``);
        }

		if (args[0] == 'set') {
			let quotes = fs.readFileSync('database/strings.txt', 'utf8').toString().split(' ');

			while (quotes.length >= 100 || quotes.join(' ').length >= 2000) {
				quotes.splice(random.int(0, quotes.length), 10);
				fs.writeFileSync('database/strings.txt', quotes.join(' '), 'utf-8');
			}

			let words = message.content.split(' ');

			words.shift(); words.shift();

			if (!words[0])
				return;

			let final_words = [ ];

			for (let i = 0; i < words.length; i++) {
				if (!quotes.includes(words[i])) {
					final_words.push(words[i]);
				}
			}

			let final_string = final_words.join(' ');
			final_string = final_string.replace(/\r?\n|\r/g, " ");
			fs.appendFileSync('database/strings.txt', final_string + ' ');

			try {
				await client.ftp.uploadFrom('database/strings.txt', 'strings.txt');
				message.reply(`Am adaugat \`${final_string}\``);
				return;
			} catch {
				return;
			}
		}

        if (args[0] == 'toggle') {
        	client.markov_stop = !client.markov_stop;
        	return;
        }
	}
}