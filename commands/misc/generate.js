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
			let s = fs.createReadStream('database/strings.txt');

			const content = readFileSync('database/strings.txt', 'utf-8').split(/\r?\n/);

			if (content.length <= 5)
				return;

			client.chain.seed(s, () => {
        		let res = client.chain.respond(client.chain.pick(), random.int(1, 10)).join(' ');
        		if (res) message.channel.send(res);
			});
        } catch {
            return;
        }

	}
}