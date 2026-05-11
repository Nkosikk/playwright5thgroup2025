
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // -------- LOCATORS --------

  get enrollmentButton(): Locator {
    return this.page.getByRole('button', { name: '🎓 Enrollments' });
  }
  get enrollUsersButton(): Locator {
    return this.page.getByRole('button', { name: '+ Enroll User' });
  }
  get courseDropdown(): Locator {
    return this.page.locator("//div[@class='admin-enrollments']//div//div//form//div//select");
  }
  get searchSectionTitle(): Locator {
    return this.page.getByPlaceholder('Search by name or email...');
  }
  get submitEnrollButton(): Locator {
    return this.page.locator('button:text-is("Enroll User")');
  }
  get verifyUserSuccessfullyEnrolled(): Locator {
    return this.page.getByText('User enrolled successfully!', { exact: true });
  }
  get selectBackToWebsiteButton(): Locator {
    return this.page.getByRole('button', { name: '← Back to Website' });
  }
  get selectMenuButton(): Locator {
    return this.page.locator('.user-pill');
  }

  get logoutButton(): Locator {
    return this.page.locator('span').filter({ hasText: 'Logout' }).first();

  }
  // -------- METHODS --------

  async clickEnrollmentButton() {
    await this.enrollmentButton.click();
  }

  async clickEnrollUsersButton() {
    await this.enrollUsersButton.waitFor({ state: 'visible' });
    await this.enrollUsersButton.click();
  }

  async selectEnrollOption(courseId: string) {
    await this.courseDropdown.waitFor({ state: 'visible' });
    await this.courseDropdown.selectOption({ label: courseId });
  }

  async searchAndSelectFirstUser(searchText: string) {
    const input = this.searchSectionTitle;

    await input.click();
    await input.type(searchText, { delay: 100 });

    const result = this.page
      .locator('div')
      .filter({ hasText: 'Tom' })
      .last();

    await result.waitFor({ state: 'visible', timeout: 10000 });
    await result.click({ force: true });
  }
  async clickEnrollUserAdminDashboard() {
    //await this.submitEnrollButton.scrollIntoViewIfNeeded();
    //await this.page.waitForLoadState('networkidle');
    await this.submitEnrollButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(5000);
    await this.submitEnrollButton.click();
    //await this.submitEnrollButton.click();
    await this.page.waitForTimeout(5000);

  }

  async verifyUserEnrolledSuccessfully() {
    await this.verifyElementVisible(this.verifyUserSuccessfullyEnrolled);
    await expect(this.verifyUserSuccessfullyEnrolled).toBeVisible();

  }

  async clickBackToWebsiteButton() {
    await this.selectBackToWebsiteButton.scrollIntoViewIfNeeded();
    await this.page.waitForLoadState('networkidle');
    await this.selectBackToWebsiteButton.waitFor({ state: 'visible' });
    await this.selectBackToWebsiteButton.click();

  }

  async clickSelectMenuButton() {
    await this.page.waitForLoadState('networkidle');
    await this.selectMenuButton.waitFor({ state: 'visible' });
    await this.selectMenuButton.click({ force: true });

  }
  async clickLogoutButton() {
    await this.page.waitForLoadState('networkidle');
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(5000);
    this.page.once('dialog', dialog => dialog.accept());

    await this.logoutButton.click();
    const okButton = this.page.locator('button:has-text("Ok"), button:has-text("OK")').first();
    if (await okButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await okButton.click();
      await this.page.waitForTimeout(10000);
    }

    

  }

}

