import { Page, expect } from '@playwright/test';
import { CONFIG } from '../utils/config';

export class HeaderBar {
  constructor(private page: Page) {}

async setCurrency() {
  // Open the currency picker
  await this.page.getByTestId('header-currency-picker-trigger').click();

  // Click the desired currency inside "Suggested for you" section
  const currencyButton = this.page
    .getByTestId('Suggested for you')
    .getByRole('button', { name: CONFIG.currency });

  await currencyButton.waitFor({ state: 'visible', timeout: 10000 });
  await currencyButton.click();
}

async setLanguage() {
  // Open the language picker
  await this.page.getByTestId('header-language-picker-trigger').click();

  // Click the desired language inside "Suggested for you" section
  const languageButton = this.page
    .getByTestId('Suggested for you')
    .getByRole('button', { name: CONFIG.language });

  await languageButton.waitFor({ state: 'visible', timeout: 10000 });
  await languageButton.click();
}


async goToStaysTab() {
  const staysLink = this.page
    .getByTestId('header-xpb')
    .getByRole('link', { name: 'Stays' });

  // Wait until the link is visible (max 10s)
  await staysLink.waitFor({ state: 'visible', timeout: 10000 });

  // Ensure it’s interactable, then click
  await staysLink.click();
  await expect(this.page.getByTestId('searchbox-layout-wide')).toBeVisible();
  }

async goHome() {
    const logo = this.page.locator('[data-testid="header-logo"]').first()
      .or(this.page.getByRole('link', { name: /booking\.com/i }));
    await logo.click();
    await expect(this.page).toHaveURL(/booking\.com/);
  }
}

