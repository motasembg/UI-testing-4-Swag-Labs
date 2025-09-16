import { expect } from "@playwright/test";
import { Base } from "./Base";

export class Cart extends Base {
    // Selectors
    readonly cartItems = this.byTestId("inventory-item")
    readonly checkoutButton = this.byTestId('checkout');
    readonly continueShoppingButton = this.byTestId('continue-shopping');
    readonly removeButtons = this.byTestId("remove-sauce-labs-backpack")
    readonly cartItemNames = this.byTestId("inventory-item-name")

    // Methods
    async open() {
        await super.open('/cart.html');
    }

    async assertItemInCart(itemName: string) {
        await expect(this.cartItemNames).toContainText(itemName);
    }

    async removeItem(itemName: string) {
        const itemIndex = await this.cartItemNames.allTextContents().then(names => names.indexOf(itemName));
        if (itemIndex !== -1) {
            await this.removeButtons.nth(itemIndex).click();
        } else {
            throw new Error(`Item with name "${itemName}" not found in cart.`);
        }
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}