import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`bundled fonts render Latin and Polish at every configured weight at ${width}px`, async ({ page, context }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
    await page.goto("/");

    const samples = await page.evaluate(async () => {
      const samples: { id: string; family: string }[] = [];
      for (const kind of ["sans", "mono"]) {
        const weights = kind === "sans" ? [300, 400, 500, 600, 700, 800] : [300, 400, 500, 600, 700, 800, 900];
        for (const weight of weights) {
          const sample = document.createElement("p");
          sample.id = `font-${kind}-${weight}`;
          sample.style.fontFamily = `var(--font-${kind})`;
          sample.style.fontWeight = String(weight);
          sample.textContent = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz ĄĆĘŁŃÓŚŹŻ ąćęłńóśźż 0123456789";
          document.body.append(sample);
          samples.push({ id: sample.id, family: kind === "sans" ? "Geist" : "Geist Mono" });
        }
      }
      await document.fonts.ready;
      return samples;
    });

    const session = await context.newCDPSession(page);
    await session.send("DOM.enable");
    await session.send("CSS.enable");
    const { root } = await session.send("DOM.getDocument");
    for (const sample of samples) {
      const { nodeId } = await session.send("DOM.querySelector", { nodeId: root.nodeId, selector: `#${sample.id}` });
      const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId });
      expect(fonts, sample.id).toHaveLength(1);
      expect(fonts[0], sample.id).toMatchObject({ familyName: sample.family, isCustomFont: true });
      expect(fonts[0]!.glyphCount, sample.id).toBeGreaterThan(0);
    }
    await session.detach();
  });
}
