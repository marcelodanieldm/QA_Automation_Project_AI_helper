import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

const validPassword = 'secret_sauce';

const successfulUsers = [
  'standard_user',
  'problem_user',
  'error_user',
  'visual_user'
];

test.describe('Login - positive scenarios', () => {
  for (const username of successfulUsers) {
    test(`logs in successfully with ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.expectLoaded();
      await loginPage.login(username, validPassword);

      await inventoryPage.expectLoaded();
    });
  }

  test('logs in successfully with performance_glitch_user', async ({ page }) => {
    test.setTimeout(45_000);
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login('performance_glitch_user', validPassword);

    await inventoryPage.expectLoaded();
  });
});

test.describe('Login - negative scenarios', () => {
  test('rejects locked_out_user with locked account message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', validPassword);

    await expect(page).toHaveURL(loginPage.basePath);
    await loginPage.expectError('Epic sadface: Sorry, this user has been locked out.');
  });

  test('rejects standard_user with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'bad_password');

    await expect(page).toHaveURL(loginPage.basePath);
    await loginPage.expectError('Epic sadface: Username and password do not match any user in this service');
  });

  test('requires username when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submitWithoutUsername(validPassword);

    await expect(page).toHaveURL(loginPage.basePath);
    await loginPage.expectError('Epic sadface: Username is required');
  });

  test('requires password when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submitWithoutPassword('standard_user');

    await expect(page).toHaveURL(loginPage.basePath);
    await loginPage.expectError('Epic sadface: Password is required');
  });

  test('requires username when both fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submitEmptyForm();

    await expect(page).toHaveURL(loginPage.basePath);
    await loginPage.expectError('Epic sadface: Username is required');
  });
});

test.describe('Login - UI behavior', () => {
  test('closes error message after failed login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'bad_password');
    await loginPage.expectError('Epic sadface: Username and password do not match any user in this service');

    await loginPage.closeErrorMessage();

    await loginPage.expectErrorDismissed();
    await loginPage.expectLoaded();
  });
});

test.describe('Login - session behavior', () => {
  test('keeps inventory available after authenticated reload', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', validPassword);
    await inventoryPage.expectLoaded();

    await page.reload();

    await inventoryPage.expectProductsTitleVisible();
  });
});