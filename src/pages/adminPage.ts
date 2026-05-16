import { BasePage } from './BasePage';
import { Locator, expect } from '@playwright/test';

export class AdminPage extends BasePage {
    get adminPanelButton(): Locator {
        return this.page.locator('button:not(.mobile-menu-item):has-text("Admin Panel")');
    }

    get enrollmentsTab(): Locator {
        return this.page.locator('button:not(.mobile-menu-item):has-text("Enrollments")');
    }

    get addEnrollUserButton(): Locator {
        return this.page.locator('button:has-text("+ Enroll User")');
    }

    get emailInput(): Locator {
        return this.page.locator('input[name="email"]');
    }

    get statusSelect(): Locator {
        return this.page.locator('select[name="status"]');
    }

    get groupSelect(): Locator {
        return this.page.locator('select[name="groupId"]');
    }

    get courseSelect(): Locator {
        return this.page.locator('form:has(button[type="submit"]:has-text("Enroll User")) select[required]');
    }

    get submitEnrollButton(): Locator {
        return this.page.locator('form:has(button[type="submit"]:has-text("Enroll User")) button[type="submit"]');
    }

    get userDropdownButton(): Locator {
        return this.page.locator('button.user-pill').first();
    }

    get adminPanelMenuButton(): Locator {
        return this.page.getByRole('button', { name: 'Admin Panel' }).first();
    }

    async openAdminPanel() {
        await this.clickElement(this.userDropdownButton, { force: true });
        await this.clickElement(this.adminPanelMenuButton, { force: true });
        await expect(this.page.getByText('🔐 Admin Dashboard')).toBeVisible({ timeout: 10000 });
    }

    async goToEnrollments() {
        await this.clickElement(this.enrollmentsTab, { force: true });
        await expect(this.page.getByText('Manage Enrollments')).toBeVisible({ timeout: 10000 });
    }

    async openEnrollModal() {
        await this.clickElement(this.addEnrollUserButton, { force: true });
        await expect(this.page.locator('form:has(button[type="submit"]:has-text("Enroll User"))')).toBeVisible({ timeout: 10000 });
        await expect(this.courseSelect).toBeVisible({ timeout: 10000 });
    }

    async filterStudentByEmail(email: string) {
        await this.emailInput.fill(email);
        await this.emailInput.press('Enter');
        await this.page.waitForTimeout(1000);
    }

    async enrollStudent(course: string) {
        // Helper to select an option by label or fallback to value when labels don't match exactly
        const selectByLabelOrValue = async (selectLocator: Locator, desiredLabel: string) => {
            await selectLocator.waitFor({ state: 'visible', timeout: 5000 });
            const start = Date.now();
            while (Date.now() - start < 5000) {
                const opts = await selectLocator.locator('option').count();
                if (opts > 1) break;
                await this.page.waitForTimeout(200);
            }
            try {
                await selectLocator.selectOption({ label: desiredLabel });
                return;
            } catch (e) {
                // ignore and try programmatic selection below
            }

            const applied = await selectLocator.evaluate((sel: any, label: string) => {
                const element = sel as HTMLSelectElement;
                const options = Array.from(element.options) as HTMLOptionElement[];
                const exact = options.find(o => o.textContent?.trim() === label);
                const contains = options.find(o => o.textContent?.includes(label));
                const option = exact || contains || options.find(o => ((o.value || o.textContent || '').trim().length > 0));
                if (!option) return false;
                element.value = option.value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
                return true;
            }, desiredLabel);
            if (!applied) {
                try { await selectLocator.selectOption({ index: 1 }); } catch (e) { /* ignore */ }
            }
        };

        await selectByLabelOrValue(this.courseSelect, course);

        await this.page.waitForSelector('form:has(button[type="submit"]:has-text("Enroll User")) button[type="submit"]', { state: 'visible', timeout: 10000 });
        await this.clickElement(this.submitEnrollButton, { force: true });
        await this.page.waitForTimeout(2000);
    }

    async verifyStudentEnrollment(email: string, course: string) {
        const row = this.page.locator('table tbody tr').filter({ hasText: email }).filter({ hasText: course }).first();
        await expect(row).toBeVisible({ timeout: 15000 });
        await expect(row).toContainText(email);
        await expect(row).toContainText(course);
    }
}
