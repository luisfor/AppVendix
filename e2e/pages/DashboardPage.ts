import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Selectors
    private readonly statsTitle = 'h1:has-text("Dashboard Global")';
    private readonly mrrValue = 'h3 >> nth=0'; // First metric (MRR)
    private readonly sidebarDashboard = 'a:has-text("Dashboard")';
    private readonly sidebarCompanies = 'a:has-text("Empresas")';
    private readonly sidebarUsers = 'a:has-text("Administradores")';
    private readonly themeToggle = '[data-testid="theme-toggle"]';

    async goTo() {
        await this.navigateTo('/saas-admin');
    }

    async expectDashboardVisible() {
        await expect(this.page.locator(this.statsTitle)).toBeVisible();
    }

    async navigateToCompanies() {
        await this.clickSelector(this.sidebarCompanies);
    }

    async navigateToUsers() {
        await this.clickSelector(this.sidebarUsers);
    }

    async toggleTheme() {
        const currentTheme = await this.page.evaluate(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        await this.clickSelector(this.themeToggle);
        // Wait for optimistic update
        await this.page.waitForTimeout(1000);
        const newTheme = await this.page.evaluate(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        expect(currentTheme).not.toBe(newTheme);
        // Allow time for DB sync before potential reload in test
        await this.page.waitForTimeout(2000);
        return newTheme;
    }
}
