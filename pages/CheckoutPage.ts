import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage
{
    page:Page;
    country:Locator;
    placeOrderBtn:Locator;

    constructor(page:Page)
    {
        this.page=page;

        this.country=page.locator("[placeholder='Select Country']");
        this.placeOrderBtn=page.locator(".action__submit");
    }

    async selectCountry(countryName:string)
    {
         
    const countryInput = this.page.locator('input[placeholder*="Country"]');

  await countryInput.click();
  await countryInput.type(countryName, {delay:100});

  const option = this.page.locator('.ta-results button, .ta-results span, .list-group-item')
    .filter({ hasText: new RegExp(`^\\s*${countryName}\\s*$`) })
    .first();
    

  await option.waitFor({ state: 'visible', timeout: 10000 });
  await option.click();

    await expect(countryInput).toHaveValue(countryName);

    }

    async placeOrder()
    {
        await this.placeOrderBtn.click();
    }

    async verifyOrder()
    {
        await expect(this.page.locator(".hero-primary"))
        .toContainText("Thankyou");
    }

    async logout()
    {
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
    }
}