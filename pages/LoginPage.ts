import { Page, Locator } from "@playwright/test";

export class LoginPage
{
    page: Page;
    email: Locator;
    password: Locator;
    loginBtn: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }

    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async login(email:string,password:string)
    {
        await this.email.fill(email);
        await this.password.fill(password);
        this.loginBtn.click();
      
}
}