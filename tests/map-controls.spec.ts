import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

test.describe('Map control interactions', () => {
  test.beforeEach(async ({ page }) => {
    await openHome(page);
  });

  test('zoom controls update the visible scale', async ({ page }) => {
    const zoomInButton = page.locator('button[title="Zoom in"]');
    await expect(zoomInButton).toBeVisible({ timeout: 60000 });

    const scaleLocator = page.locator('.ol-scale-line-inner');
    await expect(scaleLocator).toBeVisible({ timeout: 60000 });
    const initialScale = (await scaleLocator.innerText()).trim();

    await zoomInButton.click();
    await expect(scaleLocator).not.toHaveText(initialScale, { timeout: 10000 });

    const zoomedScale = (await scaleLocator.innerText()).trim();
    expect(zoomedScale).not.toEqual(initialScale);

    await page.locator('button[title="Zoom out"]').click();
    await expect(scaleLocator).toHaveText(initialScale, { timeout: 10000 });
  });

  test('background layer switcher lists available basemaps', async ({ page }) => {
    const backgroundButton = page.locator('button[title="Switch background"]');
    await expect(backgroundButton).toBeVisible({ timeout: 60000 });
    await backgroundButton.click();

    const layerItems = page.locator('.background-switcher-item');
    await expect(layerItems.first()).toBeVisible();
    expect(await layerItems.count()).toBeGreaterThan(0);

    const activeLayer = page.locator('.background-switcher-item-active');
    await expect(activeLayer).toHaveCount(1);

    const alternativeLayer = layerItems.filter({ hasText: 'Luftbild' });
    if (await alternativeLayer.count()) {
      await alternativeLayer.first().click();
      await expect(page.locator('.background-switcher-item-active')).toContainText('Luftbild');
    }
  });
});
