import { expect } from "@playwright/test";
import { Base } from "./Base";
import { Cart } from "./Cart";

export class Checkout extends Base {
    // Selectors
    readonly firstNameInput = this.byTestId('firstName');
    readonly lastNameInput = this.byTestId('lastName');
    readonly postalCodeInput = this.byTestId('postalCode');
    readonly continueButton = this.byTestId('continue');
    readonly finishButton = this.byTestId('finish');
    readonly cancelButton = this.byTestId('cancel');
    readonly errorMessage = this.byTestId('error');

    // Methods
    async open() {
        const cart = new Cart(this.page);
        await cart.open();
        await cart.proceedToCheckout();
    }
    
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

  
    async assertItemInOverview(itemName: string) {
        const item = this.byText(itemName);
        await expect(item).toBeVisible();
    }
    
    async assertOrderComplete() {
        await expect(this.byTestId("complete-header")).toBeVisible();
    }

    async assertErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}   