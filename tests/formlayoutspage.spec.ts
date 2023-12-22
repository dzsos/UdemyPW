import { test, expect } from '@playwright/test';
import { PageManager } from '../helpers/pageManager';

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200/')
})

test('inline form test', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutMenu()
  await pm.onFormLayoutsPage().fillInlineBox(pm.randomString(10), pm.randomEmail(), true)
});

test('using the grid test', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutMenu()
  await pm.onFormLayoutsPage().fillInUsingTheGridBox(pm.randomEmail(), pm.randomString(12), 'Option 2')
});
