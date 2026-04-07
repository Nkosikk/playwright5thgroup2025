/**
 * BasePage.ts
 * This class serves as a base for all page objects in the application. It provides common methods for navigation and interaction with web elements.
 * Each specific page will extend this BasePage to inherit its functionality, allowing for code reuse and better organization of page-specific actions.
 */

import {Page,Locator, expect} from '@playwright/test';

export class BasePage {

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        console.log(`Navigating to ${url}`);
        await this.page.goto(url);
    }

    async clickElement(locator: Locator) {
        console.log(`Clicking on element: ${locator}`);
        await locator.click();
    }

    async enterText(locator: Locator, text: string) {
        console.log(`Entering text: "${text}" into element: ${locator}`);
        await locator.fill(text);
    }

    async verifyElementVisible(locator: Locator) {
        console.log(`Verifying element is visible: ${locator}`);
        await expect(locator).toBeVisible();
    }

}