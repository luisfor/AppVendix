import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CompanyPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Selectors
    private readonly newCompanyButton = 'button:has-text("Nueva Empresa")';
    private readonly companyNameInput = 'input[placeholder="Ej. Farmacia Central"]';
    private readonly companyEmailInput = 'input[placeholder="contacto@empresa.com"]';
    private readonly planSelect = 'select';
    private readonly adminNameInput = 'input[placeholder="Nombre completo"]';
    private readonly adminEmailInput = 'input[placeholder="admin@empresa.com"]';
    private readonly submitButton = 'button[type="submit"]';
    private readonly companyRows = 'tbody tr';

    async goTo() {
        await this.navigateTo('/saas-admin');
    }

    async openCreateModal() {
        await this.clickSelector(this.newCompanyButton);
        await expect(this.page.locator('text=Registrar Nueva Empresa')).toBeVisible();
    }

    async createCompany(data: { name: string, email: string, plan: string, adminName: string, adminEmail: string }) {
        await this.fillInput(this.companyNameInput, data.name);
        await this.fillInput(this.companyEmailInput, data.email);
        await this.page.selectOption(this.planSelect, { index: 0 });
        await this.fillInput(this.adminNameInput, data.adminName);
        await this.fillInput(this.adminEmailInput, data.adminEmail);
        await this.clickSelector(this.submitButton);
        await expect(this.page.locator('text=Registrar Nueva Empresa')).toBeHidden({ timeout: 15000 });
    }

    async expectCompanyInList(name: string) {
        await expect(this.page.locator(`text=${name}`)).toBeVisible();
    }

    async toggleCompanyStatus(companyName: string) {
        const row = this.page.locator(this.companyRows).filter({ hasText: companyName });
        // The toggle button is the first one in the actions div (emoji)
        const statusButton = row.locator('button').first();
        const currentEmoji = await statusButton.textContent();
        await statusButton.click({ force: true });
        // Wait for the endpoint to finish and the UI to reflect change
        await expect(statusButton).not.toHaveText(currentEmoji || '', { timeout: 15000 });
    }
}
