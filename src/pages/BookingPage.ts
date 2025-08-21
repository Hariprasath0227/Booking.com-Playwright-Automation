import { Page, expect } from '@playwright/test';
import testData from '../data/testData.json';

export class BookingPage {
  constructor(private page: Page) {}

  // Select a room by its row name and option
  async selectRoom(roomName: string, optionValue: string) {
    const roomRow = this.page.getByRole('row', { name: roomName });

    // Assert the room row is visible
    await expect(roomRow).toBeVisible();

    const select = roomRow.getByTestId('select-room-trigger');
    await expect(select).toBeVisible();
    await select.selectOption(optionValue);

    // Assertion: verify room is selected
    const selectedValue = await select.inputValue();
    expect(selectedValue).toBe(optionValue);
  }

  // Click reserve button
  async clickReserve() {
    const reserveButton = this.page.getByRole('button', { name: "I'll reserve" });

    // Assert button is visible and enabled before clicking
    await expect(reserveButton).toBeVisible();
    await expect(reserveButton).toBeEnabled();

    await reserveButton.click();

    // Assertion: verify button is no longer visible (clicked successfully)
    await expect(reserveButton).toBeHidden();
  }

  // Fill guest details
  async fillGuestDetails() {
    const { firstName, lastName, email, phone } = testData.userDetails;

    const firstInput = this.page.getByTestId('user-details-firstname');
    const lastInput = this.page.getByTestId('user-details-lastname');
    const emailInput = this.page.getByTestId('user-details-email');
    const phoneInput = this.page.getByTestId('phone-number-input');

    // Assert all inputs are visible and enabled
    await expect(firstInput).toBeVisible();
    await expect(firstInput).toBeEnabled();
    await expect(lastInput).toBeVisible();
    await expect(lastInput).toBeEnabled();
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEnabled();
    await expect(phoneInput).toBeVisible();
    await expect(phoneInput).toBeEnabled();

    // Fill inputs
    await firstInput.fill(firstName);
    await lastInput.fill(lastName);
    await emailInput.fill(email);
    await phoneInput.fill(phone);

    // Assertion: verify input values
    await expect(firstInput).toHaveValue(firstName);
    await expect(lastInput).toHaveValue(lastName);
    await expect(emailInput).toHaveValue(email);
    await expect(phoneInput).toHaveValue(phone);
  }

  // Proceed to final details
  async goToFinalDetails() {
    const nextButton = this.page.getByRole('button', { name: 'Next: Final details' });

    // Assert button is visible and enabled
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();

    await nextButton.click();

    // Assertion: verify URL contains 'final' (Booking.com final page)
    await expect(this.page).toHaveURL(/final/);

    // Optional: verify that final details form is visible
    const finalDetailsForm = this.page.locator('#final-details-form');
    await expect(finalDetailsForm).toBeVisible();
  }
}
