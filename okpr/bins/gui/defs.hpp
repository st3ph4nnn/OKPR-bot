#pragma once

#include "gui.hpp"

template <typename T>
void scene_manager::button(Rectangle bounds, std::string txt, T lambda, bool drop_shadow = false) {
    if (drop_shadow)
        draw::draw_rect((Rectangle){bounds.x + 4, bounds.y + 4, bounds.width, bounds.height}, ColorAlpha(BLACK, 0.5));

    if (GuiButton(bounds, txt.c_str()))
        lambda();
}

template <typename T>
void scene_manager::labelbutton(Rectangle bounds, std::string txt, T lambda, bool drop_shadow = false) {
    if (drop_shadow)
        draw::draw_text(txt, vec(bounds.x + 4, bounds.y + 4), 60, ColorAlpha(BLACK, 0.5));

    if (GuiLabelButton(bounds, txt.c_str()))
        lambda();
}

template <typename T>
void scene_manager::set_size(int size, T lambda) {
    int temp = GuiGetStyle(DEFAULT, TEXT_SIZE);
    GuiSetStyle(DEFAULT, TEXT_SIZE, size);
    lambda();
    GuiSetStyle(DEFAULT, TEXT_SIZE, temp);
}

template <typename T>
void scene_manager::set_state(states state, T lambda) {
    this->state = state;
    lambda();
    state = IDLE;
}

template <typename T>
void scene_manager::draw(states state_change, Color background, T lambda) {
    while (!WindowShouldClose()) {
        BeginDrawing();
        if (this->state != state_change) {
            this->state = state_change;
            EndDrawing();
            continue;
        }

        ClearBackground(background);
        lambda();
        EndDrawing();
    }

    window.close_window();
}