import { test, expect } from '@playwright/test';
import { RootsLoginPage } from '../../pages/RootsLoginPage.js'; // Adjust the path as needed
import { RootsDashboardPage } from '../../pages/RootsDashboardPage.js';
import { RootsMyAccountPage } from '../../pages/RootsMyAccountPage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };


test.describe('Roots Automation', () => {

  // test('Login with valid credentials', async ({ page }) => {
  // const loginPage = new RootsLoginPage(page);
  // await loginPage.login(testData.validUser.email, testData.validUser.password);
  // await expect(page).toHaveURL(/dashboard|home/i);



  test('E2E Beneficiary', async ({ page }) => {
    const loginPage = new RootsLoginPage(page);
    const dashboardPage = new RootsDashboardPage(page);
    const myAccountPage = new RootsMyAccountPage(page);
    
    try {
      console.log('🔑 Logging in with new user credentials...');
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    
    await expect(page).toHaveURL(/dashboard|home/i); // Replace with the actual path after login

    console.log('📋 Verifying navigation menu...');
    await dashboardPage.verifyNavigationLinks();
    console.log('📋 Verified navigation menu!...');

    console.log('🔁 Switching to another investor...');
    await dashboardPage.selectEntity(testData.validUser.individual1);
    console.log('🔁 Successfully switched to another investor!');

    console.log('➡️ Navigating to My Account page...');
    await dashboardPage.goToMyAccount();

    console.log('📋 Verifying My Account page...');
    await myAccountPage.verifyProfileInfo({
      firstName: testData.validUser.firstName,
      lastName: testData.validUser.lastName,
      email: testData.validUser.email,
    });
    
    console.log('📋 Verified My Account page!');

    // console.log('🏦 Logging out...');
    // await dashboardPage.logOut();
    // console.log('🏦 Log out success!');
    } catch (error) {
      console.error('❌ Error occurred during Dashboard Test:', error);
    }
    
  
  }, 60000);

});

  // test('Pressing Enter submits login form', async ({ page }) => {
  //   const loginPage = new RootsLoginPage(page);
  //   await loginPage.login('clee+bans003@investwithroots.com', 'Testing1234!');
  //   await page.keyboard.press('Enter')
  //   await expect(page).toHaveURL(/dashboard|home/i);
  // });

  //  test('Invalid email format shows validation error', async ({ page }) => {
  //     const loginPage = new RootsLoginPage(page);
  //     await page.goto('https://roots-staging.herokuapp.com/users/sign_in');
  //     await page.locator('(//input[@id="user_email"])[2]').fill('invalid-email@invalid.com');
  //     await page.locator('(//input[@id="user_password"])[2]').fill('Test@123');
  //     await loginPage.signInButton.click();

  //     // Replace below text with the actual validation message
  //     await expect(page.getByRole('paragraph').filter({ hasText: 'Invalid Email or password.' }).first()).toBeVisible();
  //  });

  //  test('Clicking Sign up redirects to registration page', async ({ page }) => {
  //     const loginPage = new RootsLoginPage(page);
  //     await page.goto('https://roots-staging.herokuapp.com/users/sign_in');
  //     await page.getByRole('link', { name: 'Sign up' }).click();
  //     await expect(page).toHaveURL(/sign[_-]up$/);
  //  });

  //  test('Forgot password link redirects to password reset page', async ({ page }) => {
  //     const loginPage = new RootsLoginPage(page);
  //     await page.goto('https://roots-staging.herokuapp.com/users/sign_in');
  //     await page.getByRole('link', { name: 'Forgot your password?' }).click();
  //     await expect(page).toHaveURL('https://roots-staging.herokuapp.com/users/password/new');
  //  });

  //  test('Unlock instructions link redirects to unlock page', async ({ page }) => {
  //     const loginPage = new RootsLoginPage(page);
  //     await page.goto('https://roots-staging.herokuapp.com/users/sign_in');
  //     await page.getByRole('link', { name: 'Didn\'t receive unlock' }).click();
  //     await expect(page).toHaveURL('https://roots-staging.herokuapp.com/users/unlock/new');
  //  });

  //  test('Empty email or password shows validation messages', async ({ page }) => {
  //     const loginPage = new RootsLoginPage(page);
  //     await page.goto('https://roots-staging.herokuapp.com/users/sign_in');
  //     await loginPage.signInButton.click();

  //     // Replace below with actual error text shown
  //     await expect(page.getByRole('paragraph').filter({ hasText: 'Invalid Email or password.' }).first()).toBeVisible();
  //  });


