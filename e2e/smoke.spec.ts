import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("homepage loads and is accessible", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/.+/);
    // Page should not have console errors
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.waitForLoadState("networkidle");
    expect(errors.length).toBe(0);
  });

  test("all main sections are visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check that main content sections exist
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // Check for section elements
    const sections = await page.locator("section").count();
    expect(sections).toBeGreaterThanOrEqual(2);
  });

  test("navigation is functional", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    if (await nav.isVisible()) {
      const links = await nav.locator("a").count();
      expect(links).toBeGreaterThanOrEqual(1);
    }
  });

  test("images load without errors", async ({ page }) => {
    const failedImages: string[] = [];
    page.on("response", (response) => {
      if (response.request().resourceType() === "image" && response.status() >= 400) {
        failedImages.push(response.url());
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(failedImages).toEqual([]);
  });

  test("page has no accessibility violations (basic)", async ({ page }) => {
    await page.goto("/");
    // Check all images have alt text
    const imagesWithoutAlt = await page.locator("img:not([alt])").count();
    expect(imagesWithoutAlt).toBe(0);

    // Check for proper heading hierarchy
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test("responsive layout works on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    // Page should not have horizontal scrollbar
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });
});
