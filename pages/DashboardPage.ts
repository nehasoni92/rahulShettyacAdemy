import { Page, Locator } from "@playwright/test";

export class DashboardPage
{
    page: Page;
    cartButton: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.cartButton = this.page.locator("button[routerlink='/dashboard/cart']");
    }

    async addProductToCart(productName: string)
{
    const products = this.page.locator(".card-body");
    const count = await products.count();

    for (let i = 0; i < count; i++)
    {
        const product = await products.nth(i).locator("b").innerText();

                   if (product === productName)
        {
            await products.nth(i)
                .locator("text=Add To Cart")
                .click();

            // Wait until the success toast appears
            await this.page.locator("#toast-container").waitFor();

            // Wait until the loading animation disappears
            await this.page.locator(".ng-animating").waitFor({
                state: "detached"
            });

            break;
        }
    }
}

    async goToCart()
    {
                await this.cartButton.click();
    }
}