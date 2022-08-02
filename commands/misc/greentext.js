const fs = require("fs");

module.exports = {
	name: 'greentext',
	description: 'Chadează pe cineva anume.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
        fs.readFile('database/greentext', 'utf-8', (err, data) => {
            let greentext = '\`\`\`';
            var lines = data.split('\n');

            let range = 10;

            if (args[0] && !isNaN(args[0]) && args[0] % 1 == 0) {
                range = (parseInt(args[0]) <= 30 ? parseInt(args[0]) : 30);
                if (range < 5) range = 5;
            }

            for (let i = 0; i < range; i++) {
                let val = (">" + lines[Math.floor(Math.random()*lines.length)] + '\n');

                while (greentext.includes(val) || (val.includes('te sinucizi') && i != 9))
                    val = (">" + lines[Math.floor(Math.random()*lines.length)] + '\n');

                greentext += val;      
            }

            message.reply(greentext + '\n\`\`\`');
        });
	}
}