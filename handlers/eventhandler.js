const { readdirSync } = require('fs');

module.exports = (client) => {
	let number = 0;

	const files = readdirSync(`./events/`).filter(files => files.endsWith('.js'));
	for (const file of files) {
		console.log(`[events] loading event ${file}`);
		const event = require(`../events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
			number++;
			continue;
		}

		client.on(event.name, (...args) => event.execute(...args, client));
		number++;
	}

	console.log(`[info] finished loading ${number} events`)
}