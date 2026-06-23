/**
 * One-off deck exporter: renders the live deck routes to PDF + self-contained
 * HTML in "Decks Rough Draft/". Requires the dev server on :8080 and a local
 * Chrome (puppeteer cache). Run from the project root:
 *   node scripts/export-decks.cjs
 */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const CHROME =
  "/Users/jenson/.cache/puppeteer/chrome/mac_arm-148.0.7778.97/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const OUT = "/Users/jenson/splice-labs-ui/Decks Rough Draft";
const BASE = "http://localhost:8080";

const decks = [
  ["/deck-seed", "01 — Splice Labs Seed Deck"],
  ["/deck-studio-model", "02 — Studio Model (Incubation Architecture)"],
  ["/deck-compounding", "03 — Compounding to Network Effects"],
  ["/deck-harness", "04 — The Harness Is the Asset"],
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--font-render-hinting=none"],
  });
  for (const [route, name] of decks) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 860, deviceScaleFactor: 2 });
    await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 90000 });
    await new Promise((r) => setTimeout(r, 2500)); // fonts + client render

    // PDF — print media + print CSS pagination (one slide per landscape page)
    await page.pdf({
      path: `${OUT}/${name}.pdf`,
      width: "1280px",
      height: "860px",
      printBackground: true,
      preferCSSPageSize: true,
    });

    // Self-contained HTML — inline all CSS + fonts, strip scripts
    const html = await page.evaluate(async () => {
      let css = "";
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) css += rule.cssText + "\n";
        } catch (e) {}
      }
      const fontUrls = [
        ...new Set(
          [...css.matchAll(/url\(["']?([^"')]+\.woff2?)["']?\)/g)].map((m) => m[1]),
        ),
      ];
      for (const u of fontUrls) {
        try {
          const abs = new URL(u, location.href).href;
          const buf = await (await fetch(abs)).arrayBuffer();
          const bytes = new Uint8Array(buf);
          let bin = "";
          for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
          const mime = u.endsWith(".woff2") ? "font/woff2" : "font/woff";
          css = css.split(u).join(`data:${mime};base64,${btoa(bin)}`);
        } catch (e) {}
      }
      document
        .querySelectorAll('link[rel="stylesheet"], script')
        .forEach((n) => n.remove());
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });
    fs.writeFileSync(`${OUT}/${name}.html`, html);

    console.log("exported:", name);
    await page.close();
  }
  await browser.close();
  console.log("ALL DONE");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
