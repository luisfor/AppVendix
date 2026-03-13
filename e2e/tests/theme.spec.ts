import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Theme System', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.goTo();
        await loginPage.login('admin@pos-saas.com', 'admin_password_securo');
        await loginPage.expectAuthenticated();
    });

    test('should toggle theme correctly', async () => {
        const newTheme = await dashboardPage.toggleTheme();
        // Verify persistence after refresh
        await dashboardPage.page.reload();
        const themeAfterRefresh = await dashboardPage.page.evaluate(() =>
            document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
        expect(themeAfterRefresh).toBe(newTheme);
    });
});
