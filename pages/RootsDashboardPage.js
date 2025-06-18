import { expect } from '@playwright/test';

export class RootsDashboardPage {
  constructor(page) {
    this.page = page;

    this.dashboardButton = page.locator('(//span[normalize-space(.)="Dashboard"])[2]');
    this.marketplaceButton = page.locator('(//span[normalize-space(.)="Marketplace"])[2]');
    this.investmentsButton = page.locator('(//span[normalize-space(.)="My Investments"])[2]');
    this.myAccountButton = page.locator('(//span[normalize-space(.)="My Account"])[2]');
    // this.dropDownButton = page.locator("(//div[contains(@class,'relative') and contains(@class,'w-[268px]')]/button[@type='button'])[2]");
    // this.dropDownMenu = page.locator("(//div[contains(@class,'relative') and contains(@class,'w-[268px]')]/div[contains(@class,'rounded-3xl') and contains(@class,'bg-white')])[2]");
    // this.dropdownButtonDashboard = page.locator('(//div[normalize-space()="Bans Entity"]) [3]')
    // this.dropdownAccountButtonDashboard = page.locator('(//div[normalize-space()="Bans Lee"]) [3]')
    this.logOutButton = page.locator("(//a[.//div[normalize-space()='Log out']])[3]");
    
  }

  // Navigation menu links on the left sidebar
  async verifyNavigationLinks() {

    await this.dashboardButton.isVisible();
    await this.marketplaceButton.isVisible();
    await this.investmentsButton.isVisible();
    await this.myAccountButton.isVisible();

  }

  async openDropDown(dropdownIndex) {
    // Wait for dashboard to be ready
    await this.dashboardButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(20000); // Respect your environment's slowness

    // Find all dropdown buttons matching pattern
    const dropdownButtons = this.page.locator('button[id^="dropdown-"][data-dropdown-toggle]');
    const count = await dropdownButtons.count();
    if (count === 0) throw new Error('No dropdown buttons found!');

    // If no index is provided, choose smart default: 0 if only one, 1 if more
    let indexToUse;
    if (dropdownIndex === undefined || dropdownIndex === null) {
      indexToUse = count === 1 ? 0 : 1;
    } else {
      indexToUse = dropdownIndex;
    }

    if (indexToUse >= count) throw new Error(`Dropdown button at index ${indexToUse} not found, found only ${count}.`);

    const button = dropdownButtons.nth(indexToUse);
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await expect(button).toBeEnabled();

    console.log('Waiting for hydration to finish...');
    await this.page.waitForTimeout(20000); // Give hydration/JS time to finish
    console.log('Hydration finished!');

    // Mouse click is robust
    const box = await button.boundingBox();
    if (box) {
      await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.up();
    } else {
      await button.click({ force: true });
    }
    console.log('Dropdown button clicked!');

    // Wait for the corresponding menu to be visible
    const menuId = await button.getAttribute('data-dropdown-toggle');
    const dropDownMenu = this.page.locator(`#${menuId}`);
    await dropDownMenu.waitFor({ state: 'visible', timeout: 20000 });
    this.currentDropDownMenu = dropDownMenu;
    await this.page.screenshot({ path: 'after-dropdown-menu-open.png', fullPage: true });
}

async logOut() {
  console.log('LOG OUT PROCESS HAS BEEN STARTED!');
    await this.openDropDown();
    const logOutButton = this.currentDropDownMenu.locator('a:has-text("Log out")');
    await logOutButton.waitFor({ state: 'visible', timeout: 200000 });
    await logOutButton.click();
}


  async selectEntity(name) {
  console.log('SELECTION OF INVESTORS PROCESS HAS BEEN STARTED!');
  await this.openDropDown();

  // Find the correct anchor in the currently opened menu
  const entityLink = this.currentDropDownMenu.locator(
    `a:has(div.text-base:has-text("${name}"))`
  );

  await entityLink.waitFor({ state: 'visible', timeout: 10000 });
  console.log('Name of investor found and visible!');
  await this.page.waitForTimeout(300);
  
  await entityLink.click();
}

async goToMyAccount() {
  
  await this.page.waitForTimeout(10000);
  await this.myAccountButton.click();

}

}



//   async openDropDown() {
//     // Wait for dashboard to be ready
//     await this.dashboardButton.waitFor({ state: 'visible', timeout: 10000 });
//     await this.page.waitForTimeout(20000); // Give hydration/JS time to finish
//     console.log('Dashboard ready!');

//     await this.dropDownButton.waitFor({ state: 'visible', timeout: 10000 });
//     await expect(this.dropDownButton).toBeEnabled();
//     console.log('Drop down button ready!');


//     await this.page.screenshot({ path: 'before-dropdown-click.png', fullPage: true });

//     console.log('Waiting for hydration to finish...');
//     await this.page.waitForTimeout(20000); // Give hydration/JS time to finish
//     console.log('Hydration finished!');

//     // Click (use mouse API if needed for real user-like interaction)
//     const box = await this.dropDownButton.boundingBox();
//     if (box) {
//       await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
//       await this.page.mouse.down();
//       await this.page.mouse.up();
//     } else {
//       await this.dropDownButton.click({ force: true });
//     }
//     console.log('Dropdown button clicked!');


//     // Wait for the dropdown menu
//     const menuId = await this.dropDownButton.getAttribute('data-dropdown-toggle');
//     const dropDownMenu = this.page.locator(`#${menuId}`);
//     console.log('Waiting for dropdown menu to be visible.');
//     await dropDownMenu.waitFor({ state: 'visible', timeout: 20000 });
//     console.log('Dropdown menu is now visible!');

//     this.currentDropDownMenu = dropDownMenu;
//     await this.page.screenshot({ path: 'after-dropdown-menu-open.png', fullPage: true });
// }









