const textConfig = require("./text-sizes.json");

function generateTextSizes(baseSize, scaleFactor, steps) {
  const sizes = {};
  for (const key in steps) {
    const scale = steps[key];
    sizes[key] = `${(baseSize * scaleFactor * Math.pow(1.2, scale)).toFixed(
      3
    )}px`;
  }
  return sizes;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: generateTextSizes(textConfig.baseSize, 1, textConfig.steps), // Default scaleFactor of 1
    },
  },
  plugins: [],
};
