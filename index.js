const { Client, Collection, EmbedBuilder, Partials } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const random_col = require('random-hex-color');

const client = new Client({ intents: 3276799, partials: [Partials.Message, Partials.Channel, Partials.Reaction]});

client.distube = new DisTube(client, {
	emitNewSongOnly: true,
    searchSongs: 1,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: false,
  	plugins: [ new YtDlpPlugin() ]
})

let markov = require('markov');
let chain = markov(2);

client.markov = markov;
client.chain = chain;
client.commands = new Collection();
client.cooldowns = new Collection();
client.prefix = process.env.PREFIX;
client.owner_id = process.env.OWNER;

['commandhandler.js', 'eventhandler.js'].forEach((handler) => {
    console.log(`[event handler] loading ${handler}`);
	require(`./handlers/${handler}`)(client);
})

client.login(process.env.TOKEN);