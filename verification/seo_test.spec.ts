import { test, expect } from '@playwright/test';

test('SEO metadata updates on page change', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Wait for the app to load
  await page.waitForSelector('text=Young Stars');

  // Check Home title
  expect(await page.title()).toBe('Young Stars - Home');

  // Navigate to About
  await page.click('nav >> text=About Us');
  await page.waitForTimeout(500); // Wait for state update
  expect(await page.title()).toBe('Young Stars - About');

  // Check meta description
  const description = await page.getAttribute('meta[name="description"]', 'content');
  expect(description).toContain('Learn about Young Stars International School');

  // Navigate to Admissions
  await page.click('nav >> text=Admissions');
  await page.waitForTimeout(500);
  expect(await page.title()).toBe('Young Stars - Admissions');

  const admissionsDesc = await page.getAttribute('meta[name="description"]', 'content');
  expect(admissionsDesc).toContain('Join the best school in Ado Ekiti');
});
