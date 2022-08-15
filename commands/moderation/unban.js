const { embed } = require('../../embed.js');

module.exports = {
    name: "unban",
    category: "Moderation",
    cooldown: 1,
    staff: true,
    description: "Scoate ban-ul unui membru specificat.",
    async execute(message, args, client) {
        const unban_embed = new embed(message, 'Unban');

        if (!args[0]) {
            unban_embed.description(`Te rog specifică un membru (id-ul lui, mai exact) pentru a-i da unban. \n\nFolosire: \`${client.prefix}unban {id}\``);
            return unban_embed.send();
        }

       try {
            await message.guild.members.unban(args[0]);
            unban_embed.description(`Am reusit să debanez utilizatorul cu id-ul \`${args[0]}\`.`);
            return unban_embed.send();
        } catch(err) {
            if (err.includes('Unknown Ban'))
               unban_embed.description(`Nu am reușit să debanez acest utilizator. Mai exact, el nu este banat. \`${err}\` `);
            else
               unban_embed.description(`Nu am reușit să debanez acest utilizator. Am dat de o eroare neobișnuită. \n\nUite aici eroarea, daca te interesează, stimate atmin: \`${err}\` `);

            return unban_embed.send();
        }
    }
}