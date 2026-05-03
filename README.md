# Site vitrine — Clivia Ambroise

Photographe d'architecture, Bordeaux. Site portfolio cinématique avec lookbook éditorial par projet.

**Stack** : Astro 6 + Tailwind 4 + React 19 (islands) + GSAP + Motion + Lenis. Images optimisées via `astro:assets` / sharp. Déploiement Vercel.

## Stack & ressources

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | Astro 6 | Site statique 100% — Lighthouse maximum, zero JS par défaut |
| Styles | Tailwind 4 (via `@import "tailwindcss"`) | Tokens custom dans `src/styles/global.css` (`@theme`) |
| Hydratation sélective | React 19 islands | Uniquement composants animés (`client:load`/`client:visible`) |
| Animations scroll | GSAP 3 + ScrollTrigger | Parallax, image reveals, sticky scrub, horizontal pin |
| Animations UI | Motion (motion/react) | Fade, scale, hover (plus light que Framer Motion) |
| Smooth scroll | Lenis 1.3 | Scroll natif lissé |
| Smooth navigation | Astro `ClientRouter` (View Transitions) | Page transitions natives + `transition:persist` pour Lenis/Cursor |
| Polices | Fraunces (display) + Inter (body) — Google Fonts | Optical size variable, look éditorial soigné |

## Direction artistique

- Fond `#F8F7F4` (cream) · texte `#0E0E0C` · accent `#9C7A4A` (ocre)
- Hero full-bleed 100vh + ken burns subtil
- Lookbook éditorial par projet (alternance fullbleed → 60/40 → trio → duo → ...)
- Curseur custom (cercle ocre, scale 6× sur les médias, `mix-blend-mode: difference`)
- Prefers-reduced-motion respecté partout

## Structure

```
src/
├── pages/
│   ├── index.astro                # Accueil
│   ├── a-propos.astro             # À propos (placeholders copy)
│   ├── contact.astro              # Contact (sans formulaire)
│   └── projets/
│       ├── index.astro            # Liste portfolio
│       └── [slug].astro           # Page projet (lookbook éditorial)
├── layouts/BaseLayout.astro       # Squelette + nav + footer + Lenis + Cursor
├── components/
│   ├── ui/                        # Nav, Footer, SmoothScroll, CursorCustom
│   ├── sections/                  # HeroFullBleed, SplitScreen, AsymGrid, ParallaxImage, ImageReveal, StickyTextScroll
│   ├── home/                      # ProjectsTeaser, LocationsStrip
│   └── projet/                    # LookbookSection (pacing déterministe)
├── data/projets.ts                # GÉNÉRÉ — ne pas éditer
├── lib/locations.ts               # Helper aggregations par lieu
└── styles/global.css              # Tokens design + base reset

scripts/
└── build-projets-data.mjs         # Pipeline data : Insta JSON → projets.ts + copie images

public/
├── favicon.svg
├── robots.txt
└── images/projets/[slug]/         # GÉNÉRÉ — copies depuis ~/Desktop/site-photographie/
```

## Pipeline data

Source : `~/Desktop/site-photographie/raw/gallery-dl/instagram/cliviaambroise_photographie/` (JSON + JPG du scrape Instagram).

```bash
node scripts/build-projets-data.mjs
```

Le script :
1. Parse les JSON (107 posts uniques).
2. Filtre les posts ayant une `@mention` client connue (Agence Dame, Brochet Rose, Florentine du Chazaud, DGOT).
3. Groupe par `client × lieu` → 4 projets, 7 séries, 202 images.
4. Copie les JPG dans `public/images/projets/[slug]/` avec un naming stable `001_[slug].jpg`.
5. Écrit `src/data/projets.ts` (typé, prêt à `import`).

À relancer si Clivia poste de nouveaux contenus (regrep avec gallery-dl en amont).

## Commandes

```bash
npm install              # 1ère install
npm run dev              # serveur local http://localhost:4321
npm run build            # build prod → dist/
npm run preview          # preview prod local
node scripts/build-projets-data.mjs   # régénérer le data
```

## Déploiement Vercel

```bash
npm i -g vercel          # si pas déjà
vercel link              # link au compte Vercel
vercel deploy            # preview
vercel deploy --prod     # production (après domaine custom configuré)
```

Domaine custom : à acheter (`cliviaambroise.com` recommandé) puis ajouter dans Vercel → Domains.

## TODO post-livraison

- [ ] Copywriting définitif (bio, à propos, sous-titres) avec Clivia
- [ ] Portrait HD + photo couverture sélectionnée par Clivia
- [ ] Logos clients (4 architectes) au lieu des noms en typo
- [ ] OG image dédiée (actuellement = image hero générique)
- [ ] Domaine + DNS Vercel
- [ ] `loading="lazy"` plus agressif sur les images en bas de page projet (audit Lighthouse mobile)
- [ ] Optionnel : page contact avec formulaire (Resend / Vercel Forms)
- [ ] Optionnel : lightbox cliquable sur les images de page projet

---

© Cockpit Léo Brun — Réalisation Haptom Studio
