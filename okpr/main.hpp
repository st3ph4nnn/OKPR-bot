#pragma once

#include "utilities/utils.hpp"
#include <functional>

namespace globals {
	int width = 1366;
	int height = 768;

	int gui_size = 60;
	float volume = 0.5f;

	namespace stats {
		safe euro(20);
		safe hp(100);
	}

	namespace other {
		bool ajutat_minion = false;
	}
}

using namespace globals;