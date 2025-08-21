// src/utils/popupHandler.ts
import { Page } from '@playwright/test';

export async function handleGeniusPopup(page: Page) {
  // Wait for homepage to settle first
   await page.waitForTimeout(10000);

  // Now check specifically for the Genius popup button
  const closeBtn = page.locator('button[aria-label="Dismiss sign-in info."]');

  // Give it up to 3 seconds to appear
  if (await closeBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log("🔔 Genius popup appeared, closing it...");
    await closeBtn.click();
    await closeBtn.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
    console.log("✅ Genius popup closed successfully");
  } else {
    console.log("ℹ️ Genius popup not present");
  }
}
