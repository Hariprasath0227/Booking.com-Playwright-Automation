import { Page, expect } from '@playwright/test';

export class HotelDetailPage {
  constructor(private page: Page) {}

  async verifyHotelName(expectedName: string) {
    const hotelName = await this.page.locator('[data-testid="hotel-name"]').innerText();
    await expect(hotelName).toContain(expectedName);
  }

  async selectRoom() {
    await this.page.locator('[data-testid="select-room"]').first().click();
    await this.page.waitForLoadState('networkidle');
  }
}
