import { expect } from '@playwright/test';

export class RootsSignUpPage {
  constructor(page) {
    this.page = page;

    // Updated selectors including phone number
    this.firstNameInput = page.locator('(//input[@id="user_first_name"])[2]');
    this.lastNameInput = page.locator('(//input[@id="user_last_name"])[2]');
    this.emailInput = page.locator('(//input[@id="user_email"])[2]');
    this.phoneNumberInput = page.locator('(//input[@id="user_phone_number"])[2]');
    this.passwordInput = page.locator('(//input[@id="user_password"])[2]');
    this.passwordConfirmationInput = page.locator('(//input[@id="user_password_confirmation"])[2]');
    this.signUpButton = page.locator('(//input[@name="commit" and @type="submit"])[2]');
  }

  async signUp({
    firstName = 'Bans',
    lastName = 'Lee',
    email = `clee+bans${Date.now()}@investwithroots.com`,
    phoneNumber = '1234567890',
    password = 'Testing1234!'
  } = {}) {
    console.log('Navigating to sign-up page...');
    await this.page.goto('https://roots-staging.herokuapp.com/users/sign_up');

    // Wait for fields to be ready
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneNumberInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordConfirmationInput).toBeVisible();
    await expect(this.signUpButton).toBeVisible();

    // Fill form
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phoneNumber);
    await this.passwordInput.fill(password);
    await this.passwordConfirmationInput.fill(password);

    await expect(this.signUpButton).toBeEnabled();
    await this.signUpButton.click();
  }
}
