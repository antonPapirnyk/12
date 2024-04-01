// @ts-check
const { defineConfig, devices, chromium } = require("@playwright/test");
const { expect } = require('@playwright/test');
const { default: playwrightApiMatchers } = require('odottaa');

expect.extend(playwrightApiMatchers);
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  //fullyParallel: false,
  reporter: "allure-playwright",
  use: {
    baseURL: 'https://beta-candidate.appollo.co.uk/',
    browserName: "chromium",
    headless: false,
    retry: 2,
    workers: 1,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
    projects: [
      {
        name: "setup",
        testMatch: /,*\.setup\.js/,
      },
      {
        name: "chromium",
        use: {
          ...devices["Desktop Chrome"],
        },
       // dependencies: ['setup']
      },
      // {
      //   name: "webkit",
      //   use: {
      //     browserName: "webkit",
      //     ...devices["Pixel 4"],
      //   },
      // }

      /* Test against mobile viewports. */
      // {
      //   name: 'Mobile Chrome',
      //   use: { ...devices['Pixel 5'] },
      // },
      // {
      //   name: 'Mobile Safari',
      //   use: { ...devices['iPhone 12'] },
      // },

      /* Test against branded browsers. */
      // {
      //   name: 'Microsoft Edge',
      //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
      // },
      // {
      //   name: 'Google Chrome',
      //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      // },
    ],
  
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
