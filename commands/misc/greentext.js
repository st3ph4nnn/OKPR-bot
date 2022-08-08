const fs = require("fs");
const random = require('random');

module.exports = {
	name: 'greentext',
	description: 'Greentext.',
	category: 'Misc',
	cooldown: 20000,
	async execute(message, args, client) {
        try {
            await client.ftp.downloadTo("database/strings.txt", "strings.txt");
            let quotes = fs.readFileSync('database/strings.txt', 'utf8').toString().split(' ');
			if (!quotes[0] || !quotes.length) return;
            let s = fs.createReadStream('database/strings.txt');

            let key = undefined;

            try {
                client.chain.seed(s, () => {
                    let range = random.int(5, 10);

                    if (args[0] && !isNaN(args[0]) && args[0] % 1 == 0) {
                        range = (parseInt(args[0]) <= 30 ? parseInt(args[0]) : 30);
                        if (range < 5) range = 5;
                    }

                    let answer = '';

                    for (let i = 0; i < range; i++) {
                        if (key === undefined) key = client.chain.pick();

                        let res = client.chain.respond(key, random.int(1, 5)).join(' ');
                        key = res;

                        if (res) answer += '> > ' + res + '\n';
                    }

                    message.channel.send(`${answer}`);
                });
            } catch(err) {
                return;
            }
        } catch(err) {
            console.error(`[error: markov chain (greentext)] ${err}`);
        }

	}
}