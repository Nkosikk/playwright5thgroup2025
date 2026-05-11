import { test, expect } from '../src/fixtures/customFixtures';
import { validUsers } from '../src/data/testData';
import { getLoginById, closePool } from '../src/data/dbLogin';
import { AdminPage } from '../src/pages/adminPage';


test.describe('Enrolling Users', () => {
    test('Enrol User Test', async ({ loginPage, homePage, adminPage, studentRolePageLogin }) => {
        await loginPage.goto();
        await loginPage.clickLoginButton();
        await loginPage.login(validUsers.admin.email, validUsers.admin.password);
        await homePage.verifyHomePage.waitFor({ state: 'visible' });
        await homePage.clickProfileButton();
        await homePage.clickAdminPanelButton();

        await adminPage.clickEnrollmentButton();
        await adminPage.clickEnrollUsersButton();
        await adminPage.selectEnrollOption("TestKB");

        await adminPage.searchAndSelectFirstUser('Keishia');
        await adminPage.clickEnrollUserAdminDashboard();
        await adminPage.verifyUserEnrolledSuccessfully();

        await adminPage.clickBackToWebsiteButton();
        await adminPage.clickSelectMenuButton();
        await homePage.clickProfileButton();
        await adminPage.clickLogoutButton();
        await studentRolePageLogin.clickLoginButton();
        await studentRolePageLogin.login(validUsers.standardUser.email, validUsers.standardUser.password);
        await studentRolePageLogin.verifyLoginSuccess();
        await studentRolePageLogin.verifyCourseEnrollment();
    })

});
