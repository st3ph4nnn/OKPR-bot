#pragma once

#include "scenes.hpp"

void scenes::main_menu() {
	text_popup t;
	choose x;
	manager.draw(states::MAIN_MENU, BLACK, fade::FADE_OUT, [&](){
		DrawTexturePro(textures::main_menu_background, rect(0, 0, 650, 300), rect(0, 0, 1366, 768), vec(0, 0), 0, WHITE);
		draw::draw_text_ex("OKPR: DISPARITIA LUI ORTHO", fonts::retro, vec(width / 2 - measure_text_width("OKPR: DISPARITIA LUI ORTHO", 70) / 2, 120), 70, YELLOW, true);
		draw::draw_text_ex("OKPR Game Studios Inc. Corp. Ltd. (copyright @ 2022)", fonts::retro, vec(width / 2 - measure_text_width("OKPR Game Studios Inc. Corp. Ltd. (copyright @ 2022)", 25) / 2, 180), 25, WHITE, true);

		manager.set_size(90, [&](){
			manager.button(rect(width / 2 - 150, height - 350, 300, 75), "play", [&](){
				this->chapter_one_third(1);
			});

			manager.button(rect(width / 2 - 150, height - 245 - measure_text_height("options", 90) / 12, 300, 75), "options", [&](){
				manager.set_size(gui_size);
				this->options();
			});

			manager.button(rect(width / 2 - 150, height - 150, 300, 75), "quit", [&](){
				window.close_window();
			});
		});

		t.draw_popup();
	});
}