import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

test.describe('QWC2 smoke tests', () => {
  test('loads the main map view with core UI elements', async ({ page }) => {
    await openHome(page);

    await expect(page).toHaveTitle(/Kanton Solothurn/i);

    const mapCanvas = page.locator('#map canvas');
    await expect(mapCanvas).toHaveCount(1, { timeout: 60000 });
    await expect(mapCanvas.first()).toBeVisible({ timeout: 60000 });

    const searchInput = page.locator('input[placeholder="Search place or add map..."]');
    await expect(searchInput).toBeVisible({ timeout: 60000 });
    await expect(searchInput).toHaveAttribute('type', 'text');

    const scaleBar = page.locator('.ol-scale-line-inner');
    await expect(scaleBar).toBeVisible({ timeout: 60000 });
    await expect(scaleBar).toHaveText(/\d+\s*(m|km)/);
  });
});
