#pragma once

#include "utils.hpp"

auto now = std::chrono::system_clock::now().time_since_epoch();
std::mt19937 mersenne{static_cast<std::mt19937::result_type>(std::chrono::duration_cast<std::chrono::nanoseconds>(now).count())};

template <typename T>
T utils::math::random(T a, T b) {
    std::uniform_int_distribution<> rng{a, b};
    return rng(mersenne);
}

template <typename T>
void utils::math::arithmetic(std::vector<T> vec) {
    double mean = 0;
    for (auto i : vec)
        mean += i;
    return mean / vec.size();
}