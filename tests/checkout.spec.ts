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
    test('should display added item in cart', async ({ cart, page, checkout }) => {
        await cart.assertItemInCart('Sauce Labs Backpack');
        await cart.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/); 
        await checkout.fillCheckoutInformation('John', 'Doe', '12345');
        await checkout.continueToOverview();
        await expect(page).toHaveURL(/.*checkout-step-two.html/); 
        await checkout.assertItemInOverview('Sauce Labs Backpack');
        await checkout.finishCheckout();
        await expect(page).toHaveURL(/.*checkout-complete.html/); 
        await checkout.assertOrderComplete();
       });
    test('should show error message when checkout information is incomplete', async ({ cart, page, checkout }) => {
        await cart.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/); 
        await checkout.fillCheckoutInformation('John', '', ''); 
        await checkout.continueToOverview();
        await checkout.assertErrorMessage('Error: Last Name is required');
       });
    test('should cancel checkout and return to cart', async ({ cart, page, checkout }) => {
        await cart.checkoutButton.click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/); 
        await checkout.cancelCheckout();
        await expect(page).toHaveURL(/.*cart.html/); 
        await cart.assertItemInCart('Sauce Labs Backpack');
       });
}); 