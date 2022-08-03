#pragma once
#include "../../bins/raylib/raylib.hpp"

#include "../../bins/media/sfx/sfx.hpp"

#include "../../main.hpp"

class text_popup {
public:
	std::string nume = "", line1 = "", line2 = "", line3 = "";
	bool stop = false;
	int sz = 40;

	std::string ch1, ch2, ch3;

	int nr_lini = 0;

	void setsz(int size) {
		sz = size;
	}

	void set(std::string nm, std::string ln1 = "", std::string ln2 = "", std::string ln3 = "") {
		stop = false;
		nume = nm;
		line1 = ln1;
		line2 = ln2;
		line3 = ln3;
		ch1 = "";
		ch2 = "";
		ch3 = "";
		sz = 40;
		nr_lini = 0;
	}

	bool draw_popup() {
		if (stop || nume == "") {
			this->set("");
			return false;
		}

		if (!stop) {
			draw::draw_rect(rect(width / 2 - (width / 4), height - 250, width / 2, 180), color(48, 48, 48, 200));
			draw::draw_rect_lines(rect(width / 2 - (width / 4), height - 250, width / 2, 180), BLACK);

			int x = width/2-(width/4);
			int y = height-250;

			if (nume.find(" ") != std::string::npos)
				draw::draw_text(nume + " spun:", vec(x, y - 35), 30, WHITE, true);
			else
				draw::draw_text(nume + " spune:", vec(x, y - 35), 30, WHITE, true);

			if (nr_lini == 0) {
				if (line1 != "")
					nr_lini++;

				if (line2 != "")
					nr_lini++;

				if (line3 != "")
					nr_lini++;
			}

			switch (nr_lini) {
				case 1: {
					if (line1 != "") {
						ch1 += line1[0];
						line1.erase(0, 1);
						draw::draw_text(ch1, vec(x + 20, y + 90 - (measure_text_height(ch1, sz) / 2)), sz, WHITE, true);
						std::this_thread::sleep_for(std::chrono::milliseconds(35));
						return true;
					} 
					draw::draw_text(ch1, vec(x + 20, y + 90 - (measure_text_height(ch1, sz) / 2)), sz, WHITE, true);

					draw::draw_text("[SPACE]", vec(x + width / 2 - MeasureText("[SPACE]", 30) - 20, y - 20), 30, WHITE, true);

					if (IsKeyPressed(KEY_SPACE)) 
						stop = true;

					break;
				}
				case 2: {
					if (line1 != "") {
						ch1 += line1[0];
						line1.erase(0, 1);
						draw::draw_text(ch1, vec(x + 20, y + 55 - (measure_text_height(ch1, sz) / 2)), sz, WHITE, true);
						std::this_thread::sleep_for(std::chrono::milliseconds(35));
						return true;
					}
					draw::draw_text(ch1, vec(x + 20, y + 55 - (measure_text_height(ch1, sz) / 2)), sz, WHITE, true);

					if (line2 != "") {
						ch2 += line2[0];
						line2.erase(0, 1);
						draw::draw_text(ch2, vec(x + 20, y + 125 - (measure_text_height(ch2, sz) / 2)), sz, WHITE, true);
						std::this_thread::sleep_for(std::chrono::milliseconds(35));
						return true;
					}
					draw::draw_text(ch2, vec(x + 20, y + 125 - (measure_text_height(ch2, sz) / 2)), sz, WHITE, true);

					draw::draw_text("[SPACE]", vec(x + width / 2 - MeasureText("[SPACE]", 30) - 20, y - 20), 30, WHITE, true);
					if (IsKeyPressed(KEY_SPACE))
						stop = true;

					break;
				}
				case 3: {
					if (line1 != "") {
						ch1 += line1[0];
						line1.erase(0, 1);
						draw::draw_text(ch1, vec(x + 20, y + 40 - (measure_text_height(ch1, sz) / 2)), sz, WHITE, true);
						std::this_thread::sleep_for(std::chrono::milliseconds(35));
						return true;
					}

					draw::draw_text(ch1, vec(x + 20, y + 40 - (measure_text_height(ch1, sz) / 2)), sz, WHITE, true);
					
					if (line2 != "") {
						ch2 += line2[0];
						line2.erase(0, 1);
						draw::draw_text(ch2, vec(x + 20, y + 90 - (measure_text_height(ch2, sz) / 2)), sz, WHITE, true);
						std::this_thread::sleep_for(std::chrono::milliseconds(35));
						return true;
					}
					draw::draw_text(ch2, vec(x + 20, y + 90 - (measure_text_height(ch2, sz) / 2)), sz, WHITE, true);

					if (line3 != "") {
						ch3 += line3[0];
						line3.erase(0, 1);
						draw::draw_text(ch3, vec(x + 20, y + 140 - (measure_text_height(ch3, sz) / 2)), sz, WHITE, true);
					   std::this_thread::sleep_for(std::chrono::milliseconds(35));
						return true;
					}

					draw::draw_text(ch3, vec(x + 20, y + 140 - (measure_text_height(ch3, sz) / 2)), sz, WHITE, true);

					draw::draw_text("[SPACE]", vec(x + width / 2 - MeasureText("[SPACE]", 30) - 20, y - 20), 30, WHITE, true);

					if (IsKeyPressed(KEY_SPACE))
						stop = true;
	
					break;
				}
			}
			return true;
		}
	}
};

class choose {
public:
	std::string nume = "", line1 = "", line2 = "", line3 = "", conse1 = "", conse2 = "", conse3 = "";
	
	bool stop = false;
	int sz = 40;

	bool ales = false;
	int nr_ales = 0;

	std::string consecinta;

	void setsz(int size) {
		sz = size;
	}

	void set(std::string nm, std::string ln1 = "", std::string ln2 = "", std::string ln3 = "", std::string cons1 = "", std::string cons2 = "", std::string cons3 = "") {
		stop = false;
		ales = false;
		nr_ales = 0;
		nume = nm;
		line1 = ln1;
		line2 = ln2;
		line3 = ln3;
		conse1 = cons1;
		conse2 = cons2;
		conse3 = cons3;
	}

	int draw_popup() {
		if (line1 == ".")
			return nr_ales;

		if (line1 == "")
			return 0;

		if (!stop) {
			draw::draw_rect(rect(width / 2 - (width / 4), height - 250, width / 2, 180), color(48, 48, 48, 200));
			draw::draw_rect_lines(rect(width / 2 - (width / 4), height - 250, width / 2, 180), BLACK);
			int x = width/2-(width/4);
			int y = height-250;

			draw::draw_text(ales ? (nume + " a ales " + std::to_string(nr_ales) + ".") : (nume + " trebuie sa aleaga:") , vec(x, y - 35), 30, WHITE, true);

			if (nr_ales != 0) {
				switch (nr_ales) {
					case 1: {
						consecinta = line1;
						draw::draw_text(line1, vec(x + 20, y + 90 - (measure_text_height(line1, sz) / 2)), sz, WHITE, true);
						break;
					}
					case 2: {
						consecinta = line2;
						draw::draw_text(line2, vec(x + 20, y + 90 - (measure_text_height(line2, sz) / 2)), sz, WHITE, true);
						break;
					}
					case 3: {
						consecinta = line3;
						draw::draw_text(line3, vec(x + 20, y + 90 - (measure_text_height(line3, sz) / 2)), sz, WHITE, true);
						break;
					}
				}
				
				draw::draw_text("[SPACE]", vec(x + width / 2 - MeasureText("[SPACE]", 30) - 20, y - 20), 30, WHITE, true);

				if (IsKeyPressed(KEY_SPACE))
					stop = true;

			} else {
				draw::draw_text("1. " + line1, vec(x + 20, y + 40 - (measure_text_height("1. " + line1, sz) / 2)), sz, WHITE, true);
				draw::draw_text("2. " + line2, vec(x + 20, y + 90 - (measure_text_height("2. " + line2, sz) / 2)), sz, WHITE, true);
				draw::draw_text("3. " + line3, vec(x + 20, y + 140 - (measure_text_height("3. " + line3, sz) / 2)), sz, WHITE, true);
			}

			switch (GetKeyPressed()) {
				case KEY_ONE: {
					this->set(nume, conse1, conse2, conse3);
					nr_ales = 1;
					ales = true;
					break;
				}
				case KEY_TWO: {
					this->set(nume, conse1, conse2, conse3);
					nr_ales = 2;
					ales = true;
					break;
				}
				case KEY_THREE: {
					this->set(nume, conse1, conse2, conse3);
					nr_ales = 3;
					ales = true;
					break;
				}
			}

			return 0;
		} else {
			line1 = ".";
			return nr_ales;
		}
	}
};