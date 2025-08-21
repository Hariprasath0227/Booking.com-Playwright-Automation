import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  timeout: 120000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  retries: 1,
  reporter: [['line'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.booking.com',
    headless: true,
    viewport: { width: 1366, height: 768 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ]
});
