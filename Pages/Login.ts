import {expect} from '@playwright/test';
import {Base} from './Base';

export class Login extends Base {
    readonly usernameInput = this.byTestId('username');
    readonly passwordInput = this.byTestId('password');
    readonly loginButton = this.byTestId('login-button');
    readonly errorButton = this.byTestId('error-button');
    readonly errorMessage = this.byTestId('error');
    readonly svgClose = this.locator("div.login-box div:nth-child(1) svg path");

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertErrorVisible() {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.svgClose).toBeVisible();
    }
}