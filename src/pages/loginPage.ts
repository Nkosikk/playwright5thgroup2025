import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    private readonly pageUrl: string = 'https://ndosisimplifiedautomation.vercel.app/';

    get openLoginPage(): Locator {
        return this.page.getByRole('button',{ name: 'Login' });
    }
    get loginButton(): Locator {
        return this.page.getByRole('button',{ name: 'Login' });
    }

    get emailInput(): Locator {
        return this.page.getByPlaceholder('Email1');
    }

       get passwordInput(): Locator {
        return this.page.getByPlaceholder('Password1');
    }

    async goto(){
        await this.navigateTo(this.pageUrl);
    }

    async clickLoginButton(){
        await this.clickElement(this.openLoginPage);
    }

    async login(email: string, password: string){
        await this.enterText(this.emailInput, email);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }





}
