import {test,expect} from '@playwright/test'


test("verify ndosi automation title",async({page})=>{

    await page.goto("https://ndosisimplifiedautomation.vercel.app/#")

    await expect(page).toHaveTitle("Ndosi Test Automation")
})


test("login to mdosi website",async({page})=>{

    await page.goto("https://ndosisimplifiedautomation.vercel.app/#")

    //  await page.getByRole('button', { name: 'Login' }).click();
      await page.click('text=Login')
     await page.waitForTimeout(3000)

  await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com')
  await page.getByRole('textbox', { name: 'Password' }).fill('@12345678')
  await page.waitForTimeout(3000)
    await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForTimeout(5000)

  await page.locator('button').filter({ hasText: '+ Add Review' }).click();
    await page.waitForTimeout(3000)
    await page.getByRole('textbox', { name: 'E.g., Great Learning Experience!' }).fill('This is a review for the product')
    await page.waitForTimeout(3000)

 
})


await page.getByRole('button').nth(4).click();
await page.waitForTimeout(3000)
await page.getByRole('textbox').fill('great experience');
await page.waitForTimeout(3000)
 
})


test("Approve testimonial",async({page})=>{

 await page.locator('button').filter({ hasText: '✓ Approve' }).first().click();
 
})
