const { embed } = require('../../embed.js');

module.exports = {
    name: "unoff",
    category: "Moderation",
    cooldown: 1,
    permissions: [ "MUTE_MEMBERS" ],
    description: "Scoate \"off-ul\" unui membru specificat.",
    async execute(message, args, client) {
        const off_embed = new embed(message, 'Off');

        let user = message.mentions.members.first();

        if (!user) {
            off_embed.description(`Te rog specifică un membru pentru a-i da unoff. \n\nFolosire: \`${client.prefix}unoff @membru\``);
            return off_embed.send();
        }

        let role = message.guild.roles.cache.find(role => role.name === 'off');

        if (user.roles.cache.some(role => role.name === 'off')) {
            off_embed.title(`Membrul \`${user.user.username}\` nu mai are off.`);
            off_embed.description(null);
            off_embed.send();
            user.roles.remove(role);
        } else {
            off_embed.title(`Membrul \`${user.user.username}\` nu are momentan off.`);
            off_embed.description(null);
            off_embed.send();
        }
    }
}