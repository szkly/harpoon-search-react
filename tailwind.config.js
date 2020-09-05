const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

module.exports = {
	purge: [],
	theme: {
		extend: {
			screens: {
				light: { raw: "(prefers-color-scheme: light)" },
				dark: { raw: "(prefers-color-scheme: dark)" },
			},
			spacing: {
				72: "18rem",
				80: "20rem",
			},
			borderWidth: {
				6: "6px",
			},
		},
	},
	variants: {},
	plugins: [
		({ addUtilities, e, theme, variants }) => {
			const colors = flattenColorPalette(theme("borderColor"));
			delete colors["default"];

			const colorMap = Object.keys(colors).map((color) => ({
				[`.border-t-${color}`]: { borderTopColor: colors[color] },
				[`.border-r-${color}`]: { borderRightColor: colors[color] },
				[`.border-b-${color}`]: { borderBottomColor: colors[color] },
				[`.border-l-${color}`]: { borderLeftColor: colors[color] },
			}));
			const utilities = Object.assign({}, ...colorMap);

			addUtilities(utilities, variants("borderColor"));
		},
	],
};
