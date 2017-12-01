import { LoginModalPage } from './login.modal.page';
import { internet } from 'faker';
import { AppPage } from "../app.page";

describe('Login Modal', () => {

	const appPage = new AppPage();
	const loginModal = appPage.loginModal;

	beforeAll(() => {
		appPage.get();
		appPage.openLoginModal();
	});

	it('should toggle between login and register', () => {
		loginModal.toggleLogin();
		expect(loginModal.loginSubmit.isDisplayed()).toBeTruthy();
		expect(loginModal.registerSubmit.isDisplayed()).not.toBeTruthy();
		expect(loginModal.toggleButton.getText()).toEqual('Register');
		loginModal.toggleRegister();
		expect(loginModal.loginSubmit.isDisplayed()).not.toBeTruthy();
		expect(loginModal.registerSubmit.isDisplayed()).toBeTruthy();
		expect(loginModal.toggleButton.getText()).toEqual('Login');
		loginModal.toggle();
	});

	it('should show validation errors when registering', () => {
		loginModal.toggleRegister();
		loginModal.submitRegister();
		expect(LoginModalPage.formGroup(loginModal.registerEmail).getAttribute('class')).toMatch('error');
		expect(LoginModalPage.formGroup(loginModal.registerUsername).getAttribute('class')).toMatch('error');
		expect(LoginModalPage.formGroup(loginModal.registerPassword).getAttribute('class')).toMatch('error');
		loginModal.toggle();
	});

	it('should register and login correctly', () => {
		const username = internet.userName().replace(/[^a-z0-9]+/gi, '');
		const password = internet.password(6);

		loginModal.toggleRegister();
		loginModal.setRegister(internet.email().toLowerCase(), username, password);
		loginModal.submitRegister();

		expect(loginModal.successMessage.isDisplayed()).toBeTruthy();
		expect(loginModal.successMessage.getText()).toContain('Registration successful.');
		expect(loginModal.loginSubmit.isDisplayed()).toBeTruthy();

		loginModal.toggleLogin();
		loginModal.setLogin(username, password);
		loginModal.submitLogin();

		expect(loginModal.element.isPresent()).not.toBeTruthy();
		expect(appPage.getLoggedUsername()).toEqual(username);

		appPage.logout();
		appPage.openLoginModal();
	});

});