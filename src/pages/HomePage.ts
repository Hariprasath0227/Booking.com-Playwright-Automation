import { Page, expect } from '@playwright/test';
import { CONFIG } from '../utils/config';
import { handleGeniusPopup } from '../utils/popuphandler';
import { logger } from '../utils/logger';


export class HomePage {
  constructor(private page: Page) {}


  async goto() {
    await this.page.goto(CONFIG.url);

  // Handle Genius popup if it shows up
  await handleGeniusPopup(this.page);
  }

  async searchLocation(location: string) {
    const input = this.page.locator('input[name="ss"]').first()
      .or(this.page.getByPlaceholder(/where are you going\?/i));
    await input.click();
    await input.fill(location);
    // pick first suggestion
    const suggestion = this.page.locator('[data-testid="autocomplete-results"] [data-testid="autocomplete-result"]').first();
    await suggestion.waitFor();
    await suggestion.click();
    console.log('Location selected:', location);
  }

  async openCalendar() {
    const startField = this.page.locator('[data-testid="date-display-field-start"]').first()
      .or(this.page.getByText(/check-in date/i).first());
    await startField.click();
  }

  async setDatesByLabels(checkInLabel: string, checkOutLabel: string) {
    await this.openCalendar();
    await this.page.getByRole('button', { name: new RegExp(`\\b${checkInLabel}\\b`, 'i') }).click();
    await this.page.getByRole('button', { name: new RegExp(`\\b${checkOutLabel}\\b`, 'i') }).click();
    console.log('Dates picked:', checkInLabel, '→', checkOutLabel);
  }

  async setGuests(adults = 2, children = 0, rooms = 1) {
    await this.page.getByTestId('occupancy-config').click();
    // Adults
    const incAdults = this.page.getByRole('button', { name: /increase number of adults/i }).first()
      .or(this.page.locator('[data-testid="stepper-adults-increase-button"]').first());
    const decAdults = this.page.getByRole('button', { name: /decrease number of adults/i }).first()
      .or(this.page.locator('[data-testid="stepper-adults-decrease-button"]').first());
    // Children
    const incChildren = this.page.getByRole('button', { name: /increase number of children/i }).first()
      .or(this.page.locator('[data-testid="stepper-children-increase-button"]').first());
    const decChildren = this.page.getByRole('button', { name: /decrease number of children/i }).first()
      .or(this.page.locator('[data-testid="stepper-children-decrease-button"]').first());
    // Rooms
    const incRooms = this.page.getByRole('button', { name: /increase number of rooms/i }).first()
      .or(this.page.locator('[data-testid="stepper-rooms-increase-button"]').first());
    const decRooms = this.page.getByRole('button', { name: /decrease number of rooms/i }).first()
      .or(this.page.locator('[data-testid="stepper-rooms-decrease-button"]').first());

    // Reset to Booking defaults quickly: Adults 2, Children 0, Rooms 1
    // Then adjust deltas from defaults
    // Adults default 2:
    for (let i = 0; i < 3; i++) await decAdults.click().catch(() => {});
    for (let i = 0; i < adults; i++) await incAdults.click();

    // Children default 0:
    for (let i = 0; i < 3; i++) await decChildren.click().catch(() => {});
    for (let i = 0; i < children; i++) await incChildren.click();

    // Rooms default 1:
    for (let i = 0; i < 3; i++) await decRooms.click().catch(() => {});
    for (let i = 0; i < rooms; i++) await incRooms.click();

    await this.page.getByRole('button', { name: /^done$/i }).click();
    console.log('Guests set:', { adults, children, rooms });
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: /^search$/i }).first().click();
  }
}