import { test, expect } from '../fixtures/Main';

test.describe('Performance Glitch User', () => {
    test('should load the dashboard within acceptable time', async ({ loggingIn, dashboard }) => {
        const startTime = Date.now();
        await loggingIn.open();
        await loggingIn.login('standard_user', 'secret_sauce');
        await dashboard.assertLoggedIn();
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        console.log(`Dashboard load time: ${loadTime} ms`);
        expect(loadTime).toBeLessThan(5000); // 5 seconds to login and load dashboard!!
    });
    test('should eventually load products despite delay', async ({ loggingIn, dashboard, page }) => {
        const startTime = Date.now();
        await loggingIn.open();
        await loggingIn.login('performance_glitch_user', 'secret_sauce');
        await dashboard.assertLoggedIn();
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        console.log(`Dashboard load time: ${loadTime} ms`);
        await page.waitForSelector('text=Sauce Labs Backpack', { timeout: 10000 }); // wait 10 seconds 
        await expect(dashboard.firstProduct).toBeVisible();
    }
);
  });