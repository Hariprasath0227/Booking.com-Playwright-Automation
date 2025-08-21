import { Page, expect } from '@playwright/test';

export class ResultsPage {
  constructor(private page: Page) {}

  async verifySearchLocation(location: string) {
    const locator = this.page.locator('[data-testid="search-location"]'); 
    await expect(locator).toContainText(location);
  }

  async filterByStars(stars: number) {
    const starFilter = this.page.locator(`[data-filters-item*="class:${stars}"] input[type=checkbox]`);
    await starFilter.check();
    await this.page.waitForLoadState('networkidle');
  }

  async sortByPrice() {
    await this.page.locator('[data-testid="sorters-dropdown-trigger"]').click();
    await this.page.getByText('Price (lowest first)').click();
    await this.page.waitForLoadState('networkidle');
  }

  async captureSecondItem() {
    const secondHotel = this.page.locator('[data-testid="property-card"]').nth(1);
    const name = await secondHotel.locator('[data-testid="title"]').innerText();
    const priceText = await secondHotel.locator('[data-testid="price-and-discounted-price"]').innerText();
    return { name, priceText };
  }

  async openSecondHotel() {
    const secondHotel = this.page.locator('[data-testid="property-card"]').nth(1);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      secondHotel.click()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}
