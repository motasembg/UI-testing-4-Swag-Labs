import { test, expect } from '../fixtures/Main';
import { Login } from '../Pages/Login';
import { Cart } from '../Pages/Cart';
import { Dashboard } from '../Pages/Dashboard';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ loggingIn, dashboard, cart }) => {
    await loggingIn.open();
    await loggingIn.login('standard_user', 'secret_sauce');
    await dashboard.assertLoggedIn();
    await dashboard.firstProductAddToCartButton.click();
    await cart.open();
  });
  test('should display added item in cart', async ({ cart }) => {
    await cart.assertItemInCart('Sauce Labs Backpack');
  });

  test('should remove item from cart', async ({ cart }) => {
    await cart.removeItem('Sauce Labs Backpack');
    await expect(cart.cartItems).toHaveCount(0);
  });

  test('should proceed to checkout', async ({ cart, page }) => {
    await cart.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('should continue shopping', async ({ cart, dashboard }) => {
    await cart.continueShopping();
    await expect(dashboard.firstProduct).toBeVisible();
  });
});