import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class StudentPage extends BasePage {
    async verifyCourseEnrolled(courseName: string) {
        await expect(this.page.getByText(courseName)).toBeVisible({ timeout: 10000 });
    }
}
