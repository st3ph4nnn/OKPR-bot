const { Client, Collection, EmbedBuilder, Partials } = require('discord.js');
const { token, prefix, owner_id } = require('./config.json');
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

client.commands = new Collection();
client.cooldowns = new Collection();
client.prefix = prefix;
client.owner_id = owner_id;

['commandhandler.js', 'eventhandler.js'].forEach((handler) => {
    console.log(`[event handler] loading ${handler}`);
	require(`./handlers/${handler}`)(client);
})

client.login(token);

client.distube
    .on('playSong', (queue, song) => {
    	if (queue.previousSongs)
    		return;

  		const play_embed = new EmbedBuilder()
            		.setColor(random_col())
            		.setTitle(`Play`)
            		.setURL(song.url)
            		.addFields({name: '**Piesă**', value: `\`${song.name}\``, inline: true}, {name: '**Durată**', value: `\`${song.formattedDuration}\``, inline: true}, {name: '**Publicată de**', value: `\`${song.uploader.name}\``, inline: false})
            		.setImage(song.thumbnail)
            		.setFooter({ text: '@okpr.fun (c)', iconURL: 'https://cdn.discordapp.com/icons/839520481475952650/e87fffe069a4160e464fd88f5ccc17e2.png'})
            		.setTimestamp();

    	queue.textChannel.send({embeds: [play_embed]});
    })
  	.on('addSong', (queue, song) => {
    	if (!queue.previousSongs)
    		return;

  		const add_embed = new EmbedBuilder()
            		.setColor(random_col())
            		.setTitle(`Play`)
            		.setURL(song.url)
            		.addFields({name: '**Piesă**', value: `\`${song.name}\``, inline: true}, {name: '**Durată**', value: `\`${song.formattedDuration}\``, inline: true}, {name: '**Publicată de**', value: `\`${song.uploader.name}\``, inline: false})
            		.setFooter({ text: '@okpr.fun (c)', iconURL: 'https://cdn.discordapp.com/icons/839520481475952650/e87fffe069a4160e464fd88f5ccc17e2.png'})            		
            		.setImage(song.thumbnail)
            		.setTimestamp();

    	queue.textChannel.send({embeds: [add_embed]});
  	})
  	.on('addList', (queue, playlist) => {
  	  	const add_embed = new EmbedBuilder()
            		.setColor(random_col())
            		.setTitle(`Play`)
            		.setURL(playlist.url)
            		.addFields({name: '**Playlist**', value: `\`${playlist.name}\``, inline: true}, {name: '**Piese**', value: `\`${playlist.songs.length}\``, inline: true})
            		.setImage(playlist.thumbnail)
            		.setFooter({ text: '@okpr.fun (c)', iconURL: 'https://cdn.discordapp.com/icons/839520481475952650/e87fffe069a4160e464fd88f5ccc17e2.png'})
            		.setTimestamp();

    	queue.textChannel.send({embeds: [add_embed]});
  	})
  	.on('error', (channel, e) => {
  		if (channel) {
  			const error_embed = new EmbedBuilder()
            		.setColor(random_col())
            		.setTitle(`[ERROR] Music`)
            		.setDescription(`Ceva groaznic s-a întâmplat. Uite aici eroarea: \`${e.toString().slice(0, 1974)}\` `)
            		.setFooter({ text: '@okpr.fun (c)', iconURL: 'https://cdn.discordapp.com/icons/839520481475952650/e87fffe069a4160e464fd88f5ccc17e2.png'})
            		.setTimestamp();

    		channel.send({embeds: [error_embed]});
  		} else 
  			console.error(e)
 	})
  	.on('searchNoResult', (message, query) => {
  	  	const result_embed = new EmbedBuilder()
            		.setColor(random_col())
            		.setTitle(`Play`)
            		.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            		.setDescription(`Nu am găsit niciun rezultat pentru: \`${query}\`.`)
            		.setFooter({ text: '@okpr.fun (c)', iconURL: 'https://cdn.discordapp.com/icons/839520481475952650/e87fffe069a4160e464fd88f5ccc17e2.png'})
            		.setTimestamp();

    	query.textChannel.send({embeds: [result_embed]});
  	});
