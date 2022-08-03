#include "scenes/scenes.hpp"

int main() {
	raylib window("okpr", globals::width, globals::height, FLAG_MSAA_4X_HINT | FLAG_VSYNC_HINT | FLAG_WINDOW_MAXIMIZED);

	sfx::init();
	fonts::init();
	textures::init();

	scene_manager manager(window);
	scenes scene(window, manager);

	scene.main_menu();

	return 0;
}