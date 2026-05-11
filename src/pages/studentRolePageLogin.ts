import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class StudentRolePageLogin extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // -------- LOCATORS --------

  get openLoginPage(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }
  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get emailInput(): Locator {
    return this.page.getByPlaceholder('Email');
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder('Password');
  }

  get verifyCourseEnrolledTo(): Locator {
    return this.page.getByText('TestKB', { exact: true });
  }




   //-------Methods--------

  async goto() {
    await this.navigateTo('https://ndosisimplifiedautomation.vercel.app/');
  }


  async clickLoginButton() {
    await this.clickElement(this.openLoginPage);

  }

  async login(email: string, password: string) {
    await this.enterText(this.emailInput, email);
    await this.enterText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

 
    async verifyLoginSuccess() {
    const welcomeMessage = this.page.getByRole('heading', { name: 'Welcome back, Keishia' });
    await this.verifyElementVisible(welcomeMessage);
  }  

  async verifyCourseEnrollment() {
    await this.verifyElementVisible(this.verifyCourseEnrolledTo);
  }
  
  


}