/* eslint-disable */
const fs = require('fs');
const path = require('path');
const config = './config/webpack.' + process.env.ENV + '.js';
if (!fs.existsSync(config)) {
	throw Error('The ENV variable points to your webpack config. ' + config + ' does not exist.');
}
const websiteConfig = require(process.env.WEBSITE_CONFIG && fs.existsSync(process.env.WEBSITE_CONFIG)
	? process.env.WEBSITE_CONFIG
	: './config/vpdb.' + process.env.CONFIG + '.json');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = require(config)({
	env: process.env.ENV,
	outputPath: outputPath,
	websiteUrl: getUrl(websiteConfig.webUri),
	apiUrl: getUrl(websiteConfig.apiUri),
	storageUrl: getUrl(websiteConfig.storageUri),
	websiteConfig: websiteConfig
});

function getUrl(site) {
	return site.protocol + '://' + site.hostname + ([80, 443].includes(site.port) ? '' : ':' + site.port) + (site.pathname ? site.pathname : '') + '/';
}