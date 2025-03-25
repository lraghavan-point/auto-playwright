import { expect, test } from "@playwright/test";
import { auto } from "../src/auto";

const options = undefined;

test.only("executes query", async ({ page }) => {
  await auto("Navigate to url 'https://hei-los-qa.equitycushion.dev/admin_users/test_sign_in?debug_bearer=9jbuMvZjwhwcmQCvg3xaCKVX'", { page, test }, { debug: true });
  await page.waitForLoadState('domcontentloaded');

  // Verify that the element exists before attempting to click it.
  await page.waitForSelector("span.text", { timeout: 20000 });

  await page.waitForLoadState('domcontentloaded');

  await auto('Click on the third span in the header that matches with the text Test Factory', { page, test }, { debug: true });

  await page.waitForLoadState('domcontentloaded');
  await auto("Click the link named 'Turbo (Experimental)'", { page, test }, { debug: true });

  await page.waitForLoadState('domcontentloaded');

  await expect(page.url()).toContain("/test_factory/view");

});

test("executes query using locator_evaluate", async ({ page }) => {
  await page.goto("/");

  const headerText = await auto("get the first letter of the header text", {
    page,
    test,
  }, options);

  // TODO assert that we are using locator_evaluate to get the first letter
  expect(headerText).toBe("H");
});

test("executes action", async ({ page }) => {
  await page.goto("/");

  await auto(`Type "foo" in the search box`, { page, test }, options);

  await page.pause();

  await expect(page.getByTestId("search-input")).toHaveValue("foo");
});

test("executes click", async ({ page }) => {
  await page.goto("/");

  await auto("Click the button until the counter value is equal to 2", {
    page,
    test,
  }, options);

  await expect(page.getByTestId("current-count")).toHaveText("2");
});

test("asserts (toBe)", async ({ page }) => {
  await page.goto("/");

  const searchInputHasHeaderText = await auto(
    `Is the contents of the header equal to "Hello, Rayrun!"?`,
    { page, test },
    options
  );

  expect(searchInputHasHeaderText).toBe(true);
});

test("asserts (not.toBe)", async ({ page }) => {
  await page.goto("/");

  const searchInputHasHeaderText = await auto(
    `Is the contents of the header equal to "Flying Donkeys"?`,
    { page, test },
    options
  );

  expect(searchInputHasHeaderText).toBe(false);
});

test("executes query, action and assertion", async ({ page }) => {
  await page.goto("/");

  const headerText = await auto("get the header text", { page, test }, options);

  await auto(`type "${headerText}" in the search box`, { page, test }, options);

  const searchInputHasHeaderText = await auto(
    `is the contents of the search box equal to "${headerText}"?`,
    { page, test },
    options
  );

  expect(searchInputHasHeaderText).toBe(true);
});

test("runs without test parameter", async ({ page }) => {
  await page.goto("/");

  const headerText = await auto("get the header text", { page }, options);

  expect(headerText.query).toBe("Hello, Rayrun!");
});
