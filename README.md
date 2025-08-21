# Swivel – Booking.com Assessment (Playwright + TypeScript)

This project automates all **21 steps** of the Booking.com assessment using Playwright.  
It follows best practices with **Page Object Model (POM)**, **parametrized test data**, **multi-browser support**, and **CI/CD integration**.

---

## 📂 Project Structure

project-root/
│
├─ pages/ # Page Object Model classes
│ ├─ HomePage.ts
│ ├─ ResultsPage.ts
│ ├─ HotelDetailPage.ts
│ ├─ BookingPage.ts
│ └─ CheckoutPage.ts
│
├─ testData/ # Test data & results
│ └─ testData.json # Input and output values for tests
│
├─ utils/ # Utility classes
│ ├─ config.ts # Reads .env and exports CONFIG object
│ ├─ logger.ts # Logger configuration (pino)
│ └─ popuphandler.ts # Handles popups
│
├─ tests/ # Test spec files
│ └─ bookingFlow.spec.ts
│
├─ .env # Environment variables
├─ playwright.config.ts
├─ package.json
└─ README.md


This project automates all 21 steps of the Booking.com assessment using Playwright, with:
- Page Object Model
- Parametrized test data & `.env` configs
- Multi-browser support (Chromium/Firefox/WebKit)
- Allure reporting
- Logging via `pino`
- GitHub Actions CI

## Prerequisites
- Node.js 18+ (recommended Node 20)
- Git
- (Optional) Allure CLI: https://docs.qameta.io/allure/#_get_started

## ⚡ Setup & Installation

```bash
# Clone the repository
git clone <your-repo-url> booking-automation
cd booking-automation

# Setup environment variables
cp .env.sample .env   # adjust values if needed

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Prepare Husky & configs
npm run prepare


🛠️ Challenges Faced & Solutions

Dynamic Locators on Booking.com

Issue: Many elements (rooms, buttons) have dynamic IDs.

Solution: Used getByRole, getByTestId, and filters like nth().

Date Picker Complexity

Issue: Selecting check-in/out required dynamic JavaScript-based handling.

Solution: Implemented selectDateJS() utility with offsets from today.

Popup Interruptions

Issue: Genius offers sometimes blocked interactions.

Solution: Added handleGeniusPopup utility to auto-close popups.

Assertions for Dynamic Content

Issue: Hotel names, prices, and dates vary.

Solution: Captured values dynamically & asserted against test data.

Logger Integration

Issue: Needed better visibility of test execution.

Solution: Integrated pino logger with logger.info().

POM Structure Planning

Issue: Splitting actions vs verifications required care.

Solution: Modular POM design with reusable methods.

📌 Notes

Browser support: Chrome, Firefox, WebKit.

Reporting: Playwright HTML and console logs via logger.

Test execution: Modular; can run specific page flows independently.

Extensibility: Easily add more test scenarios by extending POM classes.

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.
