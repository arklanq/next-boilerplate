import { expect, test } from "@playwright/test";

test("uses a saved theme before the page is ready", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("color-theme", "dark"));

  await page.goto("/", { waitUntil: "domcontentloaded" });

  expect(await page.locator("html").getAttribute("class")).toContain("dark");
});

test("follows the system theme when no choice is saved", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
