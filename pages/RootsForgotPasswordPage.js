import { expect } from '@playwright/test';

export class RootsForgotPasswordPage {
  constructor(page) {
    this.page = page;

    // Locators for the "Forgot your password?" page
    this.emailInput = page.locator('(//input[@id="user_email"])');
    this.sendInstructionsButton = page.locator('(//input[@name="commit"]');
  }

  async requestPasswordReset(email = 'clee+bans003@investwithroots.com') {
    console.log('Navigating to forgot password page...');
    await this.page.goto('https://roots-staging.herokuapp.com/users/password/new');

    // Wait until input and button are visible
    await expect(this.emailInput).toBeVisible();
    await expect(this.sendInstructionsButton).toBeVisible();

    await this.emailInput.fill(email);
    await expect(this.sendInstructionsButton).toBeEnabled();

    await this.sendInstructionsButton.click();
  }
}