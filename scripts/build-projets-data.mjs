#!/usr/bin/env node
// Genere src/data/projets.ts (structure agences[] + projets individuels)
// + copie les photos vers public/images/projets/[agence-physique]/
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

// =====================================================================
// AGENCES — slug court (URLs) + slug physique (dossier images existant)
// =====================================================================
const AGENCES = {
  agence_dame: {
    slug: "agence-dame",
    physicalSlug: "agence-dame",
    name: "Agence Dame",
    blurb: "Architecture résidentielle contemporaine en Gironde.",
  },
  brochetrose_architecture: {
    slug: "brochet-rose",
    physicalSlug: "brochetrose-architecture",
    name: "Brochet Rose",
    blurb: "Maisons et résidences singulières, de Saint-Émilion au Cap-Ferret.",
  },
  "florentine.du.chazaud": {
    slug: "florentine-du-chazaud",
    physicalSlug: "florentine-du-chazaud",
    name: "Florentine du Chazaud",
    blurb: "Architecture d'intérieur, projets résidentiels et lieux d'exception.",
  },
  dgot_: {
    slug: "dgot",
    physicalSlug: "dgot",
    name: "DGOT",
    blurb: "Studio d'architecture, interventions contemporaines en milieu patrimonial.",
  },
};

const AGENCE_COVER_OVERRIDES = {
  "brochet-rose": "/images/projets/brochetrose-architecture/3481383345251303791_3481383330873131302.jpg",
  "florentine-du-chazaud": "/images/projets/florentine-du-chazaud/3774561766215576925_3774561756971295449.jpg",
  "dgot": "/images/projets/dgot/3772340301009311289.jpg",
};

// =====================================================================
// SOUS-PROJETS DESCRIPTIFS (Brochet Rose) — mapping post_id -> projet
// Pour ajouter un projet : inclure ses post_ids ici. Les posts non listes
// tombent en fallback par lieu (ex. "bordeaux-selection").
// =====================================================================
const BROCHETROSE_SUBPROJECTS = {
  "bordeaux-maison-surelevation": {
    title: "Maison rénovée et surélevée",
    location: "Bordeaux",
    year: 2024,
    description:
      "Réhabilitation contemporaine d'une maison bordelaise. Surélévation et redistribution complète des volumes intérieurs, lecture précise des matériaux et de la lumière.",
    postIds: [
      "3886533820526917875", "3883987450918136670", "3882191816712028148",
      "3880013525431411120", "3875664688382232427", "3874216656524594607",
      "3872040360365277390", "3870588774959025697", "3869477508014191354",
      "3866973916774567085", "3608234490249526105", "3607521635158566870",
      "3606797609536726540", "3606086284703664823", "3600975181497579601",
      "3598105939987170714", "3596643394000671604", "3571294706357446519",
      "3569835450692680482", "3565488295023165102", "3562593285504188755",
      "3559797752251151794", "3557585204177229128", "3508963629408519336",
      "3500988715267293585", "3496641695333228710", "3493751378586244506",
      "3490096376172991053", "3395117950803066525", "3393695000933571776",
      "3392248456157901637",
    ],
  },
  "bordeaux-maison-individuelle": {
    title: "Maison individuelle rénovée",
    location: "Bordeaux",
    year: 2025,
    description:
      "Rénovation d'une maison individuelle à Bordeaux. Volumes recomposés, ouvertures généreuses, attention portée aux finitions et à la lumière naturelle.",
    postIds: [
      "3811184325593696660", "3808271937194197283", "3803947102796300265",
      "3799610524045149962", "3790897901522951766", "3788726504319132323",
      "3786112829385102044", "3783249454036685966", "3780349394634421689",
      "3778872431734434158", "3777409713387098164", "3775993574765365440",
    ],
  },
  "cap-ferret-villa": {
    title: "Villa rénovée et étendue",
    location: "Cap Ferret",
    year: 2025,
    description:
      "Rénovation et extension d'une villa au Cap-Ferret, dans le respect du caractère du lieu. Travail sur les vues, les terrasses et les intérieurs.",
    postIds: [
      "3474142509799303890", "3471238794154962796", "3469060226327083199",
      "3466163185448117076", "3464720363805048040", "3463272029496047576",
    ],
  },
  "bordeaux-maison-bassin": {
    title: "Maison sur le bassin",
    location: "Bordeaux",
    year: 2025,
    description:
      "Maison contemporaine en bord de bassin signée Brochet Rose. Reportage sur les volumes, la lumière, et le rapport au paysage.",
    postIds: [
      "3701324683370260585", "3695178486016210774", "3691175727289976462",
      "3687188197888508648", "3683576239587066118", "3682150542255603430",
      "3681070188581283678", "3672724866838710386", "3664030280427717862",
    ],
  },
  "bordeaux-etude-notariale-dgot": {
    title: "Étude notariale (avec DGOT)",
    location: "Bordeaux",
    year: 2024,
    description:
      "Rénovation d'une étude notariale bordelaise en partenariat avec l'agence DGOT. Espaces de travail, lumière naturelle, mobilier.",
    partnerAgence: "DGOT",
    postIds: [
      "3772339793725002734", "3769869338954964772", "3768442114469064457",
      "3767290996770791048", "3765542306230088104", "3762926952022574710",
    ],
  },
  "bordeaux-appartement": {
    title: "Appartement rénové",
    location: "Bordeaux",
    year: 2024,
    description:
      "Réhabilitation d'un appartement bordelais. Intervention sobre et précise sur les volumes, la lumière et les finitions.",
    postIds: [
      "3349475440445825508", "3348740761358933923", "3347329315584454439",
    ],
  },
};

const BR_POST_TO_PROJECT = {};
for (const [slug, conf] of Object.entries(BROCHETROSE_SUBPROJECTS)) {
  for (const pid of conf.postIds) BR_POST_TO_PROJECT[pid] = slug;
}

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

const LOCATION_DISPLAY = {
  "bordeaux": "Bordeaux",
  "saint-emilion": "Saint-Émilion",
  "castres-sur-gironde": "Castres-sur-Gironde",
  "cap-ferret": "Cap-Ferret",
};

function fallbackDescription(agenceName, locationDisplay, monthLine) {
  if (monthLine) {
    return `Reportage photographique d'un chantier livré en ${monthLine} à ${locationDisplay} pour l'agence ${agenceName}. Une lecture sensible du projet, du chantier livré au détail.`;
  }
  return `Sélection de reportages photographiés à ${locationDisplay} pour l'agence ${agenceName}. Une lecture sensible des projets, du chantier livré au détail.`;
}

const stripDiacritics = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

function parseLocation(desc) {
  for (const line of (desc || "").split("\n")) {
    const t = line.trim();
    if (t.startsWith("|")) return t.replace(/^\|\s*/, "").trim();
  }
  return null;
}

// Apres la ligne lieu (qui commence par "|"), la ligne suivante non-vide non-separateur
// est typiquement le mois de chantier (ex. "Mars 2024", "Juillet 2025").
function parseChantierMonth(desc) {
  const lines = (desc || "").split("\n").map((l) => l.trim());
  let foundLocation = false;
  for (const line of lines) {
    if (line.startsWith("|")) {
      foundLocation = true;
      continue;
    }
    if (!foundLocation) continue;
    if (!line) continue;
    if (line.startsWith("—") || line.startsWith("#") || line.startsWith("@")) continue;
    return line;
  }
  return null;
}

function monthToSlug(month) {
  if (!month) return null;
  return stripDiacritics(month)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function yearFromMonth(month) {
  if (!month) return null;
  const m = month.match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : null;
}

const MONTH_ORDER = {
  janvier: 1, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, aout: 8, septembre: 9, octobre: 10, novembre: 11, decembre: 12,
};
function monthIndex(monthLine) {
  if (!monthLine) return 99;
  const m = stripDiacritics(monthLine.toLowerCase()).match(/^(\w+)/);
  return m && MONTH_ORDER[m[1]] ? MONTH_ORDER[m[1]] : 99;
}

function detectAgences(desc) {
  const out = [];
  const re = /@([\w._]+)/g;
  let m;
  while ((m = re.exec(desc || ""))) {
    if (AGENCES[m[1]]) out.push(m[1]);
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

    const agencesDetected = detectAgences(d.description);
    const lieuRaw = parseLocation(d.description);
    const lieuKey = lieuRaw ? stripDiacritics(lieuRaw) : null;
    const lieuSlug = lieuKey ? LOCATION_SLUG[lieuKey] ?? null : null;
    const date = (d.post_date || "").slice(0, 10);

    const allFiles = readdirSync(SRC)
      .filter((fn) => fn.startsWith(`${d.post_id}_`) || fn === `${d.post_id}.jpg`)
      .filter((fn) => fn.endsWith(".jpg"))
      .sort();
    if (!allFiles.length) continue;

    if (!agencesDetected.length) {
      if (lieuSlug) {
        voyagePosts.push({
          post_id: d.post_id,
          url: d.post_url,
          date,
          year: parseInt(date.slice(0, 4)) || new Date().getFullYear(),
          lieu_raw: lieuRaw,
          lieu_slug: lieuSlug,
          jpg_files: allFiles,
        });
      }
      continue;
    }

    const chantierMonth = parseChantierMonth(d.description);

    posts.push({
      post_id: d.post_id,
      url: d.post_url,
      date,
      year: parseInt(date.slice(0, 4)) || new Date().getFullYear(),
      agences: agencesDetected,
      lieu_raw: lieuRaw,
      lieu_slug: lieuSlug,
      chantier_month: chantierMonth,
      chantier_year: yearFromMonth(chantierMonth),
      caption: (d.description || "").trim(),
      jpg_files: allFiles,
    });
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  console.log(`Parsed ${posts.length} unique posts mentioning agences.`);

  // ====================================================================
  // Inject synthetic Brochet Rose sub-project posts from the existing
  // /public/images/projets/brochetrose-architecture/instagram/ folder.
  // Ces fichiers viennent d'un scrape passe de @brochetrose_architecture
  // (non-disponible ici) — on les conserve tels quels.
  // ====================================================================
  const BR_PHYSICAL = "brochetrose-architecture";
  const BR_INSTAGRAM_DIR = path.join(OUT_IMG, BR_PHYSICAL, "instagram");
  if (existsSync(BR_INSTAGRAM_DIR)) {
    const existing = readdirSync(BR_INSTAGRAM_DIR).filter((f) => f.endsWith(".jpg"));
    const filesByPostId = new Map();
    for (const f of existing) {
      const postId = f.replace(/\.jpg$/, "").split("_")[0];
      if (!filesByPostId.has(postId)) filesByPostId.set(postId, []);
      filesByPostId.get(postId).push(f);
    }
    let synthetic = 0;
    for (const [, conf] of Object.entries(BROCHETROSE_SUBPROJECTS)) {
      for (const pid of conf.postIds) {
        const files = filesByPostId.get(pid);
        if (!files || !files.length) continue;
        if (seenPosts.has(pid)) continue;
        seenPosts.add(pid);
        const lieuKey = stripDiacritics(conf.location);
        posts.push({
          post_id: pid,
          url: null,
          date: "",
          year: null,
          agences: ["brochetrose_architecture"],
          lieu_raw: conf.location,
          lieu_slug: LOCATION_SLUG[lieuKey] ?? null,
          caption: "",
          jpg_files: files,
          _fromInstagramFolder: true,
        });
        synthetic += 1;
      }
    }
    console.log(`Injected ${synthetic} synthetic Brochet Rose posts from /instagram/ folder.`);
  }

  const agencesMap = {};
  for (const meta of Object.values(AGENCES)) {
    agencesMap[meta.slug] = {
      slug: meta.slug,
      physicalSlug: meta.physicalSlug,
      name: meta.name,
      blurb: meta.blurb,
      projectsMap: new Map(),
      postsAll: [],
    };
  }

  for (const p of posts) {
    for (const ag of p.agences) {
      const meta = AGENCES[ag];
      const agence = agencesMap[meta.slug];

      let projetSlug;
      let projetMeta;
      if (meta.slug === "brochet-rose" && BR_POST_TO_PROJECT[p.post_id]) {
        projetSlug = BR_POST_TO_PROJECT[p.post_id];
        projetMeta = {
          source: "descriptive",
          conf: BROCHETROSE_SUBPROJECTS[projetSlug],
        };
      } else {
        const locSlug = p.lieu_slug || "autres";
        const monthSlug = monthToSlug(p.chantier_month);
        projetSlug = monthSlug ? `${locSlug}-${monthSlug}` : `${locSlug}-selection`;
        projetMeta = {
          source: "fallback",
          location: p.lieu_raw,
          locationSlug: locSlug,
          chantierMonth: p.chantier_month,
          chantierYear: p.chantier_year,
        };
      }

      if (!agence.projectsMap.has(projetSlug)) {
        agence.projectsMap.set(projetSlug, {
          slug: projetSlug,
          meta: projetMeta,
          posts: [],
        });
      }
      agence.projectsMap.get(projetSlug).posts.push(p);
      agence.postsAll.push(p);
    }
  }

  ensureDir(OUT_IMG);
  ensureDir(OUT_HERO);

  const agencesArray = [];

  for (const agence of Object.values(agencesMap)) {
    if (!agence.postsAll.length) continue;

    const targetDir = path.join(OUT_IMG, agence.physicalSlug);
    ensureDir(targetDir);

    let imgCounter = 1;
    const projects = [];

    const sortedProjectEntries = [...agence.projectsMap.entries()].sort((a, b) => {
      const sourceA = a[1].meta.source;
      const sourceB = b[1].meta.source;
      if (sourceA !== sourceB) return sourceA === "descriptive" ? -1 : 1;
      if (sourceA === "descriptive") {
        const order = Object.keys(BROCHETROSE_SUBPROJECTS);
        return order.indexOf(a[0]) - order.indexOf(b[0]);
      }
      // Fallback : tri chronologique par chantier (annee asc, mois asc)
      const yearA = a[1].meta.chantierYear || 9999;
      const yearB = b[1].meta.chantierYear || 9999;
      if (yearA !== yearB) return yearA - yearB;
      const mA = monthIndex(a[1].meta.chantierMonth);
      const mB = monthIndex(b[1].meta.chantierMonth);
      if (mA !== mB) return mA - mB;
      return a[0].localeCompare(b[0]);
    });

    for (const [projetSlug, projetData] of sortedProjectEntries) {
      const sortedPosts = [...projetData.posts].sort((a, b) =>
        a.date.localeCompare(b.date),
      );
      const images = [];

      for (const p of sortedPosts) {
        for (const fname of p.jpg_files) {
          if (projetData.meta.source === "descriptive") {
            const dstInstagramDir = path.join(targetDir, "instagram");
            ensureDir(dstInstagramDir);
            const dstPath = path.join(dstInstagramDir, fname);
            // Si le fichier vient du dossier /instagram/ existant, ne rien copier.
            // Sinon (cas hypothetique : raw Clivia contient le post Brochet) : copie depuis SRC.
            if (!existsSync(dstPath)) {
              const srcPath = path.join(SRC, fname);
              if (existsSync(srcPath)) {
                await fs.copyFile(srcPath, dstPath);
              }
            }
            images.push(`/images/projets/${agence.physicalSlug}/instagram/${fname}`);
          } else {
            const ext = path.extname(fname);
            const idx = String(imgCounter).padStart(3, "0");
            const newName = `${idx}_${agence.physicalSlug}${ext}`;
            const srcPath = path.join(SRC, fname);
            const dstPath = path.join(targetDir, newName);
            if (!existsSync(dstPath)) {
              await fs.copyFile(srcPath, dstPath);
            }
            images.push(`/images/projets/${agence.physicalSlug}/${newName}`);
            imgCounter += 1;
          }
        }
      }

      let title, location, locationSlug, description, partnerAgence;
      if (projetData.meta.source === "descriptive") {
        const conf = projetData.meta.conf;
        title = conf.title;
        const rawLoc = conf.location;
        const knownSlug = LOCATION_SLUG[stripDiacritics(rawLoc)];
        locationSlug = knownSlug ?? stripDiacritics(rawLoc).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        location = LOCATION_DISPLAY[locationSlug] ?? rawLoc;
        description = conf.description;
        partnerAgence = conf.partnerAgence;
      } else {
        const rawLoc = projetData.meta.location || "Sans lieu";
        locationSlug = projetData.meta.locationSlug;
        location = LOCATION_DISPLAY[locationSlug] ?? rawLoc;
        const monthLine = projetData.meta.chantierMonth;
        title = monthLine ? `${location} — ${monthLine}` : `Sélection ${location}`;
        description = fallbackDescription(agence.name, location, monthLine);
      }

      const years = sortedPosts.map((p) => p.year).filter(Boolean);
      const computedYear = years.length ? Math.max(...years) : null;
      let projetYear;
      if (projetData.meta.source === "descriptive" && projetData.meta.conf.year) {
        projetYear = projetData.meta.conf.year;
      } else if (projetData.meta.source === "fallback" && projetData.meta.chantierYear) {
        projetYear = projetData.meta.chantierYear;
      } else {
        projetYear = computedYear;
      }
      const projet = {
        slug: projetSlug,
        title,
        location,
        locationSlug,
        year: projetYear,
        description,
        cover: images[0] || "",
        images,
        imageCount: images.length,
      };
      if (partnerAgence) projet.partnerAgence = partnerAgence;
      projects.push(projet);
    }

    const allYears = agence.postsAll.map((p) => p.year).filter(Boolean);
    // Locations canoniques (avec accents/tirets) via LOCATION_DISPLAY
    const allLocations = [
      ...new Set(
        agence.postsAll
          .map((p) => LOCATION_DISPLAY[p.lieu_slug] ?? p.lieu_raw)
          .filter(Boolean),
      ),
    ];
    const totalImages = projects.reduce((s, p) => s + p.imageCount, 0);
    const allImagesFlat = projects.flatMap((p) => p.images);

    agencesArray.push({
      slug: agence.slug,
      name: agence.name,
      blurb: agence.blurb,
      cover: AGENCE_COVER_OVERRIDES[agence.slug] || allImagesFlat[0] || "",
      locations: allLocations,
      yearStart: Math.min(...allYears),
      yearEnd: Math.max(...allYears),
      imageCountTotal: totalImages,
      projects,
    });
  }

  agencesArray.sort((a, b) => b.imageCountTotal - a.imageCountTotal);

  const allImagesAcrossAgences = agencesArray.flatMap((a) =>
    a.projects.flatMap((p) => p.images),
  );
  const heroCandidates = allImagesAcrossAgences.slice(0, 6);

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

export type ProjetIndividuel = {
  slug: string;
  title: string;
  location: string;
  locationSlug: string;
  year: number | null;
  description: string;
  cover: string;
  images: string[];
  imageCount: number;
  partnerAgence?: string;
};

export type Agence = {
  slug: string;
  name: string;
  blurb: string;
  cover: string;
  locations: string[];
  yearStart: number;
  yearEnd: number;
  imageCountTotal: number;
  projects: ProjetIndividuel[];
};

export type SerieProjet = {
  slug: string;
  location: string;
  date: string;
  year: number | null;
  postCount: number;
  images: string[];
};

export type CarnetVoyage = {
  slug: string;
  title: string;
  blurb: string;
  locations: string[];
  yearStart: number;
  yearEnd: number;
  cover: string;
  imageCount: number;
  images: string[];
  series: SerieProjet[];
};

export const agences: Agence[] = ${JSON.stringify(agencesArray, null, 2)};

export const carnetVoyage: CarnetVoyage | null = ${JSON.stringify(carnetVoyage, null, 2)};

export const heroCandidates: string[] = ${JSON.stringify(heroCandidates, null, 2)};

export const allLocations: string[] = [
${[...new Set(agencesArray.flatMap((a) => a.locations))]
  .sort()
  .map((l) => `  ${JSON.stringify(l)}`)
  .join(",\n")}
];
`;

  ensureDir(path.dirname(OUT_DATA));
  await fs.writeFile(OUT_DATA, ts, "utf8");

  console.log(`\nWrote ${OUT_DATA}`);
  console.log(`Generated ${agencesArray.length} agences:`);
  for (const a of agencesArray) {
    console.log(
      `  - ${a.slug.padEnd(25)} ${a.imageCountTotal.toString().padStart(3)} images, ${a.projects.length} projets, ${a.locations.length} lieux (${a.yearStart}-${a.yearEnd})`,
    );
    for (const p of a.projects) {
      console.log(
        `      . ${p.slug.padEnd(40)} ${p.imageCount.toString().padStart(3)} img -- ${p.title}`,
      );
    }
  }
  console.log(`\nHero candidates: ${heroCandidates.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
