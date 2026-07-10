import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly basePath = '/';
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByTestId('error');
    this.errorCloseButton = this.errorMessage.getByRole('button');
  }

  async goto() {
    await this.page.goto(this.basePath);
  }

  async expectLoaded() {
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.enterCredentials(username, password);
    await this.clickLogin();
  }

  async submitWithoutUsername(password: string) {
    await this.passwordInput.fill(password);
    await this.clickLogin();
  }

  async submitWithoutPassword(username: string) {
    await this.usernameInput.fill(username);
    await this.clickLogin();
  }

  async submitEmptyForm() {
    await this.clickLogin();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }

  async closeErrorMessage() {
    await this.errorCloseButton.click();
  }

  async expectErrorDismissed() {
    await expect(this.errorMessage).toBeHidden();
  }
}