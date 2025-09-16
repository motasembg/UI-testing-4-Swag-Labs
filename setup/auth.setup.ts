import { test as base } from '@playwright/test';
import { Login } from '../Pages/Login';
import { expect } from '@playwright/test';

export const authTest = base.extend<{ authState: string }>({
  authState: async ({ page }, use) => {
    const loginPage = new Login(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
    // Save storage state into the file.
    const path = '../auth.json';
    await page.context().storageState({ path });
    await use(path);
  }
});

export { expect } from '@playwright/test';