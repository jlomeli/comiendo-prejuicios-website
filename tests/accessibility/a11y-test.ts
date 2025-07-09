import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

test('should not have any automatically detectable accessibility issues', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to your local dev server
  await page.goto('http://localhost:4321');
  
  // Analyze the page with axe
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
  
  await browser.close();
});