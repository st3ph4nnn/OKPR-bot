#pragma once
#include "../../raylib/raylib.hpp"
#include "retro.hpp"
#include "guifont.hpp"

#include "../../main.hpp"

#include <stdio.h>

namespace fonts {
    Font retro, gui;

    void init() {
        retro = LoadFontFromMemory(".ttf", retrottf, sizeof(retrottf), 600, NULL, 0);
        gui = LoadFontFromMemory(".ttf", guittf, sizeof(guittf), 600, NULL, 0);
    }

    void close() {
        UnloadFont(retro);
        UnloadFont(gui);
    }
}