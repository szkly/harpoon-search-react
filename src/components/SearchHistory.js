import React from "react";

import CloseIcon from "./icons/CloseIcon";

export default function SearchHistory({ history, retrieveQuery, deleteItem, clearAll }) {
	return (
		<div className="absolute w-full flex flex-col items-center p-2 bg-indigo-600  rounded-bl-lg rounded-br-lg">
			{history.map((query, i) => {
				return (
					<div
						value={query}
						className="w-full flex justify-between items-center py-1 px-2 hover:bg-indigo-700 cursor-pointer"
						key={i}
					>
						<div onMouseDown={() => retrieveQuery(query)} className="w-full">
							{query}
						</div>
						<button onMouseDown={() => deleteItem(query)}>
							<CloseIcon classes="w-4 h-4 text-gray-300 hover:text-white"></CloseIcon>
						</button>
					</div>
				);
			})}
			{history.length > 1 && (
				<div className="w-full mt-2">
					<button onMouseDown={clearAll} className="text-sm font-semibold px-2 rounded hover:bg-indigo-700">
						Clear all
					</button>
				</div>
			)}
		</div>
	);
}
