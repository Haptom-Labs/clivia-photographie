#!/usr/bin/env node
// Capture full-page screenshots de toutes les routes en mobile + desktop
// Usage: node scripts/audit-screenshots.mjs (avec dev server actif sur 4321)

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = "http://localhost:4321";
const ROUTES = [
  "/",
  "/projets",
  "/projets/agence-dame",
  "/projets/brochetrose-architecture",
  "/projets/florentine-du-chazaud",
  "/projets/dgot",
  "/a-propos",
  "/contact",
  "/carnet-de-voyage",
];

const VIEWPORTS = [
  { name: "mobile", w: 390, h: 844, isMobile: true },
  { name: "desktop", w: 1440, h: 900, isMobile: false },
];

const OUT = "/tmp/clivia-audit";

async function run() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 2,
      hasTouch: vp.isMobile,
      isMobile: vp.isMobile,
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();

    for (const route of ROUTES) {
      const url = BASE + route;
      const slug = route === "/" ? "home" : route.replace(/\//g, "_").slice(1);
      const file = path.join(OUT, `${vp.name}_${slug}.png`);
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
        await page.waitForTimeout(400);
        // Scroll progressif pour trigger les lazy-loaded images
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let y = 0;
            const step = window.innerHeight * 0.75;
            const tick = () => {
              window.scrollTo(0, y);
              y += step;
              if (y >= document.documentElement.scrollHeight) {
                window.scrollTo(0, 0);
                resolve();
              } else {
                setTimeout(tick, 120);
              }
            };
            tick();
          });
        });
        await page.waitForTimeout(800);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`✓ ${vp.name.padEnd(8)} ${route.padEnd(40)} → ${file}`);
      } catch (e) {
        console.log(`✗ ${vp.name.padEnd(8)} ${route.padEnd(40)} ${e.message}`);
      }
    }
    await ctx.close();
  }
  await browser.close();
  console.log(`\nDone. Screenshots dans ${OUT}/`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
