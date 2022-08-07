const { Client, Collection, EmbedBuilder, Partials } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const ftp = require("basic-ftp")

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
let chain = markov(10);

client.markov = markov;
client.chain = chain;
client.commands = new Collection();
client.cooldowns = new Collection();
client.prefix = '.';
client.owners_id = [ '766292175289843712', '853225138116100106' ];
client.ftp = new ftp.Client();
client.markov_stop = false;
    
['commandhandler.js', 'eventhandler.js'].forEach((handler) => {
    console.log(`[event handler] loading ${handler}`);
	require(`./handlers/${handler}`)(client);
})

client.login(process.env.TOKEN);