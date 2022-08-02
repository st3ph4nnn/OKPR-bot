module.exports = {
	name: 'delete',
	description: 'Șterge mesajul botului.',
	category: 'Admin',
	cooldown: 0,
	async execute(message, args, client) {
		try {
            const msg = await message.fetchReference();

            if (msg.author.id != '995939755118297140')
                return;

            await msg.delete({timeout:1000});
            await message.delete({timeout: 1000});
        } catch {
            const msg = await message.channel.messages.fetch({ limit: 2 });

            if (msg.last().author.id != '995939755118297140')
                return message.reply(`Imaginează-ți să încerci să imi dai nerd :nerd:`);

            await msg.last().delete({timeout:1000});
            await message.delete({timeout: 1000});
        }
	}
}