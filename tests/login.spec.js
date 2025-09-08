import { test, expect } from "@playwright/test";
import { CLIENT_RENEG_LIMIT } from "tls";

//UI TESTING
// Verifying all login-related elements and fields are present on the login page.
test("VerifyLoginPageUIElements", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  // grab the correct h2 heading (not sidebar)
  const heading = page.getByRole("heading", {
    level: 2,
    name: "User Authentication",
  });
  await expect(heading).toBeVisible();
  await page.waitForTimeout(2000);
  const loginTitle = page.locator('div[data-slot="alert-title"]');
  await expect(loginTitle).toBeVisible();
  await page.waitForTimeout(2000);

  //  console.log(await heading.textContent());
  //  console.log(await loginTitle.textContent());
  const email = page.locator("//label[@for='email']");
  await expect(email).toBeVisible();
  console.log(await email.textContent());

  const password = page.locator("//label[@for='password']");
  await expect(password).toBeVisible();
  console.log(await password.textContent());
});

//positive testcases
//Verify that the user will be able to log in with their account with the correct credential and pressing 'login' button
test("LoginTestWithValid", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains.com");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Password123");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  await page.waitForTimeout(3000);
  const successMsg = page.locator("//span[@class='title text-black text-md']");
  await expect(successMsg).toHaveText("Login Successful");
});
//Verify the error message should display after just entering an email address and leaving the password field blank
test("BlankPassword", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains.com");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  // await expect(page.getByText('Password is a required field')).toBeVisible();
  const passErr = page.locator("//p[@class='text-red-500 text-sm mt-1']");
  await expect(passErr).toHaveText("Password is a required field");
  await page.waitForTimeout(3000);
});
