import { test, expect } from '../src/fixtures/customFixtures';
import { validUsers } from '../src/data/testData';
import { AdminPanelPage } from '../src/pages/adminPanelPage';
import { EnrollmentsPage } from '../src/pages/enrollmentsPage';


test.describe('Enroll student in course', () => {
   test('should enroll student in course', async ({ loginPage, homePage, adminPanelPage, enrollmentsPage }) => {
      await loginPage.goto();
      await loginPage.clickLoginButton();
      await loginPage.login(validUsers.admin.email, validUsers.admin.password);
      await homePage.clickProfileButton();
      await homePage.adminProfileButton.waitFor({ state: 'visible' });
      await homePage.clickAdminPanel();
      await adminPanelPage.clickEnrollmentsTab();
      await enrollmentsPage.enrollUserButton.waitFor({ state: 'visible' });
      await enrollmentsPage.clickEnrollUserButton();
      await enrollmentsPage.selectCourse('Java programming');
      await enrollmentsPage.searchAndSelectFirstUser('kai8@gmail.com');
      await enrollmentsPage.verifyUserSelectedMessageIsVisible();
      await enrollmentsPage.clickEnrollUserButton2();
      await enrollmentsPage.verifyUserEnrolledSuccessfullyMessageIsVisible();
   })

})

test.describe('Log in as Student and verify course enrollment', () => {
   test('should log in as student and verify course enrollment', async ({ loginPage, homePage, page }) => {
      await loginPage.goto();
      await loginPage.clickLoginButton();
      await loginPage.login(validUsers.standardUser.email, validUsers.standardUser.password);
      await homePage.verifyRegularUserHomePageIsVisible();
      await homePage.verifyCourseNameIsVisible();
      // await page.pause();  
      await page.waitForTimeout(10000);
   })
})

