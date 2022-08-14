const { Client, Collection, EmbedBuilder, Partials } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const ftp = require("basic-ftp")
let markov = require('./markov/index.js');

const client = new Client({ intents: 3276799, partials: [Partials.Message, Partials.Channel, Partials.Reaction]});

client.distube = new DisTube(client, {
	emitNewSongOnly: true,
    searchSongs: 1,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: false,
  	plugins: [ new YtDlpPlugin() ]
})

let chain = markov(5);

client.markov = markov;
client.chain = chain;
client.commands = new Collection();
client.cooldowns = new Collection();
client.prefix = '.';
client.owners_id = [ '766292175289843712', '853225138116100106', '486536274937905152', '441652840797175809'];
client.ftp = new ftp.Client();
client.markov_stop = false;
client.last_deleted_message = '';
    
['commandhandler.js', 'eventhandler.js'].forEach((handler) => {
    console.log(`[event handler] loading ${handler}`);
	require(`./handlers/${handler}`)(client);
})

client.login(process.env.TOKEN);