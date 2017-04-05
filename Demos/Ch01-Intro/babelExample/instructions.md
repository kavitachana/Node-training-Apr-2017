1. Install Babel's CLI globally: `npm install --global babel-cli`
2. Install the dependencies for this example: `npm install`
3. Look at the `package.json`, and note that `babel-preset-es2015` is in the devDependencies
4. Run the following: `babel --presets es2015 source.js -o destination.js`
	* `--presets es2015`: Enables the ES2015 (aka "ES6") preset
	* `source.js`: The file to transpile
	* `-o destination.js`: Tells Babel that this is meant to be a single file, and that the result should be saved as `destination.js`
5. Compare `source.js` (ES6) and `destination.js` (ES5), and spot the differences.
