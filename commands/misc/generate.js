const fs = require('fs');
const random = require('random');

module.exports = {
	name: 'generate',
	aliases: [ 'gen' ],
	description: 'Generează un mesaj (lanț markov).',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		try {
            await client.ftp.downloadTo("database/strings.txt", "strings.txt");
        } catch {
            return;
        }

		let s = fs.createReadStream('database/strings.txt');

		client.chain.seed(s, () => {
        	let res = client.chain.respond(client.chain.pick(), random.int(1, 10)).join(' ');
        	message.channel.send(res);
		});
	}
}