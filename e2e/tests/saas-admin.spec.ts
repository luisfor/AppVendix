import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CompanyPage } from '../pages/CompanyPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('SaaS Admin Operations', () => {
    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.goTo();
        await loginPage.login('admin@pos-saas.com', 'admin_password_securo');
        await loginPage.expectAuthenticated();
    });

    test('should navigate through sidebar correctly', async () => {
        await dashboardPage.navigateToCompanies();
        await expect(dashboardPage.page).toHaveURL(/\/saas-admin\/companies/);

        await dashboardPage.navigateToUsers();
        await expect(dashboardPage.page).toHaveURL(/\/saas-admin\/admins/);
    });

    test('should create a new company', async () => {
        const uniqueName = `Test Company ${Date.now()}`;
        await companyPage.goTo();
        await companyPage.openCreateModal();
        await companyPage.createCompany({
            name: uniqueName,
            email: `test-${Date.now()}@company.com`,
            plan: 'BASIC',
            adminName: 'Test Admin',
            adminEmail: `admin-${Date.now()}@company.com`
        });

        await companyPage.expectCompanyInList(uniqueName);
    });

    test('should toggle company status', async () => {
        await companyPage.goTo();
        // Assuming there is at least one company in the list
        const firstCompanyRow = companyPage.page.locator('tbody tr').first();
        const companyName = await firstCompanyRow.locator('td').first().textContent();

        if (companyName) {
            await companyPage.toggleCompanyStatus(companyName.trim().split('\n')[0]);
        }
    });
});
