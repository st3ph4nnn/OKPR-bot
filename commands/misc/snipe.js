const { embed } = require('../../embed.js');
const google = require('googlethis');

module.exports = {
	name: 'snipe',
	description: 'Snaipează ultimul mesaj șters.',
	category: 'Misc',
	cooldown: 5000,
	async execute(message, args, client) {
        if (client.last_deleted_message == '')
            return message.reply('Nu am pe cine să snaipez!!');

        let snipe = client.last_deleted_message.split('|');
		message.reply(`Am snaipuit pe: \`${snipe[0]}\`\nMesaj: \`${snipe[1]}\``);
        client.last_deleted_message = '';
	}
}