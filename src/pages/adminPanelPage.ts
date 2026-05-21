import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPanelPage extends BasePage {

    get enrollmentsTab(): Locator {
        return this.page.getByRole('button', { name: '🎓 Enrollments' });
    }

    async clickEnrollmentsTab() {
        await this.enrollmentsTab.click();      
    }

}