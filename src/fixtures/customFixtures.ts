import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {HomePage} from '../pages/homePage';
import {AdminPanelPage} from '../pages/adminPanelPage';
import {EnrollmentsPage} from '../pages/enrollmentsPage';


type CustomFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    adminPanelPage: AdminPanelPage;
    enrollmentsPage: EnrollmentsPage;
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

    adminPanelPage: async ({ page }, use) => {
        const adminPanelPage = new AdminPanelPage(page);
        await use(adminPanelPage);
    },

    enrollmentsPage: async ({ page }, use) => {
        const enrollmentsPage = new EnrollmentsPage(page);
        await use(enrollmentsPage);
    }

});

export { expect } from '@playwright/test';