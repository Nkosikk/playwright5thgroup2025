import { test } from '../src/fixtures/customFixtures';
import { validUsers, enrollmentConfig } from '../src/data/testData';

test.describe('Playwright Assessment - Enrol a student to a course', () => {
    test('admin enrolls a student and the student validates the course', async ({ page, loginPage, adminPage, studentPage }) => {
        await loginPage.goto();
        await loginPage.login(validUsers.admin.email, validUsers.admin.password);

        await adminPage.openAdminPanel();
        await adminPage.goToEnrollments();
        await adminPage.filterStudentByEmail(validUsers.student.email);
        await adminPage.openEnrollModal();
        await adminPage.enrollStudent(enrollmentConfig.courseName);
        await adminPage.verifyStudentEnrollment(validUsers.student.email, enrollmentConfig.courseName);

        page.once('dialog', dialog => dialog.accept());
        await page.locator('button', { hasText: 'Logout' }).first().click();

        await loginPage.goto();
        await loginPage.login(validUsers.student.email, validUsers.student.password);
        await studentPage.verifyCourseEnrolled(enrollmentConfig.courseName);
    });
});
