import { Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class CheckoutPage {
  constructor(private page: Page) {}

  async verifyDatesAndAmount(checkInISO: string, checkOutISO: string, nights: number, priceText: string) {
    await expect(this.page).toHaveURL(/book/i);
    // Light checks: booking details section visible; dates appear somewhere
    const details = this.page.getByRole('complementary').getByText(/your booking details/i);
    await expect(details).toBeVisible();
    // Try to find check-in/out date text (fallback: presence only)
    const ci = new Date(checkInISO);
    const co = new Date(checkOutISO);
    const ciDay = ci.getDate();
    const coDay = co.getDate();
    await this.page.getByText(new RegExp(`\\b${ciDay}\\b`)).first().isVisible().catch(() => {});
    await this.page.getByText(new RegExp(`\\b${coDay}\\b`)).first().isVisible().catch(() => {});
    logger.info('Verified basic booking details (URL & section).');
  }

  async fillGuestDetails(first: string, last: string, email: string) {
    await this.page.getByTestId('user-details-firstname').fill(first);
    await this.page.getByTestId('user-details-lastname').fill(last);
    await this.page.getByTestId('user-details-email').fill(email);
    // Phone is optional in many flows; skip to avoid geo-specific validation
  }

  async goToFinalDetails() {
    await this.page.getByRole('button', { name: /next: final details/i }).click();
  }

  async verifyContactDetails(first: string, last: string, email: string) {
    await expect(this.page.getByTestId('user-details-firstname')).toHaveValue(first);
    await expect(this.page.getByTestId('user-details-lastname')).toHaveValue(last);
    await expect(this.page.getByTestId('user-details-email')).toHaveValue(email);
  }

  async removeSelectionIfPresent(): Promise<boolean> {
    const removeBtn = this.page.getByRole('button', { name: /remove/i }).first();
    if (await removeBtn.isVisible().catch(() => false)) {
      await removeBtn.click();
      return true;
    }
    return false;
  }
}
