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
