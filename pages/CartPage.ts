import { Page, expect } from "@playwright/test";

export class CartPage
{
    page: Page;

    constructor(page:Page)
    {
        this.page=page;
    }

    async verifyProduct(productName:string)
    {
        await expect(this.page.locator("h3").filter({ hasText: productName }))
  .toBeVisible();
    }

    async checkout()
    {
        const checkoutButton = this.page.getByRole('button', { name: 'Checkout' }).first();
        
        await checkoutButton.click();
    }
}