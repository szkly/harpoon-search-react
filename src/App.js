import React, { useState, useEffect } from "react";

import useLocalStorage from "./hooks/useLocalStorage";

import Header from "./components/Header";
import Spinner from "./components/Spinner";
import AdCard from "./components/AdCard";

const BASE_URL = "https://api.harpoon.hu/search/ads";

function App() {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [ads, setAds] = useState([]);

	const [favourites, setFavourites] = useLocalStorage("favourites", []);
	const [hasSwitchedToFavourites, setHasSwitchtedToFavourites] = useState(false);

	useEffect(() => {
		if (query !== "") {
			setAds([]);
			setHasSwitchtedToFavourites(false);
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

	useEffect(() => {
		if (hasSwitchedToFavourites) {
			setAds(favourites);
		}
	}, [favourites, hasSwitchedToFavourites]);

	const clearAll = () => {
		setHasSwitchtedToFavourites(false);
		setQuery("");
		setAds([]);
	};

	const handleOnFavourite = (ad) => {
		if (favourites.some((favourite) => favourite.ad.title === ad.ad.title)) {
			setFavourites((favourites) => favourites.filter((favourite) => favourite.ad.title !== ad.ad.title));
		} else {
			setFavourites((oldFavourites) => [...oldFavourites, ad]);
		}
	};

	const onSwitchToFavourites = () => {
		setHasSwitchtedToFavourites(true);
		if (favourites.length > 0) {
			setQuery("");
			setAds(favourites);
		}
	};

	return (
		<div className="antialiased min-h-screen max-h-full flex flex-col items-center bg-gray-300 dark:bg-gray-900 dark:text-white transition-colors duration-300">
			<Header clearAll={clearAll} getQuery={(newQuery) => setQuery(newQuery)} switchToFavourites={onSwitchToFavourites}></Header>
			{loading && <Spinner></Spinner>}
			{ads.length > 0 &&
				ads.map((ad, i) => {
					const hasAlreadyBeenFavourited =
						favourites.some((favourite) => favourite.ad.title === ad.ad.title) || hasSwitchedToFavourites;

					console.log(hasAlreadyBeenFavourited);
					return (
						<AdCard
							key={i}
							ad={ad}
							hasAlreadyBeenFavourited={hasAlreadyBeenFavourited}
							onFavourite={(ad) => handleOnFavourite(ad)}
						></AdCard>
					);
				})}
			{hasSwitchedToFavourites && favourites.length === 0 && (
				<h1 className="text-xl mt-auto mb-auto">You haven't favourited any ads yet</h1>
			)}
		</div>
	);
}

export default App;
