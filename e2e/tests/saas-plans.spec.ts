import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('SaaS Admin - Subscription Plans Management', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.goTo();
        await loginPage.login('admin@pos-saas.com', 'Diosesamor120483+');
        await expect(page.locator('text=SaaS Central').first()).toBeVisible();
    });

    test('should execute full plan lifecycle (Create, Duplicate, Edit Versioning, Status, Delete)', async ({ page }) => {
        // 1. Navigate to Plans
        await page.click('text=Planes');
        await expect(page.locator('h1')).toContainText('Planes de Suscripción');

        // 2. Create new plan
        await page.click('button:has-text("+ Crear Plan")');
        await expect(page.locator('h2')).toContainText('Nuevo Plan');

        const timestamp = Date.now();
        const planName = `E2E Plan Alpha ${timestamp}`;

        // Fill form
        await page.fill('input[placeholder="Ej. Plan Global Pro"]', planName);
        await page.fill('textarea', 'E2E Test Description');
        await page.fill('input[type="number"]', '150'); // Monthly (first number input)
        await page.locator('input[type="number"]').nth(1).fill('1500'); // Yearly

        // Limits
        await page.locator('input[type="number"]').nth(2).fill('20'); // Users
        await page.locator('input[type="number"]').nth(3).fill('5'); // Branches
        await page.locator('input[type="number"]').nth(4).fill('10000'); // Products

        await page.click('button:has-text("Crear Plan")');

        // Verify creation
        await expect(page.locator(`text=${planName}`).first()).toBeVisible();
        await expect(page.locator(`text=$150`).first()).toBeVisible();

        // 3. Duplicate Plan
        const planRow = page.locator('tr').filter({ hasText: planName });
        await planRow.locator('button[title="Duplicar"]').click();

        // Verify duplicate (should have ' (Copy)' suffix)
        await expect(page.locator(`text=${planName} (Copy)`).first()).toBeVisible();

        // 4. Edit Duplicate (trigger versioning logic if it had subscribers, but it doesn't yet so it just updates)
        const dupRow = page.locator('tr').filter({ hasText: `${planName} (Copy)` });
        await dupRow.locator('button[title="Editar Plan"]').click();

        await page.locator('input[type="number"]').nth(0).fill('199'); // Update price
        await page.click('button:has-text("Guardar Cambios y Versionar")');

        await expect(page.locator(`text=$199`).first()).toBeVisible();

        // 5. Toggle Status of Duplicate
        // Current status is Active, button should be "Suspender (Ocultar nuevos)"
        const activeDupRow = page.locator('tr').filter({ hasText: `${planName} (Copy)` });
        await activeDupRow.locator('button[title="Suspender (Ocultar nuevos)"]').click();

        // Let UI refresh, verify it shows "Inactivo"
        await expect(page.locator('tr').filter({ hasText: `${planName} (Copy)` }).locator('text=Inactivo')).toBeVisible();

        // 6. Delete Duplicate
        const inactiveDupRow = page.locator('tr').filter({ hasText: `${planName} (Copy)` });
        await inactiveDupRow.locator('button[title="Eliminar Definitivamente"]').click();

        // Accept browser confirmation dialog automatically
        page.on('dialog', dialog => dialog.accept());

        // Note: softDelete pushes it to ARCHIVED status
        // Verify Archived row exists
        await expect(page.locator('tr').filter({ hasText: `${planName} (Copy)` }).locator('text=Archivado')).toBeVisible();
    });
});
