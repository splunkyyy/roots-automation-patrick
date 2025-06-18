import { expect } from '@playwright/test';
import testData from '../utils/testData.json' assert { type: 'json' };


export class RootsLoginPage {
  constructor(page) {
    this.page = page;

    // Fallback-safe selectors (direct ID-based)
    this.emailInput = page.locator('(//input[@id="user_email"])[2]');
    this.passwordInput = page.locator('(//input[@id="user_password"])[2]');
    this.signInButton = page.locator('(//input[@type="submit" and @name="commit"])[2]');
    this.rememberMeCheckbox = page.locator('#user_remember_me');
    this.passwordToggle = page.locator('(//button[@data-action="password-visibility#toggle"])[2]');
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    this.unlockInstructionsLink = page.locator('(//a[contains(normalize-space(.), "unlock instructions")]) [2]');
    this.errorMessage = page.locator('p:text("Invalid Email or password.")');

  }

  async goto() {
    await this.page.goto('https://roots-staging.herokuapp.com/users/sign_in');
  }

  async login(email = testData.validUser.email, password = testData.validUser.password) {
    await this.goto();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await expect(this.signInButton).toBeEnabled();

    await this.signInButton.click();
  }

  async pressEnterToLogin() {
    await this.emailInput.fill(testData.validUser.email);
    await this.passwordInput.fill(testData.validUser.password);
    await this.page.keyboard.press('Enter');
  }

  async togglePasswordVisibility() {
    await this.passwordInput.fill(testData.validUser.password);
    await this.passwordToggle.click();
    const type = await this.passwordInput.getAttribute('type');
    return type;
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async clickForgotPasswordLink() {
    await this.forgotPasswordLink.click();
  }

  async clickUnlockInstructionsLink() {
    await this.unlockInstructionsLink.click();
  }

  async submitEmptyForm() {
    await this.signInButton.click();
  }

  async submitWithInvalidEmail() {
    await this.emailInput.fill('test@investwith.com');
    await this.passwordInput.fill(testData.validUser.password);
    await this.signInButton.click();
  }

  
  async expectInvalidCredentialsError() {
    const errorMessage = this.page
      .getByRole('paragraph')
      .filter({ hasText: 'Invalid Email or password.' })
      .first();

    await expect(errorMessage).toBeVisible();
  } 

  

  // async isValidationErrorVisible() {
  //   return this.errorMessage.isVisible();
  // }


}








// async login(email, password) {
  //   console.log('Navigating to login page...');
  //   await this.page.goto('https://roots-staging.herokuapp.com/users/sign_in');

  //   // Wait for visibility of direct locators (more reliable)
  //   await expect(this.emailInput).toBeVisible();
  //   await expect(this.passwordInput).toBeVisible();
  //   await expect(this.signInButton).toBeVisible();

  //   await this.emailInput.fill(email);
  //   await this.passwordInput.fill(password);
  //   await expect(this.signInButton).toBeEnabled();

  //   await this.signInButton.click();
  // }



// constructor(page) {
//         this.page = page;
//         this.emailInput = page.locator('(//input[@id="user_email"])[2]');
//         this.passwordInput = page.locator('(//input[@id="user_password"])[2]');
//         this.signInButton = page.locator('(//input[@type="submit" and @name="commit"])[2]');
//         this.signUpLink = page.locator('(//a[@href="/users/sign_up"])[2]');
//         this.googleSignInButton = page.locator('(//div[@class="h-fit w-3/4"]//button[@type="submit"])');
//         this.rememberMeCheckbox = page.locator('//div[@class="h-fit w-3/4"]//input[@id="user_remember_me"]');
//         this.forgotPasswordLink = page.locator('//div[@class="h-fit w-3/4"]//a[@class="font-medium text-gray-600 hover:text-indigo-500"][normalize-space(🙁"Forgot your password?"]');
//         this.invalidEmailErrorMessage = page.locator('//div[@class="h-fit w-3/4"]//p[@class="text-sm font-medium text-red-800"][normalize-space(🙁"Invalid Email or password."]')
//         this.toggleButton = page.locator('(//button[@data-action="password-visibility#toggle"])[2]');
//     }