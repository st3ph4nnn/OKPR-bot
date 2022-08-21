const { Client, Collection, Partials } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
let markov = require('./markov/index.js');
var request = require('request');
var fs = require('fs');

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
client.markov_stop = false;
client.last_deleted_message = '';
client.timer = 1000;

async function download(downloadFrom, downloadTo) {
    try {
        client.timer = 1000;
        request.get(process.env.URL + downloadFrom, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            fs.writeFileSync(downloadTo, body);
            return false;
          }
        });
    } catch(err) {
        console.log("[server download] error: " + err);
    }
}
  
async function upload(uploadFrom) {
    try {
        client.timer = 1000;
        request.post({ url:process.env.UPLOAD_URL, formData: {
          file: fs.createReadStream(uploadFrom)
        } }, function callback( error, response, body ) {
            if (!error && response.statusCode == 200) {
                return true;
            }
        });
    } catch(err) {
        console.log("[server upload] error: " + err);
    }
} 

client.download = download;
client.upload = upload;

['commandhandler.js', 'eventhandler.js'].forEach((handler) => {
    console.log(`[event handler] loading ${handler}`);
	require(`./handlers/${handler}`)(client);
})

client.login(process.env.TOKEN);