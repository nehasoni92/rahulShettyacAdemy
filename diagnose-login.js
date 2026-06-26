const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  const selectors = ['#userEmail', '#userPassword', '#login', 'button:has-text("Login")', 'button:has-text("Cart")'];
  for (const s of selectors) {
    try {
      const count = await page.locator(s).count();
      console.log(`${s}: ${count}`);
      if (count > 0) {
        console.log('visible?', await page.locator(s).first().isVisible());
      }
    } catch (err) {
      console.log(`${s}: ERROR`, err.message);
    }
  }
  console.log('URL', page.url());
  await browser.close();
})();
