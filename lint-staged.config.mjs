const config = {
  '*.{js,cjs,mjs,jsx,ts,tsx,json}': ['eslint --fix'],
  '*.{js,cjs,mjs,jsx,ts,tsx,json,css}': ['prettier --write --ignore-unknown'],
};

export default config;
