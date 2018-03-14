/*
 * VPDB - Virtual Pinball Database
 * Copyright (C) 2018 freezy <freezy@vpdb.io>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

import angular from 'angular';
import { VPDB } from './app';


/**
 * This is the entry point of the app.
 *
 * First we check if we need to polyfill anything. If so, load them from
 * polyfill.io before bootstrapping AngularJS.
 *
 * @see https://hackernoon.com/polyfills-everything-you-ever-wanted-to-know-or-maybe-a-bit-less-7c8de164e423
 * @see https://philipwalton.com/articles/loading-polyfills-only-when-needed/
 */
if (browserSupportsAllFeatures()) {
	console.debug('No polyfills necessary.');
	bootstrap();
} else {
	console.debug('Loading polyfills before continuing...');
	loadScript('https://cdn.polyfill.io/v2/polyfill.min.js', bootstrap);
}

/**
 * Bootstraps AngularJS
 * @param err
 */
function bootstrap(err) {
	if (err) {
		console.error('Error loading polyfills: %s', err.message);
	}
	angular.bootstrap(document, [ VPDB.name ], { strictDi: true });
}

/**
 * Checks if used features are supported by the browser.
 *
 * There should be a way to statically analyze the code base, but I haven't
 * found a way, so these might be incomplete.
 *
 * @returns {boolean}
 */
function browserSupportsAllFeatures() {
	return ('Promise' in window);
}

/**
 * Inserts the polyfill script into the DOM and continues once it's loaded.
 *
 * Thanks to polyfill.io, this should only add the features not supported by
 * the browser, which are determined by looking at the user agent header.
 *
 * @param {string} src URL to load
 * @param {function} done Callback
 */
function loadScript(src, done) {
	const js = document.createElement('script');
	js.src = src;
	js.onload = function() {
		done();
	};
	js.onerror = function() {
		done(new Error('Failed to load script ' + src));
	};
	document.head.appendChild(js);
}