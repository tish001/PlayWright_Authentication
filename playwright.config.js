// // @ts-check
// import { defineConfig, devices } from "@playwright/test";

// export default defineConfig({
//   testDir: "./tests",
//   timeout: 5000 * 100,
//   fullyParallel: true,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 1 : undefined,
//   reporter: "html",
//   use: {
//     trace: "on-first-retry",
//   },

//   projects: [
//     {
//       name: "chromium",
//       use: { ...devices["Desktop Chrome"] },
//     },
//   ],
// });
// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 5 * 60 * 1000, // 5 minutes per test
  fullyParallel: false, // run tests in batches
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 6, // limit concurrency
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    trace: "on-first-retry",
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30 * 1000,
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    // **fresh browser context per test**
    storageState: undefined,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
