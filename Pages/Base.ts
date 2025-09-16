import {Page, Locator} from '@playwright/test';

export abstract class Base {
    protected readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async open(path: string = '/'){
        await this.page.goto(path);
    }
    protected byTestId(id: string) {
        return this.page.getByTestId(id);
    }
    protected byText(text: string) {
        return this.page.getByText(text);
    }
    protected locator(selector: string){
        return this.page.locator(selector);
    }
}