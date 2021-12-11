module.exports = {
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx,svelte}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		// eslint-disable-next-line global-require
		require('@tailwindcss/forms'),
	],
};
