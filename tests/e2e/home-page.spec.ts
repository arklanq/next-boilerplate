import { expect, test } from "@playwright/test";

test("homepage loads without browser errors", async ({ page }) => {
  const errors: Error[] = [];
  page.on("pageerror", (error) => errors.push(error));

  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1, name: "Hello world" })).toBeVisible();
  expect(errors).toEqual([]);
});
