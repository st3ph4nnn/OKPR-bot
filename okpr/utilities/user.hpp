#pragma once

#include "../independencies.hpp"

std::string user_name() {
    std::string user = getenv((globals::linux_user ? "USER" : "USERNAME"));
    return user;
}

std::string hid() {
    unsigned int cpuinfo[4] = {0, 0, 0, 0};
    __asm __volatile("movl %%ebx, %%esi\n\t"
                     "cpuid\n\t"
                     "xchgl %%ebx, %%esi"
                     : "=a"(cpuinfo[0]), "=S"(cpuinfo[1]),
                       "=c"(cpuinfo[2]), "=d"(cpuinfo[3])
                     : "0"(0));

    unsigned short hash = 0;
    unsigned int *ptr = (&cpuinfo[0]);
    for (unsigned int i = 0; i < 4; i++)
        hash += (ptr[i] & 0xFFFF) + (ptr[i] >> 16);

    return std::to_string(hash);
}

std::string home_dir() {
#ifdef __WIN32__
    _mkdir("C://ProgramData//schizo");
    return "C://ProgramData//schizo//";
#else
    const char *homeDir = getenv("HOME");
    mkdir((std::string(homeDir) + "/.config/schizo/").c_str(), 0733);
    return std::string(homeDir) + "/.config/schizo/";
#endif
}