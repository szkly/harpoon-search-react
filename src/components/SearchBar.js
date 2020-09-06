import React, { useState, useEffect } from "react";

import SearchIcon from "./SearchIcon";
import SearchHistory from "./SearchHistory";

export default function SearchBar({ getQuery }) {
	const [query, setQuery] = useState("");
	const [searchHistory, setSearchHistory] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const searchHistoryStorage = localStorage.getItem("searchHistory") ? JSON.parse(localStorage.getItem("searchHistory")) : [];

		setSearchHistory(searchHistoryStorage);
	}, []);

	const handleSubmit = () => {
		if (!searchHistory.includes(query) && query !== "") {
			setSearchHistory((items) => [...items, query]);
			const newSearchHistory = [...searchHistory, query];
			localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
		}

		getQuery(query);
	};

	const handleRetrievingQuery = (newQuery) => {
		setQuery(newQuery);
		getQuery(newQuery);
	};

	const handleDeletingItem = (item) => {
		const newSearchHistory = searchHistory.length === 1 ? [] : searchHistory.filter((currItem) => currItem !== item);
		localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
		setSearchHistory(newSearchHistory);
	};

	const handleClearAll = () => {
		setSearchHistory([]);
		setQuery("");
		localStorage.setItem("searchHistory", JSON.stringify([]));
	};

	return (
		<div className="w-full md:w-auto relative">
			<input
				className="w-full md:w-auto h-10 pl-4 pr-8 bg-indigo-700 text-base rounded-lg focus:outline-none focus:placeholder-transparent"
				type="text"
				placeholder="Query"
				value={query}
				onChange={(evt) => setQuery(evt.target.value)}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			></input>
			<button type="submit" className="text-white absolute top-0 right-0 mt-2 mr-2" onClick={handleSubmit}>
				<SearchIcon classes="w-6 h-6"></SearchIcon>
			</button>
			{isOpen && searchHistory.length > 0 && (
				<SearchHistory
					history={searchHistory}
					retrieveQuery={(newQuery) => handleRetrievingQuery(newQuery)}
					deleteItem={(item) => handleDeletingItem(item)}
					clearAll={handleClearAll}
				></SearchHistory>
			)}
		</div>
	);
}
