const fs = require("fs");
const random = require('random');

module.exports = {
	name: 'greentext',
	description: 'Chadează pe cineva anume.',
	category: 'Misc',
	cooldown: 15000,
	async execute(message, args, client) {
        try {
            await client.ftp.downloadTo("database/strings.txt", "strings.txt");
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
            } catch {
                return;
            }
        } catch {
            return;
        }

	}
}