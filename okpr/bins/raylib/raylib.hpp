#pragma once

#include <string>
#include <thread>

#include "../../libs/include/raylib.h"
#define RAYGUI_IMPLEMENTATION
#include "../../libs/include/raygui.h"

#include "../media/fonts/fonts.hpp"
#include "../media/sfx/sfx.hpp"
#include "../media/textures/textures.hpp"

class raylib {
public:
    raylib(std::string title, int &width, int &height, unsigned int FLAGS) {
        SetTraceLogLevel(LOG_ERROR);
        SetConfigFlags(FLAGS);
        InitWindow(0, 0, title.c_str());
        SetExitKey(KEY_NULL);
        SetTargetFPS(60);
    }

    bool close;

    void update() {
        do {
            close = WindowShouldClose();
            if (close) break;

            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        } while (!close);

        close_window();
    }

    void close_window() {
        sfx::close();
        fonts::close();
        textures::close();
        CloseWindow();
    }
};

#include "defs.hpp"