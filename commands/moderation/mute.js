const { embed } = require('../../embed.js');

module.exports = {
    name: "mute",
    category: "Moderation",
    cooldown: 1,
    permissions: [ "MUTE_MEMBERS" ],
    role: [ '843950648437112843' ],
    description: "Dă timeout/mute unui membru specificat.",
    async execute(message, args, client) {
        const mute_embed = new embed(message, 'Mute / Timeout');

        let user = message.mentions.members.first();

        if (!user) {
            mute_embed.description(`Te rog specifică un membru pentru a-i da timeout \n\nFolosire: \`${client.prefix}mute @membru {timp (in minute)} {motiv}\``);
            return mute_embed.send();
        }

        if (!user.moderatable) {
            mute_embed.description(`Membrul nu poate fi moderat.`);
            return mute_embed.send();
        }

        if (!args[1]) {
            mute_embed.description(`Te rog specifică timpul timeout-ului. \n\nFolosire: \`${client.prefix}mute @membru {timp (in minute)} {motiv}\``);
            return mute_embed.send();
        }

        if (isNaN(args[1]) || args[1] % 1 !== 0) {
            mute_embed.description(`Timpul specificat nu este valid. \n\nFolosire: \`${client.prefix}mute @membru {timp (in minute)} {motiv}\``);
            return mute_embed.send();
        }

        let reason = "nedefinit";

        if (args[2]) {
            reason = args[2] + " ";
            for (let i = 3; i < args.length; i++)
                reason += args[i] + " ";
            reason = reason.slice(0, -1);
        }

        mute_embed.description(`Membru: <@${user.id}>\nTimp: \`${args[1]}\` minut(e) \nMotiv: \`${reason}\``);

        mute_embed.send();

        user.timeout(parseInt(args[1]) * 60 * 1000, reason);

        setTimeout(() => {
            if (user.communicationDisabledUntil != null) {
                mute_embed.title(`Membrul \`${user.user.username}\` nu mai are timeout.`);
                mute_embed.description(null);
                mute_embed.send();
                user.timeout(null);
            }
        }, parseInt(args[1]) * 59 * 1000);
    }
}
