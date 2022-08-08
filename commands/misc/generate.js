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
			let quotes = fs.readFileSync('database/strings.txt', 'utf8').toString().split(' ');
			if (!quotes[0] || !quotes.length) return;
			let s = fs.createReadStream('database/strings.txt');

			client.chain.seed(s, () => {
        		let res = client.chain.respond(client.chain.pick(), random.int(1, 10)).join(' ');
        		if (res) { message.channel.send(res); message.delete({timeout: 3000}); }
			});
		} catch(err) {
			console.error(`[error: markov chain (generate)] ${err}`);
		}
	}
}