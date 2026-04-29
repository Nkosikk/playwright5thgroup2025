import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

    get verifyHomePage(): Locator {
        return this.page.locator('h2:visible');
    }
    
 async verifyHomePageIsVisible(){
    await this.verifyElementVisible(this.verifyHomePage);
    await this.page.pause();
 }
}