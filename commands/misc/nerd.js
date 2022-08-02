const { MessageAttachement } = require('discord.js');

module.exports = {
	name: 'nerd',
	description: 'Nerdează pe cineva anume.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		try {
            const msg = await message.fetchReference();

            if (msg.author.id == '853225138116100106')
                return message.reply(`Imaginează-ți să incerci sa îi dai nerd lui ștefan :nerd:`);

            if (msg.author.id == '995939755118297140')
                return message.reply(`Imaginează-ți să incerci să imi dai nerd :nerd:`);

            await message.delete({timeout:3000});

            msg.react('🤓');

            let val = Math.floor(Math.random() * 2);
            switch (val) {
            	case 0: {
            		msg.reply('https://cdn.discordapp.com/attachments/839520481475952654/1000370917899259914/Screenshot_20220723-031505_Discord.jpg');
            		break;
            	}
            	case 1: {
            		msg.reply(':nerd:');
            		break;
            	}
            }
        } catch {
            const msg = await message.channel.messages.fetch({ limit: 2 });

            if (msg.last().author.id == '853225138116100106')
                return message.reply(`Imaginează-ți să încerci sa îi dai nerd lui ștefan :nerd:`);

            if (msg.last().author.id == '995939755118297140')
                return message.reply(`Imaginează-ți să încerci să imi dai nerd :nerd:`);

            await message.delete({timeout:2000});

            msg.last().reply(":nerd:");
            msg.last().react('🤓');

        }
	}
}