const { MessageAttachement } = require('discord.js');

module.exports = {
	name: 'ratio',
	description: 'Raționalizează pe cineva anume.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		try {
            const msg = await message.fetchReference();

            if (msg.author.id == '853225138116100106')
                return message.reply(`Imaginează-ți să incerci sa îi dai rație lui ștefan :nerd:`);

            if (msg.author.id == '995939755118297140')
                return message.reply(`Imaginează-ți să incerci să imi dai rație :nerd:`);

            msg.reply(":nerd:");

            let val = Math.floor(Math.random() * 3);

            switch (val) {
            	case 0: {
            		msg.reply('https://c.tenor.com/foqxjgs5fdsAAAAC/giga-chad-chad.gif');
            		break;
            	}
            	case 1: {
            		msg.reply('https://c.tenor.com/Hc7UKsvouqEAAAAC/ninjago-lego.gif');
            		break;
            	}
                case 2: {
                    msg.reply('https://c.tenor.com/CP_NYd4wYrYAAAAd/ratio-bozo.gif');
                    break;
                }
            }

            await message.delete({timeout:1000});
        } catch(err) {
            const msg = await message.channel.messages.fetch({ limit: 2 });

            if (msg.last().author.id == '853225138116100106')
                return message.reply(`Imaginează-ți să incerci sa îi dai rație lui ștefan :nerd:`);

            if (msg.last().author.id == '995939755118297140')
                return message.reply(`Imaginează-ți să incerci să imi dai rație :nerd:`);

            msg.last().reply(":nerd:");

            let val = Math.floor(Math.random() * 3);
            
            switch (val) {
                case 0: {
                    msg.last().reply('https://c.tenor.com/foqxjgs5fdsAAAAC/giga-chad-chad.gif');
                    break;
                }
                case 1: {
                    msg.last().reply('https://c.tenor.com/Hc7UKsvouqEAAAAC/ninjago-lego.gif');
                    break;
                }
                case 2: {
                    msg.last().reply('https://c.tenor.com/CP_NYd4wYrYAAAAd/ratio-bozo.gif');
                    break;
                }
            }

            await message.delete({timeout:1000});
        }
	}
}