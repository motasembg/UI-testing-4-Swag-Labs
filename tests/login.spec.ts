import { test } from "../fixtures/Main";

test.describe('Login Functionality', () => {
    test.beforeEach(async ({loggingIn}) => {
        await loggingIn.open();
    });

    test('Should display error on invalid login', async ({loggingIn}) => {
        await loggingIn.login('invalidUser', 'invalidPass');
        await loggingIn.assertErrorVisible();
    });
    test('Should login successfully with valid credentials', async ({loggingIn, dashboard}) => {
        await loggingIn.login('standard_user', 'secret_sauce');
        await dashboard.assertLoggedIn();
    });
    test('add @ sign to username', async ({loggingIn}) => {
        await loggingIn.login('standard_user@', 'secret_sauce');
        await loggingIn.assertErrorVisible();
    });
    test('add ! sign to password', async ({loggingIn}) => {
        await loggingIn.login('standard_user', 'secret!sauce');
        await loggingIn.assertErrorVisible();
    });
    test('empty username and password', async ({loggingIn}) => {
        await loggingIn.login('', '');
        await loggingIn.assertErrorVisible();
    });
    test('empty username', async ({loggingIn}) => {
        await loggingIn.login('', 'secret_sauce');
        await loggingIn.assertErrorVisible();
    });
    test('empty password', async ({loggingIn}) => {
        await loggingIn.login('standard_user', '');
        await loggingIn.assertErrorVisible();
    });
    test('add 50 characters to username', async ({loggingIn}) => {
        const longUsername = 'a'.repeat(50);
        await loggingIn.login(longUsername, 'secret_sauce');
        await loggingIn.assertErrorVisible();
    });
    test('add 50 characters to password', async ({loggingIn}) => {
        const longPassword = 'a'.repeat(50);
        await loggingIn.login('standard_user', longPassword);
        await loggingIn.assertErrorVisible();
    });
    test('sql injection attempt in username', async ({loggingIn}) => {
        await loggingIn.login("standard_user' OR '1'='1", 'secret_sauce');
        await loggingIn.assertErrorVisible();
    });
});