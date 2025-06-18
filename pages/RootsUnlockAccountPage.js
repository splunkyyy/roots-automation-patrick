import { expect } from '@playwright/test';

export class RootsUnlockAccountPage {
  constructor(page) {
    this.page = page;

    // Locators for the unlock instructions page
    this.emailInput = page.locator('(//input[@id="user_email"])[2]');
    this.resendUnlockButton = page.locator('(//input[@name="commit" and @type="submit"])[2]');
  }

  async resendUnlockInstructions(email = 'clee+bans003@investwithroots.com') {
    console.log('Navigating to unlock instructions page...');
    await this.page.goto('https://roots-staging.herokuapp.com/users/unlock/new');

    // Ensure the input and button are visible
    await expect(this.emailInput).toBeVisible();
    await expect(this.resendUnlockButton).toBeVisible();

    await this.emailInput.fill(email);
    await expect(this.resendUnlockButton).toBeEnabled();

    await this.resendUnlockButton.click();
  }
}