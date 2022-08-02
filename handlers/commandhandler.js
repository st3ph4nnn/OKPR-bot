const { readdirSync } = require('fs');

module.exports = async (client) => {
	let number = 0;
	
	const command_folders = readdirSync('./commands');
	for (const folder of command_folders) {
		const command_files = readdirSync(`./commands/${folder}`).filter(files => files.endsWith('.js'));
		for (const file of command_files) {
			console.log(`[commands: ${folder}] loading command ${file}`);
			const command = require(`../commands/${folder}/${file}`);
			client.commands.set(command.name, command);
			number++;
		}
	}

	console.log(`[info] finished loading ${number} commands`)
}