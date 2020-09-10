import React, { useState } from "react";

import HeartIcon from "./icons/HeartIcon";

const HA_AD_URL = "https://hardverapro.hu/apro/";
const HA_SELLER_URL = "https://hardverapro.hu/tag/";

export default function Ad({ ad, hasAlreadyBeenFavourited, onFavourite }) {
	const locations = ad.locations;
	const priceTag = isNaN(ad.price) ? ad.price.toUpperCase() : `${ad.price} Ft`;

  const [isFavourite, setIsFavourite] = useState(hasAlreadyBeenFavourited);

	const handleOnFavourite = () => {
		setIsFavourite((oldIsFavourite) => !oldIsFavourite);
		onFavourite(ad);
	};

	return (
		<div className="relative w-full md:w-4/5 lg:w-2/3 xl:w-1/2 h-auto sm:h-80 md:h-64 pb-4 sm:p-4 mx-auto mb-8 md:my-4 flex flex-col sm:flex-row bg-white dark:bg-gray-800 dark:text-white md:rounded-lg sm:shadow-lg">
			<img
				className="w-full sm:w-1/3 lg:w-1/4 h-64 sm:h-auto object-cover sm:rounded sm:mr-4"
				alt={ad.ad.title}
				src={"https://hardverapro.hu/dl/uad" + ad.image.featured}
			></img>

			<div className="flex flex-col px-4 py-2 sm:p-0">
				{locations && (
					<div className="mt-2 sm:mt-0 mb-4">
						{locations.map((location, i) => (
							<span
								key={i}
								className="px-4 py-2 mr-2 bg-indigo-800 dark:bg-indigo-700 text-white text-sm lg:font-semibold rounded-full"
							>
								{location}
							</span>
						))}
					</div>
				)}

				<a
					href={HA_AD_URL + ad.ad.slug}
					target="_blank"
					rel="noopener noreferrer"
					className="text-lg sm:text-xl font-semibold mb-2 sm:break-words  hover:text-indigo-700 dark:hover:text-indigo-500 transition-colors duration-300"
				>
					{ad.ad.title}
				</a>
				<div className="text-lg text-green-600 font-semibold">{priceTag}</div>
				<div className="mt-4 sm:mt-auto">
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-indigo-700 dark:hover:text-indigo-500 transition-colors duration-300"
						href={HA_SELLER_URL + ad.seller.slug}
					>
						{ad.seller.username + " "}
					</a>
					(<span className="text-green-600">{ad.seller.reputation.positive + ", "}</span>
					<span className="text-red-600">{ad.seller.reputation.negative}</span>)
				</div>
			</div>

			<button onClick={handleOnFavourite} className="absolute top-1/4 right-1/2 focus:outline-none">
				<HeartIcon
					classes={
						"w-10 h-10 stroke-red transition-colors duration-300 " +
						(isFavourite ? "fill-red hover:fill-transparent" : "hover:fill-red")
					}
				></HeartIcon>
			</button>
		</div>
	);
}
