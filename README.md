# Swivel – Booking.com Assessment (Playwright + TypeScript)

project-root/
│
├─ pages/                  # Page Object Model classes
│   ├─ HomePage.ts
│   ├─ ResultsPage.ts
│   ├─ HotelDetailPage.ts
│   ├─ BookingPage.ts
│   └─ CheckoutPage.ts
│
├─ testData/               # Test data & results
│   └─ testData.json       # Input and output values for tests
│
├─ utils/                  # Utility classes
│   ├─ config.ts           # Reads .env and exports CONFIG object
│   ├─ logger.ts           # Logger configuration (pino)
│   └─ popuphandler.ts     # Handles popups
│
├─ tests/                  # Test spec files
│   └─ bookingFlow.spec.ts
│
├─ .env                    # Environment variables
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

## Setup
```bash
git clone <your-repo-url> booking-automation
cd booking-automation
cp .env.sample .env   # adjust values if needed
npm install
npm run prepare


🛠️ Challenges Faced #

1.Dynamic locators on Booking.com

2.Many elements (rooms, buttons) have dynamic IDs.

*Solution: Used getByRole, getByTestId, and filters like nth() to reliably locate elements.

1.Date picker complexity

2.Selecting check-in/out required JavaScript-based manipulation.

*Solution: Implemented selectDateJS() utility and used offsets from today.

1.Popup interruptions

2.Popups like Genius offers sometimes blocked interactions.

*Solution: Added a handleGeniusPopup utility to close popups if present.

1.Assertions for dynamic content

2.Hotel names, prices, and dates vary.

*Solution: Captured values dynamically, then asserted against expected/test data.

1.Logger integration

2.Needed clear console logs for each step.

*Solution: Integrated pino logger with logger.info() for key actions and verification.

1.Page Object Model structure

2.Separating actions (BookingPage) vs verifications (CheckoutPage) required careful planning.

*Solution: Modular POM design with reusable methods and assertions.

📌 Notes

Browser support: Chrome, Firefox, WebKit.

Reporting: Playwright HTML and console logs via logger.

Test execution: Modular; can run specific page flows independently.

Extensibility: Easily add more test scenarios by extending POM classes.


