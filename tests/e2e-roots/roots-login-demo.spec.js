import { test, expect } from '@playwright/test';
import { RootsLoginPage } from '../../pages/RootsLoginPage';
import testData from '../../utils/testData.json' assert { type: 'json' };


test.describe('Roots Login Page - Authentication Suite', () => {

let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new RootsLoginPage(page);
    await page.goto('https://roots-staging.herokuapp.com/users/sign_in');
  });
  

  try {
    test('TC-01: Login Module: Verify that a user can successfully log in using a valid email and password combination.', async ({ page }) => {
    console.log('🔄 Attempting login with valid credentials...');
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    await expect(page).toHaveURL(/dashboard|home/i);
    console.log('✅ Login successful — redirected to dashboard!');
  });
  } catch (error) {
    console.error('❌ Error occurred during Login attempt: ', error);
  }


  try {
    test('TC-03: Login Module: Verify that pressing the Enter key submits the login form when both fields are filled.', async ({ page }) => {
    console.log('🔄 Testing Enter key submission...');
    await loginPage.pressEnterToLogin();
    await expect(page).toHaveURL('https://roots-staging.herokuapp.com/dashboard');
    console.log('✅ Enter key triggered login and redirected to dashboard!');
  });
  } catch (error) {
    console.error('❌ Error occurred when pressing Enter key to submit the login form: ', error);
  }

  try {
    test('TC-07: Login Module: Verify that clicking the eye icon toggles the visibility of the password text.', async () => {
    console.log('👁️ Toggling password field visibility...');
    const type = await loginPage.togglePasswordVisibility();
    expect(type).toBe('text');
    console.log('✅ Password field is now visible (type="text")!');
  }); 

  } catch (error) {
    console.error('❌ Error occurred when clicking the eye icon: ', error);

  }

  try {
    test('TC-08: Login Module: Verify that a successful login redirects the user to the dashboard or homepage.', async ({ page }) => {
    console.log('🔄 Verifying post-login redirect...');
    await loginPage.login();
    await expect(page).toHaveURL('https://roots-staging.herokuapp.com/dashboard');
    console.log('✅ Redirect confirmed to dashboard!');
  });
  } catch (error) {
    console.error('❌ Error occurred when verifying a successful login: ', error);
  }

  try {
    test('TC-09: Login Module: Verify that clicking on the "Sign up" link redirects the user to the registration page.', async ({ page }) => {
    console.log('🔗 Clicking on Sign Up link...');
    await loginPage.clickSignUpLink();
    await expect(page).toHaveURL(/sign[_-]up$/);
    console.log('✅ Navigated to Sign Up page!');
  });
  } catch (error) {
    console.error('❌ Error occurred when clicking the "Sign up" link: ', error);
  }

  try {
    test('TC-10: Login Module: Verify that clicking on the "Forgot your password?" link redirects to the password reset page.', async ({ page }) => {
    console.log('🔗 Clicking on Forgot Password link...');
    await loginPage.clickForgotPasswordLink();
    await expect(page).toHaveURL('https://roots-staging.herokuapp.com/users/password/new');
    console.log('✅ Navigated to Password Reset page!');
  });
  } catch (error) {
    console.error('❌ Error occurred when clicking the "Forgot your password?" link: ', error);
  }

  try {
    test('TC-11: Login Module: Verify that clicking on the "Didn’t receive unlock instructions?" link redirects to the unlock page.', async ({ page }) => {
    console.log('🔗 Clicking on Unlock Instructions link...');
    await loginPage.clickUnlockInstructionsLink();
    await expect(page).toHaveURL('https://roots-staging.herokuapp.com/users/unlock/new');
    console.log('✅ Navigated to Unlock Instructions page!');
  });
  } catch (error) {
    console.error('❌ Error occurred when clicking the "Didn’t receive unlock instructions?" link: ', error);
  }

  try {
    test('TC-12: Login Module: Invalid email format shows validation error', async ({ page }) => {
    console.log('⚠️ Submitting improperly formatted email...');
    await loginPage.submitWithInvalidEmail();
    await loginPage.expectInvalidCredentialsError();
    // await expect(page.getByRole('paragraph').filter({ hasText: 'Invalid Email or password.' }).first()).toBeVisible();
    console.log('✅ Validation error displayed as expected!');
  });
  } catch (error) {
    console.error('❌ Error occurred when verifiying an invalid email: ', error);
  }
  
  try {
    test('TC-15: Login Module: Verify that submitting the form with empty email or password fields shows validation messages.', async ({ page }) => {
    console.log('⚠️ Submitting empty login form...');
    await loginPage.submitEmptyForm();
    await loginPage.expectInvalidCredentialsError();
    // await expect(page.getByRole('paragraph').filter({ hasText: 'Invalid Email or password.' }).first()).toBeVisible();
    console.log('✅ Validation error shown for empty submission!');
  });
  } catch (error) {
    console.error('❌ Error occurred when verifiying an when submitting an empty form: ', error);
  }


});