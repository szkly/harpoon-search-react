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
		},
	},
	variants: {},
	plugins: [],
};
