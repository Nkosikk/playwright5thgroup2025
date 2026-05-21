import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class EnrollmentsPage extends BasePage {

    get enrollUserButton(): Locator {
        return this.page.getByRole('button', { name: /\+ Enroll User/i });
    }

    get selectCourseDropdown(): Locator {
        return this.page.locator("//div[@class='admin-enrollments']//div//div//form//div//select");
    }

    get searchUserTextBox(): Locator {
        return this.page.getByRole('textbox', { name: '🔍 Search by name or email...' });
    }


    get verifyUserSelectedMessage(): Locator {
        return this.page.locator(("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > div:nth-child(4)"))
    }

    get enrollUserButton2(): Locator {
        return this.page.locator("//button[normalize-space()='Enroll User']");
    }

    get VerifyUserEnrolledSuccessfullyMessage(): Locator {
        return this.page.getByText('User enrolled successfully!')
    }

    async clickEnrollUserButton() {
        await this.enrollUserButton.click();
    }

    async selectCourse(courseName: string) {
        await this.selectCourseDropdown.selectOption({ label: courseName });
    }

    async searchAndSelectFirstUser(searchText: string) {
        const input = this.searchUserTextBox;

        await input.click();
        await input.type(searchText, { delay: 100 });

        const result = this.page
            .locator('div')
            .filter({ hasText: 'Kai' })
            .last();

        await result.waitFor({ state: 'visible', timeout: 10000 });
        await result.click({ force: true });
    }







    // async searchUser(userEmail: string) {
    //     await this.enterText(this.searchUserTextBox, userEmail);
    // }



    // //     async function searchAndSelectFirstByEmail(page: any, email: string) {
    // //   await page.fill("#user-search", email);
    // //   await page.waitForSelector(".search-result-item");
    // //   await page.click(".search-result-item >> nth=0");

    // async clickSearchResultItem() {
    //     await this.searchResultItem.click();
    // }

    async verifyUserSelectedMessageIsVisible() {
        await this.verifyElementVisible(this.verifyUserSelectedMessage);
        console.log(this.verifyUserSelectedMessage);

    }

    async clickEnrollUserButton2() {
        await this.enrollUserButton2.click();

    }

    async verifyUserEnrolledSuccessfullyMessageIsVisible() {
        await this.verifyElementVisible(this.VerifyUserEnrolledSuccessfullyMessage);
        console.log(this.VerifyUserEnrolledSuccessfullyMessage);
        await this.page.pause();
    }



}