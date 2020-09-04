import React from "react";

import SearchBar from "./SearchBar";

export default function Header({ clearAll, getQuery }) {
	return (
		<header className="w-full flex justify-between items-center px-8 py-4 bg-indigo-800 text-white">
			<button onClick={clearAll} className="block text-lg sm:text-xl md:text-2xl font-semibold">Harpoon <span className="hidden sm:inline">Search</span></button>
			<SearchBar getQuery={getQuery}></SearchBar>
		</header>
	);
}
