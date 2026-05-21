import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

    get verifyAdminHomePage(): Locator {
        return this.page.getByRole('heading', { name: 'Welcome back, Nkosi! 👋' });
    }

    get profileButton(): Locator {
        return this.page.locator('button.user-pill');
    }

    get adminProfileButton(): Locator {
        return this.page.locator('span').filter({ hasText: 'Admin Panel' }).first()
    }

    get courseName(): Locator {
        return this.page.getByText('Java programming', { exact: true });
    } 
    
    get verifyRegularUserHomePage(): Locator {
        return this.page.getByRole('heading', { name: 'Welcome back, Kai! 👋' });
    }


    async verifyAdminHomePageIsVisible() {
        await this.verifyElementVisible(this.verifyAdminHomePage);
    }

    async clickProfileButton() {
        await this.profileButton.scrollIntoViewIfNeeded();
        await this.profileButton.click();
    }

    async clickAdminPanel() {
        await this.page.waitForLoadState('networkidle');
        await this.adminProfileButton.click();
      //  await this.page.pause();
    }

    async verifyRegularUserHomePageIsVisible() {
        await this.verifyElementVisible(this.verifyRegularUserHomePage);
    }

    async verifyCourseNameIsVisible() {
        await this.verifyElementVisible(this.courseName);
        this.printLocatorName(this.courseName);
    }

}


