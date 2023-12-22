import { test, expect } from '@playwright/test';
import { PageManager } from '../helpers/pageManager';

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200/')
})

test('inline form test', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutMenu()
  await pm.onFormLayoutsPage().fillInlineBox('Grant Hill', 'gh@gmail.com', true)
});
