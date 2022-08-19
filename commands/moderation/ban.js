const { embed } = require('../../embed.js');

module.exports = {
    name: "ban",
    category: "Moderation",
    cooldown: 1,
    staff: true,
    description: "Banează un membru specificat.",
    async execute(message, args, client) {
        const ban_embed = new embed(message, 'Ban');

        let user = message.mentions.members.first();

        if (!user) {
            ban_embed.description(`Te rog specifică un membru pentru a-i da ban. \n\nFolosire: \`${client.prefix}ban @membru {timp} {motiv}\``);
            return ban_embed.send();
        }

        if (!user.moderatable) {
            ban_embed.description(`Membrul nu poate fi moderat.`);
            return ban_embed.send();
        }

        let time = 0;
        let reason_index = 2

        if (isNaN(args[1])) {
            reason_index = 1;
        } else {
            time = parseInt(args[1])
        }

        let reason = "nedefinit";

        if (args[reason_index]) {
            reason = args[reason_index] + " ";
            for (let i = reason_index + 1; i < args.length; i++)
                reason += args[i] + " ";
            reason = reason.slice(0, -1);
        }

        ban_embed.description(`Membru: <@${user.id}>\nTimp: \`${time == 0 ? "mai mult decăt o să trăiască!!" : (time + ' zile')}\` \nMotiv: \`${reason}\``);

        ban_embed.send();

        user.ban({ days: time, reason: reason });
    }
}