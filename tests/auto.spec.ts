import { expect, test } from "@playwright/test";
import { auto } from "../src/auto";


test.only("Navigate to test factory turbo to generate a docket ", async ({ page }) => {
  await auto("Navigate to url 'https://hei-los-qa.equitycushion.dev/admin_users/test_sign_in?debug_bearer=9jbuMvZjwhwcmQCvg3xaCKVX'", { page, test }, { debug: true, model: 'gpt-4' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(10000);
  // Click on the "Test Factory" dropdown.
  await auto("Click the third span with the text 'Test Factory'", { page, test }, { debug: true });
  await page.waitForLoadState('domcontentloaded');
  // Click the link named "Turbo (Experimental)".
  await auto("Click the link named 'Turbo (Experimental)'", { page, test }, { debug: true });
  await page.waitForLoadState('domcontentloaded');
  // Assert that the URL contains the expected path.
  await expect(page.url()).toContain("/test_factory/view");
  await page.waitForLoadState('domcontentloaded');
  await auto("Click the icon near the text 'Milestone'", { page, test }, { debug: true });
  await page.waitForLoadState('domcontentloaded');
  await auto("Click the item with the exact text 'Underwriting'", { page, test }, { debug: true });
  await page.waitForLoadState('domcontentloaded');
  await auto("Click the button named 'Generate'", { page, test }, { debug: true });
});
