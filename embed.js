const { EmbedBuilder } = require('discord.js');
const random_col = require('random-hex-color');

class embed {
	constructor(message, title, description = null, time = null, color = null) {
		const embed = new EmbedBuilder().setTitle(title).setColor((color == null ? random_col() : color)).setDescription(description).setTimestamp().setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() }).setFooter({ text: '@okpr.fun (c)', iconURL: 'https://cdn.discordapp.com/icons/839520481475952650/e87fffe069a4160e464fd88f5ccc17e2.png'});
		this.embed = embed;
		this.time = time;
		this.message = message;
	}

	get_embed() {
		return this.embed;
	}

	url(url) {
		this.embed.setURL(url);
	}

	title(title) {
		this.embed.setTitle(title);
	}

	image(img) {
		this.embed.setImage(img);
	}

	description(desc) {
		this.embed.setDescription(desc);
	}

	add_field(title, content, inline) {
		this.embed.addFields({ name: title, value: content, inline: inline});
	}

	async send() {
		try {
			if (this.time != null) {
				const msg = await this.message.reply({embeds: [this.embed]});
				setTimeout(() => msg.delete(), time);
				return;
			}

			const message = await this.message.reply({embeds: [this.embed]});
			return message;
		} catch(err) {
			return this.message.reply(`Am dat de o eroare. Mai incearca odata comanda.\n\nEroare: \`${err}\``);
		}
	}
}

module.exports = { embed: embed };