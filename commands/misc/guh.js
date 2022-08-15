const { MessageAttachement } = require('discord.js');

module.exports = {
	name: 'guh',
    aliases: ['huh'],
	description: 'Huhează pe cineva anume.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
		try {
            const msg = await message.fetchReference();

            if (msg.author.id == '853225138116100106')
                return message.reply(`Imaginează-ți să incerci sa îi dai huh lui ștefan :nerd:`);

            if (msg.author.id == '995939755118297140')
                return message.reply(`Imaginează-ți să incerci să imi dai huh :nerd:`);

            msg.react('🤔').catch((err) => {
                msg.reply(`Acest utilizator (\`${msg.author.username}\`) (:face_vomiting:) este gay și mi-a dat block lol :nerd:`);
            });

            let val = Math.floor(Math.random() * 2);
            switch (val) {
            	case 0: {
            		msg.reply('https://cdn.discordapp.com/attachments/839520481475952654/1000380480690061312/video06.mov ');
            		break;
            	}
            	case 1: {
            		msg.reply('https://tenor.com/view/guh-cat-gif-22906544');
            		break;
            	}
            }

            await message.delete({timeout:1000});
        } catch(err) {
            const msg = await message.channel.messages.fetch({ limit: 2 });

            if (msg.last().author.id == '853225138116100106')
                return message.reply(`Imaginează-ți să incerci sa îi dai huh lui ștefan :nerd:`);

            if (msg.last().author.id == '995939755118297140')
                return message.reply(`Imaginează-ți să incerci să imi dai huh :nerd:`);

            msg.last().react('🤔').catch((err) => {
                msg.last().reply(`Acest utilizator (\`${msg.last().author.username}\`) (:face_vomiting:) este gay și mi-a dat block lol :nerd:`);
            });

            let val = Math.floor(Math.random() * 2);
            switch (val) {
                case 0: {
                    msg.last().reply('https://cdn.discordapp.com/attachments/839520481475952654/1000380480690061312/video06.mov ');
                    break;
                }
                case 1: {
                    msg.last().reply('https://tenor.com/view/guh-cat-gif-22906544');
                    break;
                }
            }

            await message.delete({timeout:1000});
        }
	}
}