import { expect, test } from "@playwright/test";

test("the reset stays under ui-sdk's look, and a component module overrides both", async ({ page }) => {
  await page.goto("/");

  const styles = await page.evaluate(() => {
    // ui-sdk injects its own layered <style> at the top of <head> once a component mounts.
    const injected = document.createElement("style");
    injected.textContent = "@layer ui-sdk { :where([data-slot][hidden]) { display: none; } }";
    document.head.prepend(injected);

    const module = document.createElement("style");
    module.textContent = ".moduleButton { padding-inline: 40px; }";
    document.head.append(module);

    const plain = document.createElement("button");
    plain.dataset["slot"] = "button";
    const overridden = document.createElement("button");
    overridden.dataset["slot"] = "button";
    overridden.className = "moduleButton";
    document.body.append(plain, overridden);

    const read = (element: Element) => {
      const style = getComputedStyle(element);
      return { padding: style.paddingInlineStart, border: style.borderTopWidth };
    };
    return { plain: read(plain), overridden: read(overridden) };
  });

  expect(styles.plain).toEqual({ padding: "12px", border: "1px" });
  expect(styles.overridden).toEqual({ padding: "40px", border: "1px" });
});
