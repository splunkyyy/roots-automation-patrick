import { expect } from '@playwright/test';

export class RootsMyAccountPage {

  constructor(page) {
    this.page = page;

    this.addBeneficiaryButton = page.locator('//button[contains(@class, "border-roots-green-400") and normalize-space(.)="+ Add Beneficiary"]')

  }

async verifyProfileInfo({ firstName, lastName, email }) {
    // Wait for "My Account" header
    await this.page.waitForTimeout(20000);
    await expect(this.page.locator('div.text-xl.md\\:text-2xl.font-semibold >> text=My Account')).toBeVisible();

    // Verify first name
    await expect(this.page.locator('dt:text("First Name") + dd')).toHaveText(firstName);
    // Verify last name
    await expect(this.page.locator('dt:text("Last Name") + dd')).toHaveText(lastName);
    // Verify email
    await expect(this.page.locator('dt:text("Email") + dd')).toHaveText(email);
  }


}



