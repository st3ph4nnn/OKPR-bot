const fs = require('fs');
const random = require('random');

module.exports = {
	name: 'generate',
	aliases: [ 'gen' ],
	description: 'Generează un mesaj (lanț markov).',
	category: 'Misc',
	cooldown: 20000,
	async execute(message, args, client) {
		try {
			await client.ftp.downloadTo("database/strings.txt", "strings.txt");
		} catch {
			await client.ftp.access({
				host: process.env.HOST,
				 user: process.env.USER,
				 password: process.env.PASSWORD,
				 secure: true
			});

			await client.ftp.downloadTo("database/strings.txt", "strings.txt");
		}

		let quotes = fs.readFileSync('database/strings.txt', 'utf8').toString().split(' ');
		if (!quotes.length) return;
		let s = fs.createReadStream('database/strings.txt');

		try {
			client.chain.seed(s, () => {
				let res = client.chain.respond(client.chain.pick(), random.int(1, 6));
				if (res === undefined)
					return message.reply('Nu stiu nimic deocamdata.. n-am ce iti genera boss');
				message.channel.send(res.join(' '));
			})
		} catch(err) {
			return;
		}
	}
}