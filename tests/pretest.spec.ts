import {test, expect} from "@playwright/test";


    test("should navigate to the login page", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("soni902neha@gmail.com");
        await page.locator("#userPassword").fill("Nehasoni@1234");
        await page.locator("#login").click();
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
        const products = page.locator(".card-body");
        const productCount = await products.count();
        for(let i=0; i<productCount; i++)
        {
            const productName = await products.nth(i).locator("b").textContent();
            if(productName === "ZARA COAT 3")
            {
                await products.nth(i).locator("text=Add To Cart").click();
                break;
            }
            
        }
       await page.waitForTimeout(5000);
            const cartButton = page.getByRole('button', { name: 'Cart' }).first();
            await cartButton.click();
         await   page.waitForTimeout(5000);

         const checkoutButton = page.getByRole('button', { name: 'Checkout' }).first();
        
        await checkoutButton.click();

        await page.locator("[placeholder='Select Country']").type("ind", { delay: 200 });
        await   page.waitForTimeout(2000);
        const indiaOption = page.getByText('India', { exact: true }).first();
        await indiaOption.click();
        const placeOrderButton = page.getByText('Place Order');
        await   page.waitForTimeout(2000);
        
await placeOrderButton.click();
await   page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Sign Out' }).click();
await   page.waitForTimeout(2000);
    
});