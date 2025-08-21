import { test, expect } from '@playwright/test';
import { HeaderBar } from '../pages/HeaderBar';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { HotelDetailPage } from '../pages/HotelDetailPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CONFIG } from '../utils/config';
import { computeDates } from '../utils/date';
import data from '../data/testData.json';
import { logger } from '../utils/logger';
import { handleGeniusPopup } from '../utils/popuphandler';
import { BookingPage } from '../pages/BookingPage';


test.beforeEach(async ({ page }) => {
  // Run at the start of every test
  await page.goto(CONFIG.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await handleGeniusPopup(page);
  logger.info('Navigated to home');
});


test.describe('Booking.com – Full Assessment Flow', () => {
  test('Booking Flow', async ({ page, context }) => {
    const header = new HeaderBar(page);
    const home = new HomePage(page);
    const results = new ResultsPage(page);
    const testData = (data as any).booking;
    const booking = new BookingPage(page);

    // Steps 2–3: language & currency
    await header.setCurrency();

    // Wait for the language change to take effect
    await page.waitForTimeout(5000);
    
    // Retry setting currency in case of transient issues
    await header.setLanguage();
    logger.info({ language: CONFIG.language, currency: CONFIG.currency }, 'Set language and currency');

    // Step 4: Stays tab
    await header.goToStaysTab();

    // Wait for the language change to take effect
    await page.waitForTimeout(5000);
    

  // Step 5: location
    await home.searchLocation(CONFIG.booking.location);

    // Step 6–7: dates
    // Use human labels Booking picks in the calendar (month-day without year is fine on visible month)
    await home.setDatesByLabels('1 September', '3 September');

    // Step 7.5: guests
    await home.setGuests(testData.adults, testData.children, testData.rooms);

    // Step 8: search
    await home.clickSearch();

    // Step 9: verify search location
    await results.verifySearchLocation(CONFIG.booking.location);

    // Step 10: select property rating
    await results.filterByStars(testData.propertyRating);

    // Step 11: sort by price (lowest first)
    await results.sortByPrice();

    // Step 12: capture second item (name + price incl. tax)
    const capture = await results.captureSecondItem(); 
    // Access capture properties
    console.log('Hotel Name:', capture.name);
    console.log('Hotel Price:', capture.priceText);

    // Step 13: open second item and verify hotel name
    const detailPage = await results.openSecondHotel();
    const hotel = new HotelDetailPage(detailPage);
    await hotel.verifyHotelName(capture.name);

    // Step 14–15: select room and click "I'll reserve"
    await booking.selectRoom('Superior City View King Room', '1');
    await booking.clickReserve();

    // Step 16: verify checkout date, checkin date and amount (light checks)
    const checkout = new CheckoutPage(detailPage);   
    
    // Step 17: fill guest details
    await booking.fillGuestDetails();
    const { nights } = computeDates(testData.checkIn, testData.checkOut);
    await checkout.verifyDatesAndAmount(testData.checkIn, testData.checkOut, nights, capture.priceText);

    // Step 19: fill mandatory fields
    await checkout.fillGuestDetails(testData.firstName, testData.lastName, testData.email);

    // Step 20: Next: Final details
    await checkout.goToFinalDetails();

    // Step 21: verify entered details on final screen
    await checkout.verifyContactDetails(testData.firstName, testData.lastName, testData.email);

    // Step 22: click Booking.com logo to go home
    await detailPage.bringToFront();
    await new HeaderBar(detailPage).goHome();
    await expect(detailPage).toHaveURL(/booking\.com/);

    // Step 23: remove the checkout hotel and verify (if checkout page still open)
    const pages = context.pages();
    const maybeCheckout = pages.find(p => /book|checkout/i.test(p.url()));
    if (maybeCheckout) {
      const checkout2 = new CheckoutPage(maybeCheckout);
      const removed = await checkout2.removeSelectionIfPresent();
      test.info().annotations.push({ type: 'cleanup-removed', description: String(removed) });
      if (!removed) test.info().attach('note', { body: 'Remove control not found; UI may not expose it for guests.' });
    }
  });
});