import { Locator, Page } from '@playwright/test';

export async function dismissNewsPopup(page: Page): Promise<void> {
  const closeButton: Locator = page.locator(
    'button:has-text("Schliessen"), button:has-text("Schließen"), button:has-text("Close")',
  );
  if (await closeButton.count()) {
    await closeButton.first().click();
    await page.waitForTimeout(500);
  }
}

export async function openHome(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  if (!/geo\.so\.ch\/map/i.test(page.url())) {
    const mapLink = page.locator('a[href*="geo.so.ch/map" i]');
    if (await mapLink.count()) {
      const targetUrl = await mapLink.first().getAttribute('href');
      if (targetUrl) {
        await page.goto(targetUrl);
      }
    } else {
      await page.goto('https://geo.so.ch/map/');
    }
  }

  await page.waitForURL(/geo\.so\.ch\/map/i, { timeout: 15000 });
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#map').waitFor({ state: 'visible', timeout: 30000 });
  await dismissNewsPopup(page);
}
