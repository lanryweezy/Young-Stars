import { test, expect } from '@playwright/test';

test('capture screenshots of main sections', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');

  // Home
  await page.screenshot({ path: 'verification/screenshots/home.png' });

  // About Us
  await page.click('text="About Us"');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/screenshots/about.png' });

  // Curriculum (Academics)
  await page.click('text="Curriculum"');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/screenshots/curriculum.png' });

  // Admissions
  await page.click('text="Admissions"');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/screenshots/admissions.png' });

  // News & Blog
  await page.click('text="News & Blog"');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/screenshots/news.png' });

  // Contact Us
  await page.click('text="Contact Us"');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/screenshots/contact.png' });
});
