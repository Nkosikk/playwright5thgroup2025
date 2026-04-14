import { test, expect } from '../src/fixtures/customFixtures';
import {validUsers} from '../src/data/testData';

test.describe('Login to Ndosi Website', () => {
    test('should login with valid credentials', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.clickLoginButton();
        await loginPage.emailInput.fill(validUsers.admin.email);
    

    })
})

test.describe('Verify login success', () => {
    test('should login with valid credentials', async ({ loginPage,homePage}) => {
        await loginPage.goto();
        await loginPage.clickLoginButton();
        await loginPage.login(validUsers.admin.email, validUsers.admin.password);
        await homePage.verifyHomePage.waitFor({ state: 'visible' });
        
    })
})
