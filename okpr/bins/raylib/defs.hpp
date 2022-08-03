#pragma once
#include "raylib.hpp"

#include "../media/fonts/fonts.hpp"

Color color(int r, int g, int b, int a = 255) {
    return CLITERAL(Color){(unsigned char)r, (unsigned char)g, (unsigned char)b, (unsigned char)a};
}

int measure_text_width(std::string txt, int size, Font font = fonts::retro, int spacing = 3) {
    return (int)MeasureTextEx(font, txt.c_str(), size, spacing).x;
}

int measure_text_height(std::string txt, int size, Font font = fonts::gui, int spacing = 2) {
    return MeasureTextEx(font, txt.c_str(), size, 2).y;
}

namespace draw {
    void draw_text(std::string txt, Vector2 pos, int font_size, Color col, bool drop_shadow = false) {
        if (drop_shadow)
            DrawText(txt.c_str(), pos.x + 2, pos.y + 2, font_size, ((col.r == 0 && col.g == 0 && col.b == 0) ? ColorAlpha(BLACK, 0.5f) : BLACK));

        DrawText(txt.c_str(), pos.x, pos.y, font_size, col);
    }

    void draw_text_ex(std::string txt, Font font, Vector2 pos, int font_size, Color col, bool drop_shadow = false, int spacing = 3) {
        if (drop_shadow)
            DrawTextEx(font, txt.c_str(), (Vector2){pos.x + 3, pos.y + 3}, font_size, spacing, ((col.r == 0 && col.g == 0 && col.b == 0) ? ColorAlpha(BLACK, 0.5f) : BLACK));

        DrawTextEx(font, txt.c_str(), pos, font_size, spacing, col);
    }

    void draw_rect(Rectangle bounds, Color col) {
        DrawRectangle(bounds.x, bounds.y, bounds.width, bounds.height, col);
    }

    void draw_rect_lines(Rectangle bounds, Color col) {
        DrawRectangleLines(bounds.x, bounds.y, bounds.width, bounds.height, col);
    }

    void draw_line(Vector2 start, Vector2 end, Color col) {
        DrawLine(start.x, start.y, end.x, end.y, col);
    }

    void draw_character(Texture2D texture, Vector2 pos, int scale) {
        DrawTexturePro(texture, (Rectangle){0, 0, 128, 128}, (Rectangle){pos.x, pos.y, 128 * scale, 128 * scale}, (Vector2){0, 0}, 0, WHITE);
    }
    void draw_character_reversed(Texture2D texture, Vector2 pos, int scale) {
        DrawTexturePro(texture, (Rectangle){0, 0, -128, 128}, (Rectangle){pos.x, pos.y, 128 * scale, 128 * scale}, (Vector2){0, 0}, 0, WHITE);
    }
}

template <typename T>
Vector2 vec(T x, T y) {
    return (Vector2){x, y};
}

template <typename T>
Vector3 vec(T x, T y, T z) {
    return (Vector3){x, y, z};
}

template <typename T>
Rectangle rect(T x, T y, T w, T h) {
    return (Rectangle){x, y, w, h};
}