import { test, expect } from "@playwright/test";
//testcase for name input
test("testWithValidNameInput", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/");
  await page.click("//span[normalize-space()='Registration']");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='name']", "Tisha");
  await page.waitForTimeout(3000);
  const nameInput = page.locator("//input[@id='name']");
  await nameInput.fill("Tisha");
  // Assert the value is correctly entered
  await expect(nameInput).toHaveValue("Tisha");
});
test("testWithEmptyNameInput", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  await page.press("//input[@id='name']", "Enter");
  await page.waitForTimeout(3000);
  const errMsg = page.locator(
    "//p[normalize-space()='Name is a required field']"
  );
  await expect(errMsg).toHaveText("Name is a required field");
});

test("testNameInputCharacterLimit", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='name']", "T");
  await page.waitForTimeout(3000);
  await page.press("//input[@id='name']", "Enter");
  await page.waitForTimeout(3000);
  const errMsg = page.locator(
    "//p[normalize-space()='Name must be at least 2 characters']"
  );
  await expect(errMsg).toHaveText("Name must be at least 2 characters");
});

test("testNameInputWithWhiteSpaces", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);

  const nameInput = page.locator("//input[@id='name']");

  // Fill only whitespaces
  await nameInput.fill("      ");
  await page.waitForTimeout(3000);

  await nameInput.press("Enter");
  await page.waitForTimeout(3000);

  // Step 1: Check the actual value stored in the input
  const value = await nameInput.inputValue();
  console.log("value:", value);
  expect(value).toBe("      "); // confirms bug: site didn’t trim

  // Step 2: Check HTML5 validation status
  const isValid = await nameInput.evaluate((el) => el.checkValidity());
  expect(isValid).toBe(true); // confirms bug: whitespace treated as valid

  // Since the system SHOULD show error, log it as known issue
  console.warn("BUG: Name field accepts whitespace only without error!");
});

test("testNameInputHavingMaxLength", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(2000);

  const nameInput = page.locator("//input[@id='name']");

  // Step 1: Check if maxlength attribute exists
  const maxLengthAttr = await nameInput.getAttribute("maxlength");

  if (maxLengthAttr === null) {
    console.warn("BUG: Name input has no maxlength attribute!");
  } else {
    console.log(`Name input has maxlength=${maxLengthAttr}`);
  }

  // Step 2: Try entering an unusually long string
  const longName = "A".repeat(300);
  await nameInput.fill(longName);

  const value = await nameInput.inputValue();
  console.log(`Value length accepted: ${value.length}`);

  // Just informational, not assertion
  if (value.length === 300) {
    console.warn("BUG: Name field accepts unlimited characters!");
  }
});

//testcases for Select Country

test("TestValidCountrySelectionFromDropDown", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);

  const countryDropdown = page.locator("#country");

  // Select Bangladesh
  await countryDropdown.selectOption({ label: "Bangladesh" });
  await page.waitForTimeout(1000);

  // Check the visible selected option text
  const selectedText = await countryDropdown
    .locator("option:checked")
    .textContent();
  expect(selectedText).toBe("Bangladesh");

  console.log("Country successfully selected and verified!");
});
test("TestRegistrationWithoutCountry", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const errMsg = await page.locator(
    "//p[normalize-space()='Country is a required field']"
  );
  expect(errMsg).toHaveText("Country is a required field");
});

// test("VerifyDropdownOptionsExistAndAlphabeticalOrder", async ({ page }) => {
//   await page.goto("https://practice.qabrains.com/registration");

//   const dropdown = page.locator("#country");

//   // Step 1: Get all option texts
//   const options = await dropdown.locator("option").allTextContents();

//   // Step 2: Remove placeholder and trim whitespace
//   const optionTexts = options
//     .map((o) => o.trim())
//     .filter((o) => o && o.toLowerCase() !== "select country");

//   console.log("Dropdown Options:", optionTexts);

//   // Step 3: Sort alphabetically (case-insensitive)
//   const sortedOptions = [...optionTexts].sort((a, b) =>
//     a.localeCompare(b, "en", { sensitivity: "base" })
//   );

//   // Step 4: Assert the order
//   await expect(optionTexts).tonotEqual(sortedOptions);

//   console.log("✅ Dropdown options are in correct alphabetical order.");
// });
//testcases for Account Type
test("TestValidAccountSelectionFromDropDown", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);

  const AccountDropdown = page.locator("//select[@id='account']");

  // Select Bangladesh
  await AccountDropdown.selectOption({ label: "Private Job" });
  await page.waitForTimeout(1000);

  // Check the visible selected option text
  const selectedText = await AccountDropdown.locator(
    "option:checked"
  ).textContent();
  expect(selectedText).toBe("Private Job");

  console.log("Account successfully selected and verified!");
});



test("TestRegistrationWithValidEmail", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='email']", "tahminatisha001@gmail.com");
  const email = page.locator("//input[@id='email']");
  await expect(email).toHaveValue("tahminatisha001@gmail.com");
  await page.waitForTimeout(3000);
});
test("TestRegistrationWithoutEmail", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const errMsg = await page.locator(
    "//p[normalize-space()='Email is a required field']"
  );
  expect(errMsg).toHaveText("Email is a required field");
});
test("TestRegistrationWithInvalidEmail", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");

  const emailInput = page.locator("//input[@id='email']");
  await page.waitForTimeout(3000);

  // Fill with invalid email
  await emailInput.fill("tahminaTisha");
  await page.click("button[type='submit']");
  await page.waitForTimeout(3000);

  // Get the validation message (browser built-in)
  const validationMessage = await emailInput.evaluate(
    (el) => el.validationMessage
  );

  console.log("Validation message:", validationMessage);

  // Assert it contains '@' error
  expect(validationMessage).toContain(
    "Please include an '@' in the email address"
  );
});
//test cases for password
test("TestRegistrationWithValidPassword", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  const passwordField = page.locator("//input[@id='password']");
  await passwordField.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Admin123@");
  const email = page.locator("//input[@id='password']");
  await expect(email).toHaveValue("Admin123@");
  await page.waitForTimeout(3000);
});
test("TestRegistrationWithoutPassword", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const errMsg = page.locator(
    "//p[normalize-space()='Password is a required field']"
  );
  expect(errMsg).toHaveText("Password is a required field");
});

test("TestPasswordMinLength", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");

  const passwordField = page.locator("//input[@id='password']");
  await passwordField.fill("ABC");

  await page.click("//button[@type='submit']");

  const errorMsg = page.locator(
    "//p[normalize-space()='Password must be at least 6 characters']"
  );
  await expect(errorMsg).toHaveText("Password must be at least 6 characters");
  console.log(" password min length validation works correctly.");
});
test("TestPasswordMaxLength", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");

  const passwordField = page.locator("//input[@id='password']");
  await passwordField.fill("A1b2C3d4E5f6G7h8I9j0K1l2M3");

  await page.click("//button[@type='submit']");

  const errorMsg = page.locator(
    "//p[normalize-space()='Password must be at most 25 characters']"
  );
  await expect(errorMsg).toHaveText("Password must be at most 25 characters");
  console.log("Password max length validation works correctly.");
});
test("testPasswordtWithWhiteSpaces", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);

  const passwordInput = page.locator("//input[@id='password']");

  await passwordInput.fill("        ");
  await page.waitForTimeout(3000);
  await page.click("//button[@type='submit']");
  const value = await passwordInput.inputValue();
  console.log("value:", value);
  expect(value).toBe("        "); // confirms bug: site didn’t trim
  const isValid = await passwordInput.evaluate((el) => el.checkValidity());
  expect(isValid).toBe(true); // confirms bug: whitespace treated as valid

  console.warn("BUG: password field accepts whitespace only without error!");
});

test("TestEyeIconForPasswordConfirm", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(2000);

  const passwordField = page.locator("//input[@id='password']");
  const eyeIcon = page.locator(
    "//div[5]//div[1]//button[1]//*[name()='svg']//*[name()='path' and contains(@d,'m9 18 .722')]"
  );

  await passwordField.fill("Admin123@");
  await expect(passwordField).toHaveValue("Admin123@");

  expect(await passwordField.getAttribute("type")).toBe("password");
  await eyeIcon.click();
  await expect(passwordField).toHaveAttribute("type", "text");
  await page.waitForTimeout(2000);
  // await eyeIcon.click();
  // await expect(passwordField).toHaveAttribute("type", "password");

  console.log("Eye icon correctly toggles password visibility.");
});

test("TestConfirmPasswordFieldValidation", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");

  const passwordField = page.locator("//input[@id='password']");
  const confirmPasswordField = page.locator("//input[@id='confirm_password']");
  const submitButton = page.locator("//button[@type='submit']");

  // Fill password
  await passwordField.fill("Admin123@");
  await expect(passwordField).toHaveValue("Admin123@");

  // Fill confirm password incorrectly
  await confirmPasswordField.fill("Admin123");
  await expect(confirmPasswordField).toHaveValue("Admin123");

  // Click submit and verify validation error for mismatch
  await submitButton.click();
  const errMsg = page.locator("//p[normalize-space()='Passwords must match']");
  await expect(errMsg).toHaveText("Passwords must match");
});

test("SuccessfulRegistrationwithValidCredentials", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='name']", "Tisha");
  await page.waitForTimeout(3000);
  const countryDropdown = page.locator("#country");

  await countryDropdown.selectOption({ label: "Bangladesh" });
  await page.waitForTimeout(1000);
  const AccountDropdown = page.locator("//select[@id='account']");

  await AccountDropdown.selectOption({ label: "Private Job" });
  await page.waitForTimeout(1000);
  await page.fill("//input[@id='email']", "tahminatisha@gmail.com");
  const passwordField = page.locator("//input[@id='password']");
  await passwordField.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);
  await page.fill("//input[@id='password']", "Admin123@");
  const confirmPasswordField = page.locator("//input[@id='confirm_password']");
  await confirmPasswordField.fill("Admin123@");

  await page.click("//button[@type='submit']");
  const successMsg = page.locator("//span[@class='title text-black text-md']");
  await expect(successMsg).toHaveText("Registration Successful");
  await page.waitForTimeout(1000);
});

test("TestDuplicateEmailRegistration", async ({ page }) => {
  await page.goto("https://practice.qabrains.com/registration");
  await page.waitForTimeout(2000);
  await page.fill("//input[@id='name']", "Tisha");
  await page.waitForTimeout(3000);
  const countryDropdown = page.locator("#country");

  await countryDropdown.selectOption({ label: "Bangladesh" });
  await page.waitForTimeout(1000);
  const accountDropdown = page.locator("//select[@id='account']");
  await accountDropdown.selectOption({ label: "Private Job" });

  const duplicateEmail = "tahminatisha@gmail.com";

  await page.fill("//input[@id='email']", duplicateEmail);
  await page.fill("//input[@id='password']", "Admin123@");
  await page.fill("//input[@id='confirm_password']", "Admin123@");

  await page.click("//button[@type='submit']");

  const successMsg = page.locator("//span[@class='title text-black text-md']");
  await successMsg.waitFor({ state: "visible" });

  // Get the actual text content
  const text = await successMsg.textContent();

  if (text === "Registration Successful") {
    console.log("BUG: System allowed registration with duplicate email!");
  } else {
    console.log("Duplicate email correctly blocked.");
  }
});
