const fs = require("fs");

module.exports = {
	name: 'greentext',
	description: 'Chadează pe cineva anume.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
            await client.ftp.downloadTo("database/strings.txt", "strings.txt");
            let s = fs.createReadStream('database/strings.txt');

            let key = undefined;

            try {
                client.chain.seed(s, () => {
                    let range = 10;

                    if (args[0] && !isNaN(args[0]) && args[0] % 1 == 0) {
                        range = (parseInt(args[0]) <= 30 ? parseInt(args[0]) : 30);
                        if (range < 5) range = 5;
                    }

                    let answer = '';


                    for (let i = 0; i < range; i++) {
                        let res;

                        if (key == undefined)
                            key = client.chain.pick();
                        else
                            key = client.chain.next(key);

                        let res = client.chain.respond(key, random.int(1, 5)).join(' ');

                        if (res) answer += res + '\n';
                    }

                    message.channel.send(`\`\`\`${answer}\`\`\``);
                });
            } catch {
                // ...
            }
	}
}