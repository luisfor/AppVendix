import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Selectors
    private readonly emailInput = 'input[name="email"]';
    private readonly passwordInput = 'input[name="password"]';
    private readonly loginButton = 'button[type="submit"]';
    private readonly errorMessage = '.bg-rose-500\\/10'; // Error message container
    private readonly userAvatar = '.h-10.w-10.rounded-full'; // Top right avatar

    async goTo() {
        await this.navigateTo('/auth/login');
    }

    async login(email: string, password: string) {
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.passwordInput, password);
        await this.clickSelector(this.loginButton);
        // Wait for navigation or error
    }

    async logout() {
        await this.page.locator('form button:has-text("Cerrar Sesión")').first().click({ force: true });
    }

    async expectLoginError(message: string) {
        await expect(this.page.locator(this.errorMessage)).toContainText(message);
    }

    async expectAuthenticated() {
        await expect(this.page).not.toHaveURL(/login/);
    }
}
