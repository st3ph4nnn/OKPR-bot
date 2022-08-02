const { embed } = require('../../embed.js');

module.exports = {
    name: "off",
    category: "Moderation",
    cooldown: 1,
    permissions: [ "MUTE_MEMBERS" ],
    description: "Dă \"off\" unui membru specificat.",
    async execute(message, args, client) {
        const off_embed = new embed(message, 'Off');

        let user = message.mentions.members.first();

        if (!user) {
            off_embed.description(`Te rog specifică un membru pentru a-i da off. \n\nFolosire: \`${client.prefix}off @membru {timp (in minute)} {motiv}\``);
            return off_embed.send();
        }

        if (!args[1]) {
            off_embed.description(`Te rog specifică timpul pentru off. \n\nFolosire: \`${client.prefix}off @membru {timp (in minute)} {motiv}\``);
            return off_embed.send();
        }

        if (isNaN(args[1]) || args[1] % 1 !== 0) {
            off_embed.description(`Timpul specificat nu este valid. \n\nUsage: \`${client.prefix}off @membru {timp (in minute)} {motiv}\``);
            return off_embed.send();
        }

        let reason = "nedefinit";

        if (args[2]) {
            reason = args[2] + " ";
            for (let i = 3; i < args.length; i++)
                reason += args[i] + " ";
            reason = reason.slice(0, -1);
        }

        off_embed.description(`Membru: <@${user.id}>\nTimp: \`${args[1]}\` minut(e) \nMotiv: \`${reason}\``);
        off_embed.send();

        let role = message.guild.roles.cache.find(role => role.name === 'off');
        user.roles.add(role);

        setTimeout(() => {
            if (user.roles.cache.some(role => role.name === 'off')) {
               off_embed.title(`Membrul \`${user.user.username}\` nu mai are off.`);
               off_embed.description(null);
               off_embed.send();
               user.roles.remove(role);
            }
        }, parseInt(args[1]) * 60 * 1000);
    }
}