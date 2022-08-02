const { readdirSync } = require('fs');
const { embed } = require('../../embed.js');
const { prefix } = require('../../config.json');

let commands = [ ];
let descriptions = [ ];
let permissions = [ ];

module.exports = {
	name: 'help',
	aliases: [ 'ajutor' ],
	description: 'Ai chemat deja ajutor!',
	cooldown: 1000,
	async execute(message, args, client) {
		if (commands.length == 0) {
			const command_folders = readdirSync('./commands');
			for (const folder of command_folders) {
				const command_files = readdirSync(`./commands/${folder}`).filter(files => files.endsWith('.js'));
				let category = [ folder ];
				let category_commands_descriptions = [ folder ];
				let category_commands_permissions = [ folder ];
				for (const file of command_files) {
					const command = require(`../../commands/${folder}/${file}`);
					category.push(command.name)
					category_commands_descriptions.push(command.description);

					if (folder == 'owner')
						category_commands_permissions.push("Doar ștefan");
					else {
						if (!command.permissions)
							category_commands_permissions.push("Toata lumea");
						else
							category_commands_permissions.push(command.permissions);
					}
				}
				commands.push(category);
				descriptions.push(category_commands_descriptions);
				permissions.push(category_commands_permissions);
			}
		}

		let categories = [ ];

		for (const category of commands) categories.push(category[0]);

		const help_embed = new embed(message, 'Help');

		if (!args[0]) {
			let description = `**PREFIX:** \`${client.prefix}\`\n\nAlege o categorie.\n\n`;
			for (const category of categories)
				description += `**${category}**: \`${prefix}help ${category}\`\n`;
			help_embed.description(description);
			return help_embed.send();
		}

		if (!categories.includes(args[0].toLowerCase())) {
			help_embed.description(`Categoria aleasă (\`${args[0]}\`) nu există.`);
			let description = `**Categoria aleasă (\`${args[0]}\`) nu există.**\nAlege o categorie.\n\n`;

			for (const category of categories)
				description += `**${category}**: \`${prefix}help ${category}\`\n`;

			help_embed.description(description);
			return help_embed.send();
		}

		const selected_index = categories.indexOf(args[0]);

		help_embed.title(`Help: \`${args[0]}\` `);
		help_embed.description(`Titlul ingrosat este numele comenzii respective.\nTextul subadiacent comenzii, este descrierea comenzii.\nTextul subadiacent descrierii, sunt permisiunile necesare sau permisiunea necesara pentru a executa comanda.\n\n`);

		for (let i = 1; i < commands[selected_index].length; i++) {

			help_embed.add_field(commands[selected_index][i], `\`${descriptions[selected_index][i]}\`\n[**${permissions[selected_index][i]}**]`, true);
		}

		return help_embed.send();
	}
}