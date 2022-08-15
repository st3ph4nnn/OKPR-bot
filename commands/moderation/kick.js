const { embed } = require('../../embed.js');

module.exports = {
    name: "kick",
    category: "Moderation",
    cooldown: 1,
    staff: true,
    description: "Dă afara un membru specificat.",
    async execute(message, args, client) {
        const kick_embed = new embed(message, 'Kick');

        let user = message.mentions.members.first();

        if (!user) {
            kick_embed.description(`Te rog specifică un membru pentru a-i da kick. \n\nFolosire: \`${client.prefix}kick @membru {motiv}\``);
            return kick_embed.send();
        }

        if (!user.moderatable) {
            kick_embed.description(`Membrul nu poate fi moderat.`);
            return kick_embed.send();
        }

        let reason = "nedefinit";

        if (args[1]) {
            reason = args[1] + " ";
            for (let i = 2; i < args.length; i++)
                reason += args[i] + " ";
            reason = reason.slice(0, -1);
        }

        kick_embed.description(`Membru: <@${user.id}>\nMotiv: \`${reason}\``);

        kick_embed.send();

        user.kick({ reason: reason });
    }
}