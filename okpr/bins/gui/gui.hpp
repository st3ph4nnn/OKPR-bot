#pragma once

#include <string>

#include "../media/sfx/sfx.hpp"
#include "../media/fonts/fonts.hpp"

#include "../raylib/raylib.hpp"

#include "../../main.hpp"

enum states {
    IDLE = 100,
    INPUT = 101,

    MAIN_MENU = 0,
    OPTIONS = 1,
    IN_GAME = 2
};

enum fade {
    NONE = 0,
    FADE_OUT = 1,
    FADE_IN = 2
};

class scene_manager {
public:
    int state = 100;

    raylib &window;
    RenderTexture2D texture;
    Shader shader;

    scene_manager(raylib &window) : window(window) {
        GuiSetIconScale(3);
        texture = LoadRenderTexture(1366, 768);
        GuiLoadStyle("./resources/style.rgs");

        GuiSetFont(fonts::gui);
        GuiSetStyle(DEFAULT, TEXT_SIZE, gui_size);
    }

    void set_state(states state) {
        this->state = state;
    }

    void restore_state() {
        this->state = IDLE;
    }

    template <typename T>
    void draw(states state_change, Color background, fade fade_type, T lambda) {
        float fade = 2.0f;
        if (fade_type != fade::NONE) {
            if (fade_type == fade::FADE_OUT) {
                fade = 1.0f;
                std::thread([&fade]() {
                    do {
                        fade -= 0.01f;
                        std::this_thread::sleep_for(std::chrono::milliseconds(3));
                    } while (fade > 0.0f);
                    fade = 0.0f;
                }).detach();
            } else {
                fade = 0.0f;
                std::thread([&fade]() {
                    do {
                        fade += 0.01f;
                        std::this_thread::sleep_for(std::chrono::milliseconds(3));
                    } while (fade < 1.0f);
                    fade = 1.0f;
                }).detach();
            }
        }

        SetMouseScale(1366.0f / GetScreenWidth(), 768.0f / GetScreenHeight());

        while (!WindowShouldClose()) {
            BeginDrawing();

            if (this->state != state_change) {
                this->state = state_change;
                EndDrawing();
                continue;
            }

            BeginTextureMode(texture);
            ClearBackground(background);

            lambda();
            if (fade != 2.0f)
                DrawRectangle(0, 0, 1366, 768, ColorAlpha(background, fade));
            
            EndTextureMode();

            ClearBackground(background);

            DrawTexturePro(texture.texture, (Rectangle){0, 0, 1366.0f, -768.0f}, (Rectangle){0, 0, GetScreenWidth(), GetScreenHeight()}, (Vector2){0, 0}, 0.f, WHITE);

            EndDrawing();
        }

        window.close_window();
    }

    template <typename T>
    void set_state(states state, T lambda) {
        this->state = state;
        lambda();
        state = IDLE;
    }

    template <typename T>
    void set_size(int sz, T lambda) {
        int temp = GuiGetStyle(DEFAULT, TEXT_SIZE);
        GuiSetStyle(DEFAULT, TEXT_SIZE, sz);
        lambda();
        GuiSetStyle(DEFAULT, TEXT_SIZE, temp);
    }

    void set_size(int size) {
        GuiSetStyle(DEFAULT, TEXT_SIZE, size);
    }

    template <typename T>
    void set_font(Font &fnt, T lambda) {
        Font tmp = GuiGetFont();
        GuiSetFont(fnt);
        lambda();
        GuiSetFont(tmp);
    }

    template <typename T>
    void set_default_font(Font fnt, T lambda) {
        GuiSetFont(GetFontDefault());
        lambda();
        GuiSetFont(fnt);
    }

    template <typename T>
    void disable(T lambda) {
        GuiDisable();
        lambda();
        GuiEnable();
    }

    void label(Rectangle bounds, std::string txt) {
        GuiLabel(bounds, txt.c_str());
    }

    template <typename T>
    void button(Rectangle bounds, std::string txt, T lambda, bool drop_shadow = false) {
        if (drop_shadow)
            draw::draw_rect((Rectangle){bounds.x + 4, bounds.y + 4, bounds.width, bounds.height}, ColorAlpha(BLACK, 0.25));

        if (GuiButton(bounds, txt.c_str())) {
            PlaySound(sfx::button);
            lambda();
        }
    }

    void button(Rectangle bounds, std::string txt, void (*f)(), bool drop_shadow = false) {
        if (drop_shadow)
            draw::draw_rect((Rectangle){bounds.x + 4, bounds.y + 4, bounds.width, bounds.height}, ColorAlpha(BLACK, 0.25));

        if (GuiButton(bounds, txt.c_str())) {
            PlaySound(sfx::button);
            f();
        }
    }

    void labelbutton(Rectangle bounds, std::string txt, void (*f)()) {
        if (GuiLabelButton(bounds, txt.c_str())) {
            PlaySound(sfx::button);
            f();
        }
    }

    template <typename T>
    void labelbutton(Rectangle bounds, std::string txt, T lambda) {
        if (GuiLabelButton(bounds, txt.c_str())) {
            PlaySound(sfx::button);
            lambda();
        }
    }

    template <typename T>
    void slider(Rectangle bounds, T &val, T min_val, T max_val) {
        val = GuiSliderBar(bounds, "", "", (float)val, min_val, max_val);
    }

    template <typename T>
    void slider(Rectangle bounds, std::string left, std::string right, T &val, T min_val, T max_val) {
        val = GuiSliderBar(bounds, left.c_str(), right.c_str(), (float)val, min_val, max_val);
    }

    void dropdown(Rectangle bounds, std::string txt, int *active, bool &editMode) {
        bool clicked = GuiDropdownBox(bounds, txt.c_str(), active, editMode);
        if (clicked)
            editMode = !editMode;
    }

    void checkbox(Rectangle bounds, std::string txt, bool &checked) {
        if (GuiCheckBox(bounds, txt.c_str(), checked))
            checked = !checked;
    }
};