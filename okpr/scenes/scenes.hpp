#pragma once

#include "../bins/raylib/raylib.hpp"
#include "../bins/gui/gui.hpp"

#include "../main.hpp"

#include "../bins/media/fonts/fonts.hpp"
#include "../bins/media/sfx/sfx.hpp"
#include "../bins/media/textures/textures.hpp"

class scenes {
public:
	int chapter = 0;
	
	raylib &window;
	scene_manager &manager;

	scenes(raylib &wind, scene_manager &manag) : window(wind), manager(manag) {}
	~scenes() {};

	void main_menu();
	void options();


	// CHAPTER ONE

	void chapter_one_intro(int scene);
	void chapter_one_two(int scene);
	void chapter_one_third(int scene);
};

#include "utilities/dialogue.hpp"

void draw_dialogue(text_popup &t, int &nr, int sz = 40, std::string nm = "", std::string ln1 = "", std::string ln2 = "", std::string ln3 = "") {
	if (t.nume == "")
		t.set(nm, ln1, ln2, ln3);

	t.setsz(sz);

	if (!t.draw_popup()) { PlaySound(sfx::button); nr++; }
}

void ask(choose &t, int one, int two, int three, std::function<void(int)> func, int sz = 40, std::string nm = "", std::string ln1 = "", std::string ln2 = "", std::string ln3 = "", std::string c1 = "", std::string c2 = "", std::string c3 = "") {
	if (t.nume == "")
		t.set(nm, ln1, ln2, ln3, c1, c2, c3);

	t.setsz(sz);

	int n = t.draw_popup();

	if (n != 0) {
		switch (n) {
			case 1: {
				func(one);
				break;
			}
			case 2: {
				func(two);
				break;
			}
			case 3: {
				func(three);
				break;
			}
		}
	}
}


#include "main_menu.hpp"
#include "options.hpp"

#include "chapters/chapter_one/intro.hpp"
#include "chapters/chapter_one/two.hpp"
#include "chapters/chapter_one/third.hpp"
