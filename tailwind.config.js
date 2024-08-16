/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				archivo: ["Archivo Black", "sans"],
				lexend: ["Lexend", "sans"],
				firaCode: ["Fira Code", "monospace"],
			},
			colors: {
				firebaseYellow: "#FFC400",
				firebaseOrange: "#FF9100",
			},
			boxShadow: {
				neo: "5px 5px 0px 0px rgba(0, 0, 0, 1)",
			},
		},
	},
	plugins: [],
};
