![vpdb][text-logo]

*A database for Virtual Pinball tables.*

[![Codeship Status](http://img.shields.io/codeship/7a665bd0-b073-0135-06f3-52802c62f0b1.svg?style=flat-square)](https://app.codeship.com/projects/257675)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=RXJHMzgzZ1hZVURNS1pwWUUybFpxUXdOb1daQTlhTmExWms1K3ptenlocz0tLXp2R1VtMUtOOG1PN0tCZ1lJdmdjQ0E9PQ==--59873cb571ddbb196a9f1979a0c316718c2bc23e)](https://www.browserstack.com/automate/public-build/RXJHMzgzZ1hZVURNS1pwWUUybFpxUXdOb1daQTlhTmExWms1K3ptenlocz0tLXp2R1VtMUtOOG1PN0tCZ1lJdmdjQ0E9PQ==--59873cb571ddbb196a9f1979a0c316718c2bc23e)
[![Dependencies](https://david-dm.org/vpdb/website.svg?style=flat-square)](https://david-dm.org/vpdb/website)

This the code of the website. For the API, check out the [server project](https://github.com/vpdb/server).

## Quick Start

Since the web application is completely decoupled from the server, you can easily run it locally and use `api.vpdb.io` as backend.

You're going to need to have [Node.js](https://nodejs.org/) and [git](https://git-scm.com/downloads) installed.

1. `git clone https://github.com/vpdb/website vpdb-website`
2. `cd vpdb-website`
3. `npm install`
4. `npm run serve:dev:prod`
5. Open `http://localhost:3333` in browser.

## Stack

The VPDB website uses a somewhat modernized stack of AngularJS using ES6 and Webpack. For markup, [pug](https://pugjs.org/api/getting-started.html) is used and [Stylus](http://stylus-lang.com/) for the styles.


## Tests

Tests are end-to-end using [Protractor](http://www.protractortest.org) through [Codeship](https://codeship.com/) and BrowserStack.

## Credits

[![IntelliJ IDEA][idea-image]][idea-url]

Thanks to JetBrains for their awesome IDE and support of the Open Source Community!

Also thanks to [BrowserStack](https://www.browserstack.com) for offering free end-to-end testing.

## License

GPLv2, see [LICENSE](LICENSE).

[text-logo]: https://github.com/vpdb/backend/raw/master/gfx/text-logo.png
[travis-image]: https://img.shields.io/travis/vpdb/backend.svg?style=flat-square
[idea-image]: https://raw.githubusercontent.com/vpdb/backend/master/gfx/logo_IntelliJIDEA.png
[idea-url]: https://www.jetbrains.com/idea/