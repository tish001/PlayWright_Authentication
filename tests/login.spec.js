import { test, expect } from "@playwright/test";

//UI TESTING
// Verifying all login-related elements and fields are present on the login page.
test("VerifyLoginPageUIElements", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  // grab the correct h2 heading
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
  // console.log(await email.textContent());

  const password = page.locator("//label[@for='password']");
  await expect(password).toBeVisible();
  // console.log(await password.textContent());
});
test("VerifySubmitBtnWithENterPress", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains.com");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Password123");
  await page.waitForTimeout(3000);
  await page.press("//input[@id='password']", "Enter");
  await page.waitForTimeout(3000);
  const successMsg = page.locator("//span[@class='title text-black text-md']");
  await expect(successMsg).toHaveText("Login Successful");
  await page.waitForTimeout(1000);
});

test("TestLoginWithValidCredentials", async ({ page }) => {
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
  await page.waitForTimeout(1000);
});

test("testLoginWithoutEmail", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Password123");
  await page.click("//button[@type='submit']");
  const errMsg = page.locator("//p[@class='text-red-500 text-sm mt-1']");
  await expect(errMsg).toHaveText("Email is a required field");
  await page.waitForTimeout(1000);
});

test("testLoginWithoutPassword", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains.com");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const passErr = page.locator("//p[@class='text-red-500 text-sm mt-1']");
  await expect(passErr).toHaveText("Password is a required field");
  await page.waitForTimeout(1000);
});
test("testLoginWithoutEmailAndPassword", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const errEmailMsg = page
    .locator("//p[@class='text-red-500 text-sm mt-1']")
    .nth(0);
  const passErrMsg = page
    .locator("//p[@class='text-red-500 text-sm mt-1']")
    .nth(1);
  await expect(errEmailMsg).toHaveText("Email is a required field");
  await expect(passErrMsg).toHaveText("Password is a required field");
  await page.waitForTimeout(1000);
});
test("TestLoginWithInValidCredentials", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrain.com");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Passwor");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  await page.waitForTimeout(3000);
  const successMsg = page.locator("//span[@class='title text-black text-md']");
  await expect(successMsg).toHaveText(
    "Your email and password both are invalid!"
  );
  await page.waitForTimeout(1000);
});
test("testLoginWithInvalidPassword", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains.com");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Password12345");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const errMsg = page.locator("//span[@class='title text-black text-md']");
  await expect(errMsg).toHaveText("Your password is invalid!");
  await page.waitForTimeout(1000);
});

test("testLoginWithInvalidEmail", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains001.com");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Password123");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const errMsg = page.locator("//span[@class='title text-black text-md']");
  await expect(errMsg).toHaveText("Your email is invalid!");
  await page.screenshot({ path: "testLoginWithInvalidEmail.png" });
  await page.waitForTimeout(1000);
});
test("TestLogoutBtn", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "qa_testers@qabrains.com");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Password123");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  await expect(page).toHaveURL("https://practice.qabrains.com/?logged=true");
  await page.waitForTimeout(1000);
  await page.click("//button[normalize-space()='Logout']");
  await expect(page).toHaveURL("https://practice.qabrains.com/");
  await page.waitForTimeout(1000);
});
test("TestLogoutBtnHover", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/?logged=true");
  await page.waitForTimeout(3000);
  await page.hover("//button[normalize-space()='Logout']");
});
test("TestLogoutBtnHoverColorChange", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/?logged=true");

  const logoutBtn = page.locator("//button[normalize-space()='Logout']");

  await logoutBtn.hover();
  console.log(logoutBtn);
  await page.waitForTimeout(3000);

  // Assert the button has expected computed style
  await expect(logoutBtn).toHaveCSS(
    "background-color",
    /rgb\(8,\s*30,\s*190\)/
  );
});
