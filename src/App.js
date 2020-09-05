import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Spinner from "./components/Spinner";
import AdCard from "./components/AdCard";

function App() {
	const BASE_URL = "https://api.harpoon.hu/search/ads";

	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [ads, setAds] = useState([]);

	const clearAll = () => {
		setQuery("");
		setAds([]);
	};

	useEffect(() => {
		if (query !== "") {
			setAds([]);
			setLoading(true);
			fetch(`${BASE_URL}?keyword=${query}`)
				.then((res) => res.json())
				.then((adsJson) => {
					setLoading(false);
					setAds(adsJson);
				})
				.catch((err) => console.error(err));
		}
	}, [query]);

	return (
		<div className="antialiased min-h-screen max-h-full flex flex-col items-center bg-gray-300 dark:bg-gray-900 dark:text-white transition-colors duration-300">
			<Header clearAll={clearAll} getQuery={(newQuery) => setQuery(newQuery)}></Header>
			{loading && <Spinner></Spinner>}
			{ads.length > 0 &&
				ads.map((ad, i) => {
					return <AdCard key={i} ad={ad}></AdCard>;
				})}
		</div>
	);
}

export default App;
