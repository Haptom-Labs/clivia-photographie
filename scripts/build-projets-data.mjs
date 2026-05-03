#!/usr/bin/env node
// Genere src/data/projets.ts + copie les photos vers public/images/projets/[slug]/
// Source: ~/Desktop/site-photographie/raw/gallery-dl/instagram/cliviaambroise_photographie/

import fs from "node:fs/promises";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const HOME = os.homedir();
const SRC = path.join(
  HOME,
  "Desktop/site-photographie/raw/gallery-dl/instagram/cliviaambroise_photographie",
);
const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const OUT_IMG = path.join(PROJECT_ROOT, "public/images/projets");
const OUT_DATA = path.join(PROJECT_ROOT, "src/data/projets.ts");
const OUT_HERO = path.join(PROJECT_ROOT, "public/images/hero");

const CLIENTS = {
  agence_dame: {
    slug: "agence-dame",
    title: "Agence Dame",
    blurb: "Architecture residentielle contemporaine en Gironde.",
  },
  brochetrose_architecture: {
    slug: "brochetrose-architecture",
    title: "Brochet Rose",
    blurb: "Maisons et residences singulieres, de Saint-Emilion au Cap-Ferret.",
  },
  "florentine.du.chazaud": {
    slug: "florentine-du-chazaud",
    title: "Florentine du Chazaud",
    blurb: "Architecture d'interieur, projets residentiels et lieux d'exception.",
  },
  dgot_: {
    slug: "dgot",
    title: "DGOT",
    blurb: "Studio d'architecture, interventions contemporaines en milieu patrimonial.",
  },
};

const LOCATION_SLUG = {
  "Bordeaux": "bordeaux",
  "Saint Emilion": "saint-emilion",
  "Saint-Emilion": "saint-emilion",
  "Castres sur Gironde": "castres-sur-gironde",
  "Cap Ferret": "cap-ferret",
  "Ostuni, Pouilles, Italie": "italie-pouilles",
  "Lecce, Pouilles, Italie": "italie-pouilles",
  "Chambord, Chateaux de la Loire": "chateaux-de-la-loire",
  "Chenonceau, Chateaux de la Loire": "chateaux-de-la-loire",
  "Villandry, Chateaux de la Loire": "chateaux-de-la-loire",
};

const stripDiacritics = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "");

function parseLocation(desc) {
  for (const line of (desc || "").split("\n")) {
    const t = line.trim();
    if (t.startsWith("|")) return t.replace(/^\|\s*/, "").trim();
  }
  return null;
}

function detectClients(desc) {
  const out = [];
  const re = /@([\w._]+)/g;
  let m;
  while ((m = re.exec(desc || ""))) {
    if (CLIENTS[m[1]]) out.push(m[1]);
  }
  return [...new Set(out)];
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

async function main() {
  const files = readdirSync(SRC).filter((f) => f.endsWith(".json"));
  const seenPosts = new Set();
  const posts = [];

  const voyagePosts = [];
  for (const f of files.sort()) {
    const raw = await fs.readFile(path.join(SRC, f), "utf8");
    const d = JSON.parse(raw);
    if (seenPosts.has(d.post_id)) continue;
    seenPosts.add(d.post_id);

    const clients = detectClients(d.description);
    const lieuRaw = parseLocation(d.description);
    const lieuKey0 = lieuRaw ? stripDiacritics(lieuRaw) : null;
    const lieuSlug0 = lieuKey0 ? LOCATION_SLUG[lieuKey0] ?? null : null;

    if (!clients.length) {
      // Carnet de voyage : posts sans mention client mais avec lieu identifie
      if (lieuSlug0) {
        const allFiles0 = readdirSync(SRC)
          .filter(
            (fn) => fn.startsWith(`${d.post_id}_`) || fn === `${d.post_id}.jpg`,
          )
          .filter((fn) => fn.endsWith(".jpg"))
          .sort();
        if (allFiles0.length) {
          const date0 = (d.post_date || "").slice(0, 10);
          voyagePosts.push({
            post_id: d.post_id,
            url: d.post_url,
            date: date0,
            year: parseInt(date0.slice(0, 4)) || new Date().getFullYear(),
            lieu_raw: lieuRaw,
            lieu_slug: lieuSlug0,
            jpg_files: allFiles0,
          });
        }
      }
      continue;
    }

    const lieuKey = lieuRaw ? stripDiacritics(lieuRaw) : null;
    const lieuSlug = lieuKey ? LOCATION_SLUG[lieuKey] ?? null : null;
    const date = (d.post_date || "").slice(0, 10);

    const allFiles = readdirSync(SRC)
      .filter(
        (fn) => fn.startsWith(`${d.post_id}_`) || fn === `${d.post_id}.jpg`,
      )
      .filter((fn) => fn.endsWith(".jpg"))
      .sort();

    if (!allFiles.length) continue;

    posts.push({
      post_id: d.post_id,
      shortcode: d.post_shortcode,
      url: d.post_url,
      date,
      year: parseInt(date.slice(0, 4)) || new Date().getFullYear(),
      clients,
      lieu_raw: lieuRaw,
      lieu_slug: lieuSlug,
      caption: (d.description || "").trim(),
      jpg_files: allFiles,
    });
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  console.log(`Parsed ${posts.length} unique posts.`);

  const projets = {};
  for (const meta of Object.values(CLIENTS)) {
    projets[meta.slug] = {
      slug: meta.slug,
      title: meta.title,
      blurb: meta.blurb,
      seriesMap: new Map(),
      postsAll: [],
    };
  }

  for (const p of posts) {
    for (const c of p.clients) {
      const slug = CLIENTS[c].slug;
      const proj = projets[slug];
      const seriesKey = p.lieu_slug || "autres";
      if (!proj.seriesMap.has(seriesKey)) {
        proj.seriesMap.set(seriesKey, {
          slug: seriesKey,
          location: p.lieu_raw || "Sans lieu",
          posts: [],
        });
      }
      proj.seriesMap.get(seriesKey).posts.push(p);
      proj.postsAll.push(p);
    }
  }

  ensureDir(OUT_IMG);
  ensureDir(OUT_HERO);

  const projetsArray = [];

  for (const proj of Object.values(projets)) {
    if (!proj.postsAll.length) continue;
    const slug = proj.slug;
    const targetDir = path.join(OUT_IMG, slug);
    ensureDir(targetDir);

    const series = [];
    let imgCounter = 1;
    const allImagesFlat = [];

    const sortedSeries = [...proj.seriesMap.values()].sort((a, b) => {
      const da = a.posts[0]?.date || "";
      const db = b.posts[0]?.date || "";
      return db.localeCompare(da);
    });

    for (const s of sortedSeries) {
      const seriesImages = [];
      const sortedPosts = [...s.posts].sort((a, b) =>
        a.date.localeCompare(b.date),
      );

      for (const p of sortedPosts) {
        for (const fname of p.jpg_files) {
          const ext = path.extname(fname);
          const idx = String(imgCounter).padStart(3, "0");
          const newName = `${idx}_${slug}${ext}`;
          const srcPath = path.join(SRC, fname);
          const dstPath = path.join(targetDir, newName);
          if (!existsSync(dstPath)) {
            await fs.copyFile(srcPath, dstPath);
          }
          const webPath = `/images/projets/${slug}/${newName}`;
          seriesImages.push(webPath);
          allImagesFlat.push(webPath);
          imgCounter += 1;
        }
      }

      series.push({
        slug: s.slug,
        location: s.location,
        date: sortedPosts[0]?.date || "",
        year: sortedPosts[0]?.year || null,
        postCount: sortedPosts.length,
        images: seriesImages,
      });
    }

    const years = proj.postsAll.map((p) => p.year).filter(Boolean);
    const locations = [
      ...new Set(proj.postsAll.map((p) => p.lieu_raw).filter(Boolean)),
    ];

    projetsArray.push({
      slug,
      title: proj.title,
      blurb: proj.blurb,
      client: proj.title,
      locations,
      yearStart: Math.min(...years),
      yearEnd: Math.max(...years),
      cover: allImagesFlat[0] || "",
      imageCount: allImagesFlat.length,
      images: allImagesFlat,
      series,
    });
  }

  projetsArray.sort((a, b) => b.imageCount - a.imageCount);

  const heroCandidates = projetsArray[0]?.images.slice(0, 6) || [];

  // === Carnet de voyage ===
  const VOYAGE_LABELS = {
    "italie-pouilles": "Pouilles, Italie",
    "chateaux-de-la-loire": "Châteaux de la Loire",
  };
  const voyageBySlug = new Map();
  for (const p of voyagePosts) {
    if (!voyageBySlug.has(p.lieu_slug)) {
      voyageBySlug.set(p.lieu_slug, {
        slug: p.lieu_slug,
        location: VOYAGE_LABELS[p.lieu_slug] ?? p.lieu_raw,
        posts: [],
      });
    }
    voyageBySlug.get(p.lieu_slug).posts.push(p);
  }
  const voyageDir = path.join(OUT_IMG, "carnet-de-voyage");
  ensureDir(voyageDir);
  const voyageSeries = [];
  let voyageCounter = 1;
  const voyageAllImages = [];
  const sortedVoyageSeries = [...voyageBySlug.values()].sort((a, b) => {
    const da = a.posts[0]?.date || "";
    const db = b.posts[0]?.date || "";
    return db.localeCompare(da);
  });
  for (const s of sortedVoyageSeries) {
    const sortedPosts = [...s.posts].sort((a, b) => a.date.localeCompare(b.date));
    const seriesImages = [];
    for (const p of sortedPosts) {
      for (const fname of p.jpg_files) {
        const ext = path.extname(fname);
        const idx = String(voyageCounter).padStart(3, "0");
        const newName = `${idx}_${s.slug}${ext}`;
        const srcPath = path.join(SRC, fname);
        const dstPath = path.join(voyageDir, newName);
        if (!existsSync(dstPath)) await fs.copyFile(srcPath, dstPath);
        const webPath = `/images/projets/carnet-de-voyage/${newName}`;
        seriesImages.push(webPath);
        voyageAllImages.push(webPath);
        voyageCounter += 1;
      }
    }
    voyageSeries.push({
      slug: s.slug,
      location: s.location,
      date: sortedPosts[0]?.date || "",
      year: sortedPosts[0]?.year || null,
      postCount: sortedPosts.length,
      images: seriesImages,
    });
  }
  const voyageYears = voyagePosts.map((p) => p.year).filter(Boolean);
  const carnetVoyage = voyagePosts.length
    ? {
        slug: "carnet-de-voyage",
        title: "Carnet de voyage",
        blurb:
          "Notes visuelles, voyages personnels — quand l'œil ne travaille pas pour les autres.",
        locations: voyageSeries.map((s) => s.location),
        yearStart: Math.min(...voyageYears),
        yearEnd: Math.max(...voyageYears),
        cover: voyageAllImages[0] || "",
        imageCount: voyageAllImages.length,
        images: voyageAllImages,
        series: voyageSeries,
      }
    : null;

  const ts = `// Auto-genere par scripts/build-projets-data.mjs - ne pas editer manuellement
// Source: ~/Desktop/site-photographie (Instagram @cliviaambroise_photographie)

export type SerieProjet = {
  slug: string;
  location: string;
  date: string;
  year: number | null;
  postCount: number;
  images: string[];
};

export type Projet = {
  slug: string;
  title: string;
  blurb: string;
  client: string;
  locations: string[];
  yearStart: number;
  yearEnd: number;
  cover: string;
  imageCount: number;
  images: string[];
  series: SerieProjet[];
};

export const projets: Projet[] = ${JSON.stringify(projetsArray, null, 2)};

export const carnetVoyage: Omit<Projet, "client"> | null = ${JSON.stringify(carnetVoyage, null, 2)};

export const heroCandidates: string[] = ${JSON.stringify(heroCandidates, null, 2)};

export const allLocations: string[] = [
${[...new Set(projetsArray.flatMap((p) => p.locations))]
  .sort()
  .map((l) => `  ${JSON.stringify(l)}`)
  .join(",\n")}
];
`;

  ensureDir(path.dirname(OUT_DATA));
  await fs.writeFile(OUT_DATA, ts, "utf8");

  console.log(`\nWrote ${OUT_DATA}`);
  console.log(`Generated ${projetsArray.length} projets:`);
  for (const p of projetsArray) {
    console.log(
      `  - ${p.slug.padEnd(25)} ${p.imageCount.toString().padStart(3)} images, ${p.series.length} series, ${p.locations.length} lieux (${p.yearStart}-${p.yearEnd})`,
    );
  }
  console.log(`\nHero candidates: ${heroCandidates.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
