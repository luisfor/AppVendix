import { Page, expect } from '@playwright/test';

export class BasePage {
    constructor(public page: Page) { }

    async navigateTo(path: string = '/') {
        await this.page.goto(path);
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }

    async getTitle() {
        return this.page.title();
    }

    async clickSelector(selector: string, options?: { force?: boolean }) {
        await this.page.click(selector, { force: true, ...options });
    }

    async fillInput(selector: string, value: string) {
        await this.page.fill(selector, value);
    }

    async isVisible(selector: string) {
        return this.page.isVisible(selector);
    }
}
