#pragma once

#include <sstream>
#include <iomanip>

#include "scenes.hpp"

void scenes::options() {
	text_popup t;

	manager.draw(states::OPTIONS, BLACK, fade::FADE_OUT, [&](){
		DrawTexturePro(textures::options_background, rect(0, 0, 650, 300), rect(0, 0, 1366, 768), vec(0, 0), 0, WHITE);
		draw::draw_text_ex("OPTIONS", fonts::retro, vec(width / 2 - MeasureText("OPTIONS", 120) / 2, 50), 120, WHITE, true);

		manager.button(rect(width / 2 - 200, height - 500, 400, 75), "toggle fullscreen", [&](){
			ToggleFullscreen();
		});

		std::stringstream str;
        str << std::fixed << std::setprecision(0) << volume*100 << "%";

		manager.slider(rect(width / 2 - 150, 395, 300, 15), "", str.str(), volume, 0.0f, 1.0f);
        manager.label(rect(width / 2 - 210, 382, 10, 10), std::string(GuiIconText(122, "")));

		manager.button(rect(width / 2 - 150, height - 200, 300, 75), "back", [&](){
			SetMasterVolume(volume);
			this->main_menu();
		});
	});
}