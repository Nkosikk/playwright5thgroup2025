import { test, expect } from '../src/fixtures/customFixtures';
import {validUsers} from '../src/data/testData';
import { getLoginById, closePool } from '../src/data/dbLogin';

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

test.describe('Login with DB credentials', () => {
    test('should login using credentials from database (id=2)', async ({ loginPage, homePage }) => {
        // Fetch credentials from MySQL database
        const creds = await getLoginById(2);
        
        await loginPage.goto();
        await loginPage.clickLoginButton();
        await loginPage.login(creds.username, creds.password);
        await homePage.verifyHomePage.waitFor({ state: 'visible' });
    });

    test.afterAll(async () => {
        await closePool();
    });
})
