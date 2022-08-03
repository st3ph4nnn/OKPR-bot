#pragma once

#include <chrono>
#include <fstream>
#include <random>
#include <stdio.h>
#include <vector>

namespace utils {
    namespace math {
        template <typename T>
        T random(T a, T b);

        template <typename T>
        T arithmetic(std::vector<T> vec);
    }

    namespace misc {
        std::string get_formatted(std::string str) {
            if (str.size() > 3)
                for (int i = str.size() - 3; i > 0; i -= 3)
                    str.insert(i, 1, '.');

            return str;
        }
    }

    namespace files {
        bool exists(std::string name) {
            std::ifstream f(name.c_str());
            return f.good();
        }
    }
}

#include "math.hpp"

template <typename T>
struct safe {
    T fake_value;
    T fake_value_offset;

    safe(T val) {
        fake_value_offset = utils::math::random(-2000, 2000);
        fake_value = val - fake_value_offset;
    }

    T get_value() {
        return fake_value_offset + fake_value;
    }

    safe operator++(int) {
        fake_value++;
    }

    safe &operator+=(T value) {
        fake_value += value;
    }

    safe operator--(int) {
        fake_value--;
    }

    safe &operator-=(T value) {
        fake_value -= value;
    }

    safe &operator=(T value) {
        *this = safe(value);
    }
};
