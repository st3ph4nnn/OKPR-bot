#pragma once
#include "../../../libs/include/raylib.h"
#include "button.hpp"
#include "lost.hpp"
#include "spin.hpp"
#include "win.hpp"
#include "startup.hpp"
#include "click.hpp"

namespace sfx {
    Sound won, lost, button, spin, startup, click;

    void init() {
        InitAudioDevice();
        won = LoadSoundFromWave(LoadWaveFromMemory(".wav", winsfx, sizeof(winsfx)));
        lost = LoadSoundFromWave(LoadWaveFromMemory(".wav", lostsfx, sizeof(lostsfx)));
        button = LoadSoundFromWave(LoadWaveFromMemory(".wav", buttonsfx, sizeof(buttonsfx)));
        spin = LoadSoundFromWave(LoadWaveFromMemory(".wav", spinsfx, sizeof(spinsfx)));
        startup = LoadSoundFromWave(LoadWaveFromMemory(".wav", startupsfx, sizeof(startupsfx)));
        click = LoadSoundFromWave(LoadWaveFromMemory(".wav", click_wav, sizeof(click_wav)));

        SetMasterVolume(0.5f);
    }

    void close() {
        UnloadSound(won);
        UnloadSound(lost);
        UnloadSound(button);
        UnloadSound(spin);
        UnloadSound(startup);
        UnloadSound(click);
        CloseAudioDevice();
    }
}