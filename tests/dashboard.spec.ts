// tests/dashboard.spec.ts
import { test, expect } from '../fixtures/Main';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({loggingIn, dashboard}) => {
        await loggingIn.open();
        await loggingIn.login('standard_user', 'secret_sauce');
        await dashboard.assertLoggedIn();
    });
  test('Verify Dashboard Elements', async ({ dashboard, loggingIn }) => {
    // Navigate to dashboard (you're already authenticated)

    await dashboard.open('/inventory.html'); // Or just use open() if baseURL is set
    
    await dashboard.assertLoggedIn();
    await expect(dashboard.socialTwitter).toBeVisible();
    await expect(dashboard.socialFacebook).toBeVisible();
    await expect(dashboard.socialLinkedIn).toBeVisible();
    await expect(dashboard.firstProduct).toBeVisible();
    await expect(dashboard.firstProductAddToCartButton).toBeVisible();
  });

  test('Add Product to Cart', async ({ dashboard }) => {
    await dashboard.open('/inventory.html');
    
    await dashboard.firstProductAddToCartButton.click();
    await expect(dashboard.shoppingCartBadge).toHaveText('1');
    await expect(dashboard.firstProductRemoveButton).toBeVisible();
  });
  test('Logout from Dashboard', async ({ dashboard, loggingIn }) => {
    await dashboard.open('/inventory.html');
    
    await dashboard.logout();
    await expect(loggingIn.usernameInput).toBeVisible();
    await expect(loggingIn.passwordInput).toBeVisible();
  });
  test('Social Media Links', async ({ dashboard, context }) => {
    await dashboard.open('/inventory.html');
    
    const [twitterPage] = await Promise.all([
      context.waitForEvent('page'),
      dashboard.socialTwitter.click()
    ]);
    await twitterPage.waitForLoadState();
    expect(twitterPage.url()).toBe('https://x.com/saucelabs');

    const [facebookPage] = await Promise.all([
      context.waitForEvent('page'),
      dashboard.socialFacebook.click()
    ]);
    await facebookPage.waitForLoadState();
    expect(facebookPage.url()).toBe('https://www.facebook.com/saucelabs');

    const [linkedInPage] = await Promise.all([
      context.waitForEvent('page'),
      dashboard.socialLinkedIn.click()
    ]);
    await linkedInPage.waitForLoadState();
    expect(linkedInPage.url()).toBe('https://www.linkedin.com/company/sauce-labs/');
  });
});