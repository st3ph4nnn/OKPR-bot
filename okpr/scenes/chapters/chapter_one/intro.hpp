#pragma once

#include "../../scenes.hpp"
#include <stdio.h>

void scenes::chapter_one_intro(int scene) {
	int scene_sub = 0;

	text_popup t;

	switch (scene) {
		case 0: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::oras_intunecat, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);

				switch (scene_sub) {
					case 0: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 128, height / 2 - 256), 2);

						draw_dialogue(t, scene_sub, 38, "Naratorul", "Este o noapte linistita in galati.", "Stefan, fiind un prieten retardat", "oarecare din OKPR, isi vede de");
						break;
					}
					case 1: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 128, height / 2 - 256), 2);
						draw_dialogue(t, scene_sub, 40, "Naratorul", "treaba pe serverul de discord", "al subredditului OKPR.");
						break;
					}
					case 2: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 384, height / 2 - 256), 2);
						draw::draw_character(textures::caractere::ortho, vec(width / 2 + 128, height / 2 - 256), 2);

						draw_dialogue(t, scene_sub, 36, "Naratorul", "Deodata adminul serverului OrthoSB", "dispare de pe server (real) si nimeni", "nu mai aude de el (oare unde e?).");
						break;
					}
					case 3: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 128, height / 2 - 256), 2);

						draw_dialogue(t, scene_sub, 34, "Naratorul", "Pe de alta parte, Stefan se credea", "indeajuns de curajos pentru a pleca", "in cautarea lui OrthoSB. Ce neinfricat!");
						break;
					}
					case 4: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 384, height / 2 - 256), 2);
						draw::draw_character(textures::caractere::alex, vec(width / 2 + 128, height / 2 - 256), 2);

						draw_dialogue(t, scene_sub, 34, "Naratorul", "Totusi, nu voia sa mearga singur.", "Alex, un morcov vorbitor-plutitor,", "vrea sa il ajute pe Stefan.");
						break;
					}
					case 5: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 384, height / 2 - 256), 2);
						draw::draw_character(textures::caractere::alex, vec(width / 2 + 128, height / 2 - 256), 2);

						draw_dialogue(t, scene_sub, 34, "Naratorul", "Stefan il iarta cu greu pe Alex", "pentru banul asupra nebunului weed", "si interzicerea thug shakerilor.");
						break;
					}
					case 6: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 384, height / 2 - 256), 2);
						draw::draw_character(textures::caractere::alex, vec(width / 2 + 128, height / 2 - 256), 2);

						draw_dialogue(t, scene_sub, 34, "Naratorul", "Dar Stefan tot vrea sa il ia cu el.");
						break;
					}
					case 7: {
						draw::draw_character(textures::caractere::stefan, vec(width / 2 - 384, height / 2 - 256), 2);
						draw::draw_character(textures::caractere::alex, vec(width / 2 + 128, height / 2 - 256), 2);

						draw_dialogue(t, scene_sub, 34, "Naratorul", "Dupa cateva injuraturi care contineau", "vorbe despre arborele genealogic al", "familiei lui Alex, cei doi vor porni maine.");
						break;
					}
					case 8: {
						chapter_one_intro(1);
						break;
					}
				}
			});
			break;
		}
		case 1: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::centru_galati, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				
				switch (scene_sub) {
					case 0: {
						draw::draw_character(textures::caractere::stefan, vec(64, height - 300), 2);
						draw::draw_character(textures::caractere::alex, vec(256, height - 300), 2);
					
						draw_dialogue(t, scene_sub, 36, "Naratorul", "Cei doi se intalnesc ziua urmatoare.", "centrul era curat (Primarie???).", "In fine, s-au dus la crasma. (clasic)");
						break;
					}
					case 1: {
						chapter_one_intro(2);
						break;
					}
				}
			});
			break;
		}
		case 2: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::fata_bar, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				
				switch (scene_sub) {
					case 0: {
						draw::draw_character(textures::caractere::stefan, vec(64, height - 400), 2);
						draw::draw_character(textures::caractere::alex, vec(256, height - 400), 2);
					
						draw_dialogue(t, scene_sub, 36, "Naratorul", "Aceasta este crasma galatiului. (barul OKPR)", "curata de fel (PNL?)", "Cei doi intra in crasma.");
						break;
					}
					case 1: {
						chapter_one_intro(3);
						break;
					}
				}
			});
			break;
		}
		case 3: {
			manager.draw(states::IN_GAME, BLACK, fade::FADE_OUT, [&](){
				DrawTexturePro(textures::fundaluri::in_bar, rect(0, 0, 480, 320), rect(0, 0, width, height), vec(0, 0), 0, WHITE);
				
				switch (scene_sub) {
					case 0: {
						draw_dialogue(t, scene_sub, 40, "Stefan", "Barman! Doua vodci aici.");
						break;
					}
					case 1: {
						draw_dialogue(t, scene_sub, 40, "Barmanul", "Desigur dragii mei.", "Buna alegere.");
						break;
					}
					case 2: {
						draw_dialogue(t, scene_sub, 40, "Naratorul", "Cei doi sorb din vodca lor.", "Barmanul intrerupe linistea.");
						break;
					}
					case 3: {
						draw_dialogue(t, scene_sub, 40, "Barmanul", "Cum va mai este viata?");
						break;
					}
					case 4: {
						draw_dialogue(t, scene_sub, 40, "Alex", "Grea. Prietenul nostru Ortho", "a disparut dintr-o data,", "fara ca nimeni sa stie.");
						break;
					}
					case 5: {
						draw_dialogue(t, scene_sub, 40, "Barmanul", "Ohoo. OrthoSB. Un golan.", "Stiu multe despre el daca va", "intereseaza pe voi atat de mult.");
						break;
					}
					case 6: {
						draw_dialogue(t, scene_sub, 40, "Stefan si Alex", "CE!?!?!?!?!?", "Vrem sa auzim cat mai multe.");
						break;
					}
					case 7: {
						draw_dialogue(t, scene_sub, 40, "Barmanul", "El a fost rapit de Bercenarus.", "Ajutorul lui buci messi, care", "este inamicul nebunului weed.");
						break;
					}
					case 8: {
						draw_dialogue(t, scene_sub, 40, "Barmanul", "Se afla pe muntele Coza din", "apropiere, totusi nu o sa", "ajungeti usor acolo. aveti grija.");
						break;
					}
					case 9: {
						draw_dialogue(t, scene_sub, 40, "Alex si Stefan", "Multumim! plecam de in data.", "Treceti vodcile pe datorie.");
						break;
					}
					case 10: {
						return chapter_one_two(0);
						break;
					}
				}
			});
			break;
		}
	}
}