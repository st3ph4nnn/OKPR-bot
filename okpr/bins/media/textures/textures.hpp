#pragma once

#include "../../raylib/raylib.hpp"

namespace textures {
	Texture2D main_menu_background, options_background;

	namespace caractere {
		Texture2D stefan, alex, ortho, minion, nebunu_weed;
	}

	namespace fundaluri {
		Texture2D centru_galati, fata_bar, in_bar, oras_intunecat, fata_bar_mihail, alee_galati, alee_galati_2, casa_nebunului_weed;
	}

	void init() {
		main_menu_background = LoadTextureFromImage(LoadImage("./resources/main_menu_background.png"));
		options_background = LoadTextureFromImage(LoadImage("./resources/options_background.png"));

		caractere::stefan = LoadTextureFromImage(LoadImage("./resources/caractere/stefan.png"));
		caractere::alex = LoadTextureFromImage(LoadImage("./resources/caractere/alex.png"));
		caractere::ortho = LoadTextureFromImage(LoadImage("./resources/caractere/ortho.png"));
		caractere::minion = LoadTextureFromImage(LoadImage("./resources/caractere/minion.png"));
		caractere::nebunu_weed = LoadTextureFromImage(LoadImage("./resources/caractere/nebunu_weed.png"));

		fundaluri::centru_galati = LoadTextureFromImage(LoadImage("./resources/fundaluri/centru_galati.png"));
		fundaluri::fata_bar = LoadTextureFromImage(LoadImage("./resources/fundaluri/fata_bar.png"));
		fundaluri::in_bar = LoadTextureFromImage(LoadImage("./resources/fundaluri/in_bar.png"));
		fundaluri::oras_intunecat = LoadTextureFromImage(LoadImage("./resources/fundaluri/oras_intunecat.png"));
		fundaluri::fata_bar_mihail = LoadTextureFromImage(LoadImage("./resources/fundaluri/fata_bar_mihail.png"));
		fundaluri::alee_galati = LoadTextureFromImage(LoadImage("./resources/fundaluri/alee_galati.png"));
		fundaluri::alee_galati_2 = LoadTextureFromImage(LoadImage("./resources/fundaluri/alee_galati_2.png"));
		fundaluri::casa_nebunului_weed = LoadTextureFromImage(LoadImage("./resources/fundaluri/casa_nebunului_weed.png"));
	}

	void close() {
		UnloadTexture(main_menu_background);
		UnloadTexture(options_background);

		UnloadTexture(caractere::stefan);
		UnloadTexture(caractere::alex);
		UnloadTexture(caractere::ortho);
		UnloadTexture(caractere::minion);
		UnloadTexture(caractere::nebunu_weed);

		UnloadTexture(fundaluri::centru_galati);
		UnloadTexture(fundaluri::fata_bar);
		UnloadTexture(fundaluri::in_bar);
		UnloadTexture(fundaluri::oras_intunecat);
		UnloadTexture(fundaluri::fata_bar_mihail);
		UnloadTexture(fundaluri::alee_galati);
		UnloadTexture(fundaluri::alee_galati_2);
		UnloadTexture(fundaluri::casa_nebunului_weed);
	}
}