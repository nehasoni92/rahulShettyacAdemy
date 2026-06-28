import { test } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

import loginData from "../TestData/login.json";

test.setTimeout(120000);

test("Purchase Product", async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    //const email = process.env.TEST_EMAIL || loginData.email;
    //const password = process.env.TEST_PASSWORD || loginData.password;

    const email = loginData.email;
    const password = loginData.password;
    async function runPurchaseFlow() {
        await login.goto();
        await login.login(email, password);
        await page.waitForSelector('button:has-text("Cart")', { timeout: 10000 });
        await dashboard.addProductToCart(loginData.product);
        await dashboard.goToCart();
        await cart.verifyProduct(loginData.product);
        await cart.checkout();
        await checkout.selectCountry("India");
        await checkout.placeOrder();       
        await checkout.verifyOrder();
        
    }
    await runPurchaseFlow();  
    await checkout.logout();
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the logout process completes

});