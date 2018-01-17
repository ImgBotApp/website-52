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

import { resolve } from 'path'
import { browser, by, element, ElementFinder } from 'protractor';
import { AppPage } from '../app.page';
import { BasePage } from '../../test/BasePage';
import { promise } from 'selenium-webdriver';

export class GameAddAdminPage extends BasePage {

	appPage = new AppPage();

	title = element(by.id('title'));
	ipdbUrl = element(by.id('ipdb-url'));
	ipdbFetchButton = element(by.id('ipdb-fetch'));
	gameIdRecreation = element(by.id('game-id-1'));
	resetButton = element(by.id('game-reset-btn'));
	submitButton = element(by.id('game-submit-btn'));
	gameInfoPanel = element(by.id('game-info-panel'));
	gameInfoTitle = this.gameInfoPanel.element(by.css('h2'));

	backglassUploadPanel = element(by.id('backglass-upload'));
	backglassImage = this.backglassUploadPanel.element(by.css('.img--ar-bg'));
	backglassProgress = this.backglassUploadPanel.element(by.css('.progress'));

	logoUploadPanel = element(by.id('logo-upload'));
	logoImage = this.logoUploadPanel.element(by.css('.img--ar-logo'));
	logoProgress = this.logoUploadPanel.element(by.css('.progress'));

	get() {
		this.appPage.get();
		this.appPage.loginAs('contributor');
		this.navigate();
	}

	navigate() {
		this.appPage.uploadButton.click();
		this.appPage.uploadGameButton.click();
	}

	submit() {
		this.submitButton.click();
	}

	reset() {
		this.resetButton.click();
	}

	fetchIpdb(ipdb:string) {
		this.ipdbUrl.sendKeys(ipdb);
		this.ipdbFetchButton.click();
	}

	uploadBackglass(fileName:string) {
		this.upload(this.backglassUploadPanel, fileName);
		browser.wait(() => this.backglassProgress.isDisplayed().then(result => !result), 5000);
	}

	uploadLogo(fileName:string) {
		this.upload(this.logoUploadPanel, fileName);
		browser.wait(() => this.logoProgress.isDisplayed().then(result => !result), 5000);
	}

	hasTitleValidatorErrors(): promise.Promise<boolean> {
		return this.hasClass(this.formGroup(this.title), 'error');
	}

	hasRecreationIdValidationErrors(): promise.Promise<boolean> {
		return this.hasClass(this.formGroup(this.gameIdRecreation), 'error');
	}

	hasBackglassValidationErrors() {
		return element(by.css(`[ng-show="vm.errors['_backglass']"]`)).isDisplayed();
	}

}
