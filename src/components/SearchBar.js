import React, { useState } from "react";

export default function SearchBar({ getQuery }) {
	const [query, setQuery] = useState("");

	return (
		<div className="relative">
			<input
				className="h-8 sm:h-10 pl-2 sm:pl-4 pr-4 sm:pr-8 bg-indigo-700 text-sm sm:text-base rounded-lg focus:outline-none focus:placeholder-transparent"
				type="text"
				placeholder="Query..."
				value={query}
				onChange={(evt) => setQuery(evt.target.value)}
			></input>
			<button type="submit" className="text-white absolute top-0 right-0 mt-2 mr-2" onClick={() => getQuery(query)}>
				<svg viewBox="0 0 20 20" className="search w-4 sm:w-6 h-4 sm:h-6 fill-current">
					<path
						fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd"
					></path>
				</svg>
			</button>
		</div>
	);
}
