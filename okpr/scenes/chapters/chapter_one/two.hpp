#pragma once

#include "../../scenes.hpp"

void scenes::chapter_one_two(int scene) {
	int scene_sub = 0;

	int dead = 0;

	text_popup t;
	choose c;

	switch (scene) {
		case 0: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::fata_bar_mihail, rect(0, 0, 960, 640), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				switch (scene_sub) {
					case 0: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 256, height - 400), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 512, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Naratorul", "La iesirea din crasma, cei doi", "se intalnesc cu un om", "misterios intr-o masina.");
						break;
					}
					case 1: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 256, height - 400), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 512, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Mihailul", "Aloo! Tinereilor, va iau", "la o tura in opel?", "opel astra J sports tourer 2011");
						break;
					}
					case 2: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 256, height - 400), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 512, height - 400), 2);

						ask(c, 3, 2, 1, [&](int nr){
							chapter_one_two(nr);
						}, 40, "Alex si Stefan", "sa intre in masina strainului", "sa refuze si sa plece", "sa il injure", "Omul avea intentii rele.", "Isi vor continua drumul.", "Cei doi il vor injura.");
						break;
					}
				}
			});
			break;
		}
		case 1: {
			manager.draw(states::IN_GAME, BLACK, fade::NONE, [&](){
				DrawTexturePro(textures::fundaluri::fata_bar_mihail, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				draw::draw_character_reversed(textures::caractere::stefan, vec(width - 256, height - 400), 2);
				draw::draw_character_reversed(textures::caractere::alex, vec(width - 512, height - 400), 2);

				switch (scene_sub) {
					case 0: {
						draw_dialogue(t, scene_sub, 40, "Alex", "Da-te-n mortii ma-tii de mosneag.");
						break;
					}	
					case 1: {
						draw_dialogue(t, scene_sub, 40, "Stefan", "Sper sa mori intr-o prapastie.");
						break;
					}
					case 2: {
						draw_dialogue(t, scene_sub, 40, "Naratorul", "Dupa ce cei doi i-au umplut", "frigiderul de injuraturi", "au plecat din fata barului.");
						break;
					}
					case 3: {
						chapter_one_two(4);
						break;
					}
				}
			});
		}
		case 2: {
			manager.draw(states::IN_GAME, BLACK, fade::NONE, [&](){
				DrawTexturePro(textures::fundaluri::fata_bar_mihail, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				draw::draw_character_reversed(textures::caractere::stefan, vec(width - 256, height - 400), 2);
				draw::draw_character_reversed(textures::caractere::alex, vec(width - 512, height - 400), 2);

				switch (scene_sub) {
					case 0: {
						draw_dialogue(t, scene_sub, 45, "Alex si Stefan", "Cu parere de rau, nu vrem.");
						break;
					}	
					case 1: {
						draw_dialogue(t, scene_sub, 40, "Naratorul", "Cei doi au mers mai inainte.");
						break;
					}
					case 2: {
						chapter_one_two(4);
						break;
					}
				}
			});
		}
		case 3: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::oras_intunecat, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

				draw_dialogue(t, dead, 38, "Naratorul", "Cei doi, impreuna cu omul misterios", "s-au izbit intr-un gard, si", "au fost aruncati intr-o rapa.");
			
				if (dead)
					chapter_one_two(0);
			});
		}
		case 4: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::alee_galati, rect(0, 0, 960, 640), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

				switch (scene_sub) {
					case 0: {
						draw::draw_character(textures::caractere::stefan, vec(64, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(256, height - 400), 2);

						draw_dialogue(t, scene_sub, 42, "Stefan", "Ma alexe, si cum facem", "noi sa ajungem pe muntele", "asta dubios?");
						break;
					}
					case 1: {
						draw::draw_character(textures::caractere::stefan, vec(164, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(356, height - 400), 2);
						
						draw_dialogue(t, scene_sub, 36, "Alex", "Asta ma intreb si eu.", "Dar cine dracului este bercenarus?");
						break;
					}
					case 2: {
						draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

						draw::draw_character(textures::caractere::minion, vec(width - 512, height - 450), 2);

						draw_dialogue(t, scene_sub, 38, "Naratorul", "Dintr-o data, un minion le apare", "in fata eroilor. Niciunul nu stia", "cine era.");
						break;
					}
					case 3: {
						draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

						draw::draw_character(textures::caractere::minion, vec(width - 512, height - 450), 2);

						draw_dialogue(t, scene_sub, 38, "Minionul", "Ba va rog io frumos!!", "Am nev de 5 eur$ RAPID!", "tre sa-mi iau povestea dragonului!");
						break;
					}
					case 4: {
						draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

						draw::draw_character(textures::caractere::minion, vec(width - 512, height - 450), 2);

						ask(c, 5, 6, 7, [&](int nr){
							chapter_one_two(nr);
						}, 40, "Alex si Stefan", "sa ii dea 5 euro", "sa il scuipe intre ochi", "sa le spuna despre ortho", "Minionul va tine cont.", "Minionul avea intentii rele.", "Minionul va discuta cu ei despre ortho.");
						break;
					}
				}
			
			});
			break;
		}
		case 5: {
			manager.draw(states::IN_GAME, BLACK, fade::NONE, [&](){
				DrawTexturePro(textures::fundaluri::alee_galati, rect(0, 0, 960, 640), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

				draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
				draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

				draw::draw_character(textures::caractere::minion, vec(width - 512, height - 450), 2);

				switch (scene_sub) {
					case 0: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "Multam fain!", "Unde va duceti prietenasi?");
						break;
					}
					case 1: {
						draw_dialogue(t, scene_sub, 38, "Alex", "Il cautam pe prietenul nostru,", "pe muntele Coza. Ne poti ajuta?");
						break;
					}
					case 2: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "Desigur! Ne vedem pe munte.", "Am niste TNT la mine.", "Rezolvam noi cumva.");
						break;
					}
					case 3: {
						draw_dialogue(t, scene_sub, 38, "Naratorul", "Minionul ii va ajuta pe cei doi.", "Mai apoi au plecat mai departe.");
						break;
					}
					case 4: {
						chapter_one_two(9);
						break;
					}
				}
			});
			break;
		}
		case 6: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				switch (scene_sub) {
					case 0: {
						DrawTexturePro(textures::fundaluri::alee_galati, rect(0, 0, 960, 640), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

						draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

						draw::draw_character(textures::caractere::minion, vec(width - 512, height - 450), 2);
						draw_dialogue(t, scene_sub, 38, "Minionul", "Lasa ca vedeti voi!");
						break;
					}
					case 1: {
						DrawTexturePro(textures::fundaluri::oras_intunecat, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

						draw_dialogue(t, scene_sub, 36, "Naratorul", "Minionul, fiind FOARTE suparat,", "a scos un gravity gun si", "i-a aruncat pe cei doi pe luna.");
						break;
					}
					case 2: {
						chapter_one_two(0);
						break;
					}
				}
			});
			break;
		}
		case 7: {
			manager.draw(states::IN_GAME, BLACK, fade::NONE, [&](){
				DrawTexturePro(textures::fundaluri::alee_galati, rect(0, 0, 960, 640), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

				draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
				draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

				draw::draw_character(textures::caractere::minion, vec(width - 512, height - 450), 2);

				switch (scene_sub) {
					case 0: {
						draw_dialogue(t, scene_sub, 38, "Alex si Stefan", "Ma minionule, nu avem,", "toti banii s-au dus pe vodka.", "Ai auzit cumva de OrthoSB?");
						break;
					}
					case 1: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "OrthoSB!?!?!?!?!??!", "Prietenul meu indragit!", "Ce e cu el?");
						break;
					}
					case 2: {
						draw_dialogue(t, scene_sub, 38, "Alex", "A fost rapit.");
						break;
					}
					case 3: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "CE!!!!!?????????");
						break;
					}
					case 4: {
						draw_dialogue(t, scene_sub, 38, "Stefan", "Stim. Amandoi am fost socati.", "Cica e pe muntele Coza, din", "apropierea galatiului. Trebuie sa");
						break;
					}	
					case 5: {
						draw_dialogue(t, scene_sub, 38, "Stefan", "Ne ajuti sa-l gasim. Neaparat.", "OKPR nu mai este la fel.");
						break;
					}
					case 6: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "Desigur! Ce nu fac eu pentru", "prietenul meu drag. Am niste TNT.", "Ne vedem pe munte.");
						break;
					}
					case 7: {
						draw_dialogue(t, scene_sub, 38, "Naratorul", "Minionul ii va ajuta pe cei doi.", "Mai apoi au plecat mai departe.");
						break;
					}
					case 8: {
						chapter_one_two(9);
						break;
					}
				}
			});
			break;
		}
		case 8: {
			manager.draw(states::IN_GAME, BLACK, fade::NONE, [&](){
				DrawTexturePro(textures::fundaluri::alee_galati, rect(0, 0, 960, 640), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

				draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
				draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

				draw::draw_character(textures::caractere::minion, vec(width - 512, height - 450), 2);

				switch (scene_sub) {
					case 0: {
						draw_dialogue(t, scene_sub, 38, "Alex si Stefan", "Ma minionule, nu avem,", "toti banii s-au dus pe vodka.", "Ai auzit cumva de OrthoSB?");
						break;
					}
					case 1: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "OrthoSB!?!?!?!?!??!", "Prietenul meu indragit!", "Ce e cu el?");
						break;
					}
					case 2: {
						draw_dialogue(t, scene_sub, 38, "Alex", "A fost rapit.");
						break;
					}
					case 3: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "CE!!!!!?????????");
						break;
					}
					case 4: {
						draw_dialogue(t, scene_sub, 38, "Stefan", "Stim. Amandoi am fost socati.", "Cica e pe muntele Coza, din", "apropierea galatiului. Trebuie sa");
						break;
					}	
					case 5: {
						draw_dialogue(t, scene_sub, 38, "Stefan", "Ne ajuti sa-l gasim. Neaparat.", "OKPR nu mai este la fel.");
						break;
					}
					case 6: {
						draw_dialogue(t, scene_sub, 38, "Minionul", "Desigur! Ce nu fac eu pentru", "prietenul meu drag. Am niste TNT.", "Ne vedem pe munte.");
						break;
					}
					case 7: {
						draw_dialogue(t, scene_sub, 38, "Naratorul", "Minionul ii va ajuta pe cei doi.", "Mai apoi au plecat mai departe.");
						break;
					}
					case 8: {
						chapter_one_two(9);
						break;
					}
				}
			});
			break;
		}
		case 9: {
			return chapter_one_third(0);
			break;
		}
	}
}