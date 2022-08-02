const { embed } = require('../../embed.js');

module.exports = {
    name: "unmute",
    category: "Moderation",
    cooldown: 1,
    permissions: [ "MUTE_MEMBERS" ],
    description: "Scoate timeout-ul unui membru specificat.",
    async execute(message, args, client) {
        const unmute_embed = new embed(message, 'Unmute / Untimeout');

        let user = message.mentions.members.first();

        if (!user) {
            unmute_embed.description(`Te rog specifică un membru pentru a-i scoate timeout-ul. \n\nFolosire: \`${client.prefix}unmute @membru\``);
            return unmute_embed.send();
        }

        if (!user.moderatable) {
            unmute_embed.description(`Membrul nu poate fi moderat.`);
            return unmute_embed.send();
        }

        if (user.communicationDisabledUntil == null) {
            unmute_embed.description(`Membrul specificat nu are timeout.`);
            return unmute_embed.send();
        }

        unmute_embed.description(`Membrul \`${user.user.username}\` nu mai are timeout.`);
        unmute_embed.send();
        user.timeout(null);
    }
}