import { test } from '../src/fixtures/customFixtures';
import { validUsers } from '../src/data/testData';

test('Admin login succeeds', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(validUsers.admin.email, validUsers.admin.password);
});
