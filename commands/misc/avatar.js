const { embed } = require('../../embed.js');

module.exports = {
	name: 'avatar',
	aliases: [ 'av' ],
	description: 'Arată avatarul/poza de profil a cuiva.',
	category: 'Misc',
	cooldown: 1000,
	async execute(message, args, client) {
		let member = message.mentions.members.first() || message.member;
        let avatar_url = member.user.avatarURL();

		const avatar_embed = new embed(message, `Avatar: \`${member.user.username}\``);

        if (!avatar_url) {
        	avatar_embed.description(`Utilizatorul \`${member.user.username}\` are un avatar default. Rădeți la acest utilizator!!!`);
        	avatar_embed.send();
        	return;
        }

		avatar_embed.image(avatar_url);
		avatar_embed.send();
	}
}