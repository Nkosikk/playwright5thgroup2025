import {test as base, Page} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {HomePage} from '../pages/homePage';
import { AdminPage } from '../pages/adminPage';
import { StudentRolePageLogin } from '../pages/studentRolePageLogin';


type CustomFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    adminPage: AdminPage;
    studentRolePageLogin: StudentRolePageLogin;
};

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    adminPage: async ({ page }, use) => {
        const adminPage = new AdminPage(page);
        await use(adminPage);
    },

    studentRolePageLogin: async ({ page }, use) => {
        const studentRolePageLogin = new StudentRolePageLogin(page);
        await use(studentRolePageLogin);
    },
    
});

export { expect } from '@playwright/test';