import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    get verifyHomePage(): Locator {
        return this.page.getByRole('heading', { name: 'Welcome back, tshfhiwag! 👋' });
    }

    get profileButton(): Locator {
        return this.page.locator('.user-pill');

    }
    get adminPanelButton(): Locator {
        return this.page.getByRole('button', { name: '🔧 Admin Panel' })
    }
    async verifyHomePageIsVisible() {
        await this.verifyElementVisible(this.verifyHomePage);
        await this.page.pause();
    }
    async clickProfileButton() {
        await this.profileButton.scrollIntoViewIfNeeded();
        await this.page.waitForLoadState('networkidle');
        await this.profileButton.waitFor({ state: 'visible' });
        await this.profileButton.click();

    }

    async clickAdminPanelButton() {
        await this.clickElement(this.adminPanelButton);
    };

}

