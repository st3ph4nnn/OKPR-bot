#pragma once

#include "../../scenes.hpp"

void scenes::chapter_one_third(int scene) {
	int scene_sub = 0;

	int dead = 0;

	text_popup t;
	choose c;

	switch (scene) {
		case 0: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::alee_galati_2, rect(0, 0, 960, 640), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				switch (scene_sub) {
					case 0: {
						draw::draw_character(textures::caractere::stefan, vec(64, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(256, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Stefan", "Ba da rau famat e galatiul asta..");
						break;
					}
					case 1: {
						draw::draw_character(textures::caractere::stefan, vec(164, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(356, height - 400), 2);

						draw_dialogue(t, scene_sub, 37, "Alex", "Ce dracu cauta dacia aia in cladire?");
						break;
					}
					case 2: {
						draw::draw_character(textures::caractere::stefan, vec(264, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(456, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Alex", "Dedemanu sta sa cada... ");
						break;
					}
					case 3: {
						draw::draw_character(textures::caractere::stefan, vec(364, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(556, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Stefan", "Ba stai oleaca...", "Da unde mergem?");
						break;
					}
					case 4: {
						draw::draw_character(textures::caractere::stefan, vec(364, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(556, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Alex", "Hai la nebunu weed sa il", "vizitam oleaca, sa ii cer scuze", "pentru ban.");
						break;
					}
					case 5: {
						draw::draw_character(textures::caractere::stefan, vec(764, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(956, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Stefan", "Bine spui, haida");
						break;
					}
					case 6: {
						draw::draw_character(textures::caractere::stefan, vec(764, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(956, height - 400), 2);

						draw_dialogue(t, scene_sub, 38, "Naratorul", "Cei doi pleaca la cabana nebunului", "weed, care era aflata langa", "muntele Coza, de langa galati.");
						break;
					}
					case 7: {
						return chapter_one_third(1);
					}
				}
			});
			break;
		}
		case 1: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::casa_nebunului_weed, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				switch (scene_sub) {
					case 0: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 128, height - 300), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 384, height - 300), 2);

						draw_dialogue(t, scene_sub, 40, "Stefan", "Sigur nu e casa lui.", "Casa lui ar fi mai moderna daca", "tot e un hacker.");
						break;
					}
					case 1: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 228, height - 300), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 484, height - 300), 2);

						draw_dialogue(t, scene_sub, 37, "Alex", "Hai sa tipam poate ne aude...");
						break;
					}
					case 2: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 228, height - 300), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 484, height - 300), 2);

						draw_dialogue(t, scene_sub, 40, "Alex", "ALOOOOO!!!!", "NENEA WEED!!!!!");
						break;
					}
					case 3: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 228, height - 300), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 484, height - 300), 2);

						draw_dialogue(t, scene_sub, 40, "Naratorul", "...", "Nu raspunde nimeni.");
						break;
					}
					case 4: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 228, height - 300), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 484, height - 300), 2);

						draw_dialogue(t, scene_sub, 40, "Stefan", "Stai ca stiu ce sa spun", "BAAA TI-A CRESCUT IARBA", "IN GRADINA!!!");
						break;
					}
					case 5: {
						draw::draw_character_reversed(textures::caractere::stefan, vec(width - 228, height - 300), 2);
						draw::draw_character_reversed(textures::caractere::alex, vec(width - 484, height - 300), 2);
						draw::draw_character_reversed(textures::caractere::nebunu_weed, vec(width - 854, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Nebunu Weed", "Unde ma?????");
						break;
					}
					case 6: {
						draw::draw_character(textures::caractere::stefan, vec(764, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(956, height - 400), 2);

						draw_dialogue(t, scene_sub, 40, "Naratorul", "Cei doi pleaca la cabana nebunului", "weed, care era aflata langa", "muntele Coza, de langa galati.");
						break;
					}
				}
			});
			break;
		}
	}
}