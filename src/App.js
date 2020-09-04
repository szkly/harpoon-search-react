import React, { useState, useEffect } from "react";

import Header from "./components/Header";
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
		<div className="antialiased min-h-screen max-h-full flex flex-col items-center bg-gray-300 dark:bg-gray-700 dark:text-white transition-all duration-300">
			<Header clearAll={clearAll} getQuery={(newQuery) => setQuery(newQuery)}></Header>
			{loading && <h1 className="text-2xl mt-auto mb-auto">Loading...</h1>}
			{ads.map((ad, i) => (
				<AdCard key={i} ad={ad}></AdCard>
			))}
		</div>
	);
}

export default App;
