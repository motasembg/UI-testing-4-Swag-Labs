import {test as base} from '@playwright/test';
import {Login} from '../Pages/Login';
import {Dashboard} from '../Pages/Dashboard';
import {Cart} from '../Pages/Cart';
import {Checkout} from '../Pages/Checkout';

type MyFixtures = {
    // Define fixtures here.
    loggingIn: Login,
    dashboard: Dashboard,
    cart: Cart,
    checkout: Checkout,
    };
export const test = base.extend<MyFixtures>({
    // Implement fixtures here.
    loggingIn: async ({page}, use) => {
        await use(new Login(page));
    },
    dashboard: async ({page}, use) => {
        await use(new Dashboard(page));
    },
    cart: async ({page}, use) => {
        await use(new Cart(page));
    },
    checkout: async ({page}, use) => {
        await use(new Checkout(page));
    },
});

export { expect } from '@playwright/test';