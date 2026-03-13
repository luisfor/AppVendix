import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login('admin@pos-saas.com', 'admin_password_securo');
        await loginPage.expectAuthenticated();
    });

    test('should show error with invalid credentials', async () => {
        await loginPage.login('wrong@email.com', 'wrongpassword');
        await loginPage.expectLoginError('Credenciales inválidas');
    });

    test('should logout successfully', async () => {
        await loginPage.login('admin@pos-saas.com', 'admin_password_securo');
        await loginPage.expectAuthenticated();
        await loginPage.logout();
        await expect(loginPage.page).toHaveURL(/login/);
    });
});
