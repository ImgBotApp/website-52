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

import { promise } from 'selenium-webdriver';
import { by, ElementFinder } from 'protractor';
import { BasePage } from '../../test/BasePage';

export class LoginModalPage extends BasePage {

	public static EMAIL = "root@vpdb.io";
	public static USERNAME = "root";
	public static PASSWORD = "abc123";

	constructor(public element: ElementFinder) {
		super();
	}

	public loginUsername = this.element.element(by.id('login-username'));
	public loginPassword = this.element.element(by.id('login-password'));
	public loginSubmit = this.element.element(by.id('login-submit'));
	public registerEmail = this.element.element(by.id('register-email'));
	public registerUsername = this.element.element(by.id('register-username'));
	public registerPassword = this.element.element(by.id('register-password'));
	public registerSubmit = this.element.element(by.id('register-submit'));
	public toggleButton = this.element.element(by.id('login-toggle'));
	public dismissButton = this.element.element(by.id('dismiss-button'));
	public successMessage = this.element.element(by.css('.modal-body > .alert-success[ng-show="vm.message"]'));

	toggle(): promise.Promise<void> {
		return this.toggleButton.click();
	}

	toggleRegister() {
		return this.registerSubmit.isDisplayed().then(isDisplayed => {
			if (!isDisplayed) {
				return this.toggle();
			}
			return null;
		});
	}

	setRegister(email:string, username:string, password:string) {
		this.registerEmail.sendKeys(email);
		this.registerUsername.sendKeys(username);
		this.registerPassword.sendKeys(password);
	}

	submitRegister() {
		this.registerSubmit.click();
	}

	toggleLogin() {
		return this.loginSubmit.isDisplayed().then(isDisplayed => {
			if (!isDisplayed) {
				return this.toggle();
			}
			return null;
		});
	}

	setLogin(username:string, password:string) {
		this.loginUsername.sendKeys(username);
		this.loginPassword.sendKeys(password);
	}

	submitLogin() {
		this.loginSubmit.click();
	}

	login() {
		return this.loginSubmit.isDisplayed().then(isDisplayed => {
			if (!isDisplayed) {
				this.toggle();
			}
			this.setLogin(LoginModalPage.USERNAME, LoginModalPage.PASSWORD);
			this.submitLogin();
		});
	}

	hasEmailValidationError(): promise.Promise<boolean> {
		return this.hasClass(this.formGroup(this.registerEmail), 'error');
	}

	hasUsernameValidationError(): promise.Promise<boolean> {
		return this.hasClass(this.formGroup(this.registerUsername), 'error');
	}

	hasPasswordValidationError(): promise.Promise<boolean> {
		return this.hasClass(this.formGroup(this.registerPassword), 'error');
	}


	dismiss(): promise.Promise<void> {
		return this.dismissButton.click();
	}

	static formGroup(input: ElementFinder) {
		return input.element(by.xpath('./ancestor::div[contains(concat(" ", @class, " "), " form-group ")][1]'));
	}

}