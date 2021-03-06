/* eslint-disable */
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// see: https://github.com/AngularClass/angular-starter/blob/master/config/webpack.dev.js
module.exports = function(options) {

	return webpackMerge(commonConfig(options), {

		/**
		 * Webpack Development Server configuration
		 * Description: The webpack-dev-server is a little node.js Express server.
		 * The server emits information about the compilation state to the client,
		 * which reacts to those events.
		 *
		 * See: https://webpack.github.io/docs/webpack-dev-server.html
		 */
		devServer: {
			port: 3333,
		}
	});
};
