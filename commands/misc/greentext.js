const fs = require("fs");
const random = require('random');

module.exports = {
	name: 'greentext',
	description: 'Chadează pe cineva anume.',
	category: 'Misc',
	cooldown: 20000,
	async execute(message, args, client) {
        try {
            await client.ftp.downloadTo("database/strings.txt", "strings.txt");
            let s = fs.createReadStream('database/strings.txt');

            const content = fs.readFileSync('database/strings.txt', 'utf-8').split(/\r?\n/);

            if (content.length <= 5)
                return;

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
                console.error(`[error: markov chain (greentext)] ${err}`);
            }
        } catch(err) {
            console.error(`[error: markov chain (greentext)] ${err}`);
        }

	}
}