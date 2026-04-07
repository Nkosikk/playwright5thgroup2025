import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    private readonly pageUrl: string = 'https://ndosisimplifiedautomation.vercel.app/';

    get openLoginPage(): Locator {
        return this.page.getByRole('button',{ name: 'Login' });
    }



}
