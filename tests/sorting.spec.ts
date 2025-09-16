import { test, expect } from '../fixtures/Main';

test.describe('Sotring Products', () => {
  test.beforeEach(async ({ loggingIn, dashboard, cart }) => {
    await loggingIn.open();
    await loggingIn.login('standard_user', 'secret_sauce');
    await dashboard.assertLoggedIn();
  });
    test('should sort products A to Z', async ({ dashboard }) => {
        await dashboard.sortBy('az');
        const name = await dashboard.getItemName();
        const sortedName = [...name].sort();
        expect(name).toEqual(sortedName);
       });
    test('should sort products Z to A', async ({ dashboard }) => {
        await dashboard.sortBy('za');
        const name = await dashboard.getItemName();
        const sortedName = [...name].sort().reverse();
        expect(name).toEqual(sortedName);
       });
    test('should sort products Low to High', async ({ dashboard }) => {
        await dashboard.sortBy('lohi');
        const price = await dashboard.getItemPrice();
        const sortedPrice = [...price].sort((a, b) => a - b);
        expect(price).toEqual(sortedPrice);
       });
    test('should sort products High to Low', async ({ dashboard }) => {
        await dashboard.sortBy('hilo');
        const price = await dashboard.getItemPrice();
        const sortedPrice = [...price].sort((a, b) => b - a);
        expect(price).toEqual(sortedPrice);
       });
});