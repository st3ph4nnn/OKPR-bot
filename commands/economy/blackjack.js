const { embed } = require('../../embed.js');
const { DatabaseUser } = require('../../database/database.js');
const random = require('random');

function shuffle() {
    const values = ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    var arr = [ [ values[random.int(0, 8)], values[random.int(0, 8)] ], [ values[random.int(0, 8)], values[random.int(0, 8)] ] ];
    return arr;
}

function update(arr, show = false) {
    let description = '';

    for (let index = 0; index < 2; index++) {
        if (index == 0) {
            description += '**Mâna inamicului**\n'
            for (let ind = 0; ind < arr[0].length; ind++) {
                if (ind <= 1 && !show) {
                    description += '\`?\` ';
                } else {
                    description += `\`${arr[0][ind]}\` `;
                }
            }
            description += '\n\n';
        } else {
            description += '**Mâna ta**\n'
            for (let ind = 0; ind < arr[1].length; ind++)
                description += `\`${arr[1][ind]}\` `;
            description += '\n\n';
        }
    }

    return description
}

function hit(arr) {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    arr.push(values[random.int(0, 12)]);
}

function sum(arr, inamic = false) {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    if (inamic) {
        if (arr.length <= 2)   
            return 'necunoscută';
        else {
            let sum = 0;
        
            for (let i = 2; i < arr.length; i++)
                for (let j = 0; j < values.length; j++)
                    if (arr[i] == values[j])
                        sum += (j+1);

            return sum;
        }
    }

    let sum = 0;

    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < values.length; j++)
            if (arr[i] == values[j])
                sum += (j+1);

    return sum;
}

function ai(hand) {
    let hand_sum = sum(hand);

    let chance = 1;

    switch (hand_sum) { 
        case 16:
        case 17: chance = 2; break;
        case 18:
        case 19: chance = 3; break;
        case 20: chance = 4; break;
    }

    return (random.int(1, chance) === 1);
}

module.exports = {
	name: 'blackjack',
    aliases: [ 'negrujack', 'bj' ],
	description: 'Practic, vaslui cosplay.',
	category: 'Economy',
	cooldown: 1000,
	async execute(message, args, client) {
		const blackjack_embed = new embed(message, 'Negru jack 💶 💶 💶');

		let db_user = new DatabaseUser(message.author.username, message.author.id);

		if (!args[0]) {
            blackjack_embed.description(`Cât pariezi boss? \n\nFolosire: \`${client.prefix}blackjack {bani}\``);
            return blackjack_embed.send();
        }

        let bet = args[0];

        if (isNaN(bet) || bet % 1 !== 0) {
            blackjack_embed.description(`Ce monedă folosești? N-am înțeles cât vrei să pariezi. \n\nFolosire: \`${client.prefix}septari {bani}\``);
            return blackjack_embed.send();
        }
		
		if (bet < 50) {
			blackjack_embed.description(`Bă, știu că pula botswană costă mult, dar totuși, măcar 50 tre sa bagi...`);
            return blackjack_embed.send();
		}

		let balance = await db_user.get('balance');

		if (bet > balance) {
			blackjack_embed.description(`Ești sărac lipit, n-ai atâta.`);
            return blackjack_embed.send();
		}

        let original_bal = balance;
        balance -= bet;

		let hands = shuffle();

		let description = update(hands);

        let local_sum = sum(hands[1]);
        let enemy_sum = sum(hands[0], true);

        let local_stay = false;
        let enemy_stay = false;

        description += `Suma ta: \`${local_sum}\`\nSuma inamicului: \`${enemy_sum}\`\n\nHIT: 🟩\n\nSTAY: 🟧`;

        blackjack_embed.description(description);
        let msg = await blackjack_embed.send();

        msg.react('🟩');
        msg.react('🟧');


        let author_id = message.author.id;

        const collector = msg.createReactionCollector({ time: 60000 });

        let game_over = false;

        collector.on('collect', (reaction, user) => {
            if (game_over)
                return;
            
            if (author_id === user.id) {
                switch (reaction.emoji.name) {
                    case '🟩': {
                        hit(hands[1]);
                        break;
                    }
                    case '🟧': {
                        local_stay = true;
                        break;
                    }
                }

                local_sum = sum(hands[1]);
                enemy_sum = sum(hands[0], true);

                if (local_stay) {
                    if (!enemy_stay) {
                        while (ai(hands[0])) {
                            hit(hands[0]);
                            enemy_sum = sum(hands[0]);

                            if (enemy_sum > 21) {
                                description = update(hands, true);
                                local_sum = sum(hands[1]);
                                balance += (bet * 2);
                                description += `**Bravo boss!!! Ai câștigat.**\n\nSuma ta: \`${local_sum}\`\nSuma inamicului: \`${enemy_sum}\`\n\nAi pariat: \`${bet}\` <:troll_romania:996060026093441104>\nAi câștigat: \`${bet*2}\`\nAtâția bani ai acum: \`${balance}\` <:troll_romania:996060026093441104> Atâția ai avut: \`${original_bal}\` <:troll_romania:996060026093441104>`;
                                blackjack_embed.description(description);
                                msg.reactions.removeAll();
                                db_user.set('balance', balance);
                                game_over = true;
                                return msg.edit({embeds: [blackjack_embed.embed]});
                            }
                        }

                        local_sum = sum(hands[1]);
                        enemy_sum = sum(hands[0]);
                        if (local_sum > enemy_sum && local_sum <= 21) {
                            description = update(hands, true);
                            balance += (bet * 2);
                            description += `**Bravo boss!!! Ai câștigat.**\n\nSuma ta: \`${local_sum}\`\nSuma inamicului: \`${enemy_sum}\`\n\nAi pariat: \`${bet}\` <:troll_romania:996060026093441104>\nAi câștigat: \`${bet*2}\`\nAtâția bani ai acum: \`${balance}\` <:troll_romania:996060026093441104> Atâția ai avut: \`${original_bal}\` <:troll_romania:996060026093441104>`;
                            blackjack_embed.description(description);
                            msg.reactions.removeAll();
                            db_user.set('balance', balance);
                            game_over = true;   
                            return msg.edit({embeds: [blackjack_embed.embed]});
                        } else {
                            if (local_sum < enemy_sum && enemy_sum <= 21) {
                                description = update(hands, true);
                                local_sum = sum(hands[1]);
                                enemy_sum = sum(hands[0]);
                                description += `**Aia e boss, ai pierdut.**\n\nSuma ta: \`${local_sum}\`\nSuma inamicului: \`${enemy_sum}\`\n\nAi pariat: \`${bet}\` <:troll_romania:996060026093441104>\nAi pierdut: \`${bet*2}\`\nAtâția bani ai acum: \`${balance}\` <:troll_romania:996060026093441104> Atâția ai avut: \`${original_bal}\` <:troll_romania:996060026093441104>`;
                                blackjack_embed.description(description);
                                msg.reactions.removeAll();
                                db_user.set('balance', balance);
                                game_over = true;    
                                return msg.edit({embeds: [blackjack_embed.embed]});
                            }
                        }
                    }
                }

                if (local_sum > 21) {
                    description = update(hands, true);
                    local_sum = sum(hands[1]);
                    enemy_sum = sum(hands[0]);
                    description += `**Aia e boss, ai pierdut.**\n\nSuma ta: \`${local_sum}\`\nSuma inamicului: \`${enemy_sum}\`\n\nAi pariat: \`${bet}\` <:troll_romania:996060026093441104>\nAi pierdut: \`${bet*2}\`\nAtâția bani ai acum: \`${balance}\` <:troll_romania:996060026093441104> Atâția ai avut: \`${original_bal}\` <:troll_romania:996060026093441104>`;
                    blackjack_embed.description(description);
                    msg.reactions.removeAll();
                    db_user.set('balance', balance);
                    game_over = true;   
                    return msg.edit({embeds: [blackjack_embed.embed]});
                } else {
                    if (enemy_sum > 21 || local_sum == 21) {
                        description = update(hands, true);
                        local_sum = sum(hands[1]);
                        enemy_sum = sum(hands[0]);
                        balance += (bet * 2);
                        description += `**Bravo boss!!! Ai câștigat.**\n\nSuma ta: \`${local_sum}\`\nSuma inamicului: \`${enemy_sum}\`\n\nAi pariat: \`${bet}\` <:troll_romania:996060026093441104>\nAi câștigat: \`${bet*2}\`\nAtâția bani ai acum: \`${balance}\` <:troll_romania:996060026093441104> Atâția ai avut: \`${original_bal}\` <:troll_romania:996060026093441104>`;
                        blackjack_embed.description(description);
                        msg.reactions.removeAll();
                        db_user.set('balance', balance);
                        game_over = true;   
                        return msg.edit({embeds: [blackjack_embed.embed]});
                    }

                    if (ai(hands[0])) {
                        hit(hands[0]);
                        enemy_sum = sum(hands[0]);

                        if (enemy_sum > 21) {
                            description = update(hands, true);
                            local_sum = sum(hands[1]);
                            enemy_sum = sum(hands[0]);
                            balance += (bet * 2);
                            description += `**Bravo boss!!! Ai câștigat.**\n\nSuma ta: \`${local_sum}\`\nSuma inamicului: \`${enemy_sum}\`\n\nAi pariat: \`${bet}\` <:troll_romania:996060026093441104>\nAi câștigat: \`${bet*2}\`\nAtâția bani ai acum: \`${balance}\` <:troll_romania:996060026093441104> Atâția ai avut: \`${original_bal}\` <:troll_romania:996060026093441104>`;
                            blackjack_embed.description(description);
                            msg.reactions.removeAll();
                            db_user.set('balance', balance);
                            game_over = true;   
                            return msg.edit({embeds: [blackjack_embed.embed]});
                        }
                    } else {
                        enemy_stay = true;
                    }

                    description = update(hands);
                    local_sum = sum(hands[1]);
                    enemy_sum = sum(hands[0], true);
                    description += `Suma ta: \`${local_sum}\`\nSuma cunoscută a inamicului: \`${enemy_sum}\`\n\nHIT: 🟩\n\nSTAY: 🟧`;
                    blackjack_embed.description(description);
                    msg.edit({embeds: [blackjack_embed.embed]})
                }
            }

            if (!user.bot) reaction.users.remove(user.id);
        });

        collector.on('end', () => {
            msg.delete({timeout: 1000});
        });
    }
}