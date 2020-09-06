import React, { useState } from "react";

import SearchBar from "./SearchBar";
import SearchIcon from "./SearchIcon";
import CloseIcon from "./CloseIcon";

export default function Header({ clearAll, getQuery }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		setIsOpen((currentOpen) => !currentOpen);
	};

	return (
		<header className="w-full flex flex-col md:flex-row md:justify-between md:items-center px-8 py-4 bg-indigo-800 text-white">
			<div className={"flex justify-between items-center md:mb-0 " + (isOpen ? "mb-4" : "")}>
				<div>
					<button onClick={clearAll} className="block text-lg sm:text-xl md:text-2xl font-semibold">
						Harpoon Search
					</button>
				</div>

				<div className="md:hidden">
					<button className="block" onClick={handleClick} type="button">
						{!isOpen ? <SearchIcon classes="w-6 h-6"></SearchIcon> : <CloseIcon classes="w-6 h-6"></CloseIcon>}
					</button>
				</div>
			</div>

			<div className={"md:block " + (isOpen ? "block" : "hidden")}>
				<SearchBar getQuery={getQuery}></SearchBar>
			</div>
		</header>
	);
}
