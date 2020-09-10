import React, { useState } from "react";

import SearchBar from "./SearchBar";
import SearchIcon from "./icons/SearchIcon";
import CloseIcon from "./icons/CloseIcon";
import HeartIcon from "./icons/HeartIcon";

export default function Header({ clearAll, getQuery, switchToFavourites }) {
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

				<div className="md:hidden flex flex-row items-center">
					<button className="block mr-2" onClick={handleClick} type="button">
						{!isOpen ? <SearchIcon classes="w-6 h-6"></SearchIcon> : <CloseIcon classes="w-6 h-6"></CloseIcon>}
					</button>
					<button onClick={switchToFavourites} className="block">
						<HeartIcon classes="w-8 h-8 fill-white"></HeartIcon>
					</button>
				</div>
			</div>

			<div className="flex flex-row items-center">
				<div className={"w-full md:block md:mr-4 " + (isOpen ? "block" : "hidden")}>
					<SearchBar getQuery={getQuery}></SearchBar>
				</div>
				<button onClick={switchToFavourites} className="hidden md:block">
					<HeartIcon classes="w-8 h-8 fill-white"></HeartIcon>
				</button>
			</div>
		</header>
	);
}
