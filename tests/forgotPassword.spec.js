import { test, expect } from "@playwright/test";
//UI TESTING
// Verifying all login-related elements and fields are present on the Forgot Password page.
test("VerifyForgotPasswordPageUIElements", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.click("//span[normalize-space()='Forgot Password']");
  await page.waitForTimeout(3000);
  const heading = page.getByRole("heading", {
    level: 2,
    name: "User Authentication",
  });
  await expect(heading).toBeVisible();
  const email = page.locator("//label[@for='email']");
  await expect(email).toBeVisible();
  await page.waitForTimeout(3000);

  console.log(await email.textContent());
});
test("TestResetPasswordWithValidEmail", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.click("//span[normalize-space()='Forgot Password']");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains.com");
  await page.waitForTimeout(3000);
  await page.click("//button[normalize-space()='Reset Password']");
  await page.waitForTimeout(3000);
  const successMsg = page.locator("//span[@class='title text-black text-md']");
  await expect(successMsg).toHaveText("Password is reset successfully.");
  await page.waitForTimeout(1000);
});
test("TestResetPasswordWithInvalidEmail", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/forgot-password");

  const emailInput = page.locator("#email");
  await page.waitForTimeout(3000);

  // Fill with invalid email
  await emailInput.fill("nfgfngf");
  await page.click("button[type='submit']");
  await page.waitForTimeout(3000);

  // Get the validation message (browser built-in)
  const validationMessage = await emailInput.evaluate(
    (el) => el.validationMessage
  );

  console.log("Validation message:", validationMessage);

  // Assert it contains '@' error
  expect(validationMessage).toContain("include an '@'");
});
test("TestResetPasswordWithWhiteSpaces", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/forgot-password");
  await page.waitForTimeout(3000);
  const emailInput = page.locator("#email");

  await emailInput.fill("       ");
  await page.click("//button[normalize-space()='Reset Password']");
  await page.waitForTimeout(3000);
  const errMsg = page.locator("//p[@class='text-red-500 text-sm mt-1']");
  await expect(errMsg).toHaveText("Email is a required field");
  await page.waitForTimeout(1000);
});
