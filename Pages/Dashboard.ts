import { expect } from "@playwright/test";
import { Base } from "./Base";

export class Dashboard extends Base {
  // Main elements on the dashboard page
  readonly primaryHeader = this.byTestId("primary-header");
  readonly secondaryHeader = this.byTestId("secondary-header");
  readonly shoppingCartIcon = this.byTestId("shopping-cart-link");
  readonly footer = this.byTestId("footer");
  readonly logoutButton = this.byTestId("logout-sidebar-link");
  // Social media links
  readonly socialTwitter = this.byTestId("social-twitter");
  readonly socialFacebook = this.byTestId("social-facebook");
  readonly socialLinkedIn = this.byTestId("social-linkedin");
  // Some product elements
  readonly firstProduct = this.byText("Sauce Labs Backpack");
  readonly secondProduct = this.byText("Sauce Labs Bike Light");
  readonly firstProductAddToCartButton = this.byTestId(
    "add-to-cart-sauce-labs-backpack"
  );

  // icons Changes for assertion
  readonly shoppingCartBadge = this.byTestId("shopping-cart-badge");
  readonly firstProductRemoveButton = this.byTestId(
    "remove-sauce-labs-backpack"
  );

  readonly itemName = this.byTestId('inventory_item_name');
  readonly itemPrice = this.byTestId('inventory_item_price');

  // Sorting dropdown
  readonly sortingDropdown = this.byTestId("product-sort-container");

  async assertLoggedIn() {
    await expect(this.shoppingCartIcon).toBeVisible();
    await expect(this.primaryHeader).toContainText("Swag Labs");
    await expect(this.footer).toBeVisible();
  }
  async logout() {
    await this.byText("Open Menu").click();
    await this.logoutButton.click();
  }

  async sortBy(value: "az" | "za" | "lohi" | "hilo") {
    await this.sortingDropdown.selectOption(value);
  }
  async getItemName(): Promise<string[]> {
    return await this.itemName.allTextContents();
  }

  async getItemPrice(): Promise<number[]> { 
    const prices = await this.itemPrice.allTextContents();
    return prices.map(price => Number(price.replace('$', '')));
  }
}
