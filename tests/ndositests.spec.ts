import { test, expect, Locator } from "@playwright/test";
import { Testimonial } from "../models/testimonial.model";


let testimonial: Testimonial;
let testimonialCard: Locator | null = null;


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
})

// TODO: Click Menu

// TODO: Click Profile

test("Add testimonial",async({page})=>{
  testimonial = new Testimonial('This is a review for the product', 4, 'great experience');
  await page.locator('button').filter({ hasText: '+ Add Review' }).click();
    await page.waitForTimeout(3000)
    await page.getByRole('textbox', { name: 'E.g., Great Learning Experience!' }).fill(testimonial.title)
    await page.waitForTimeout(3000)
await page.getByRole('button').nth(testimonial.rating).click();
await page.waitForTimeout(3000)
await page.getByRole('textbox').fill(testimonial.experience);
await page.waitForTimeout(3000)
 
})


// TODO: Navigate to Admin Panel

// TODO: Open Testimonials

test("Find Testimonial element", async ({ page }) => {
  console.log("Search for testimonial " + testimonial.experience + " with status Pending and rating " + testimonial.rating);

  // Get all elements with experience text and status "Pending"
  const candidates = page.locator('.admin-main-content div')
    .filter({ has: page.locator(`p:has-text("${testimonial.experience}")`) })
    .filter({ has: page.locator('span:has-text("Pending")') });

  const count = await candidates.count();

  // Loop through each item 
  for (let i = 0; i < count; i++) {
    const card = candidates.nth(i);

    // Check if this candidate has no other div inside with the same testimonial text
    const inner = await card.locator(`div:has(p:has-text("${testimonial.experience}"))`).count();
    
    // Keep looking if there is an inner div
    if (inner > 0) 
      continue; 

    // Find the div containing the stars div (Note: stars in the div immediately ABOVE the experience)
    const starsDiv = card
      .locator(`p:has-text("${testimonial.experience}")`)
      .locator('xpath=preceding-sibling::div[1]');

    // Count the gold stars
    const goldStars = await starsDiv.locator('span[style*="rgb(245, 158, 11)"]').count();
    console.log("Gold stars are " + goldStars)

    // Early return once we find a testimonial that matches
    if (goldStars === testimonial.rating) {
      testimonialCard = card;
      break;
    }
  }
  
  if (testimonialCard === null)
    throw new Error(`No testimonial card found for "${testimonial.experience}" with Pending status and ${testimonial.rating} stars.`);
});


test("Approve testimonial",async({page})=>{
 // TODO: Click Approve in the testimonialCard element
 await page.locator('button').filter({ hasText: '✓ Approve' }).first()
 
})
