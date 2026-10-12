import { test as base, expect, type Page } from '@playwright/test';

type AuthFixtures = {
  adminPage: Page;
  hrPage: Page;
  employeePage: Page;
  employeeToken: string;
};

export const test = base.extend<AuthFixtures>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/admin.json' });
    await use(await context.newPage());
    await context.close();
  },
  hrPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/hr.json' });
    await use(await context.newPage());
    await context.close();
  },
  employeePage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/employee.json' });
    await use(await context.newPage());
    await context.close();
  },
  employeeToken: async ({ request }, use) => {
    const response = await request.post('/api/login', {
      data: { username: 'emp.ram', password: 'Sajilo@123' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    await use(body.token);
  },
});

export { expect };