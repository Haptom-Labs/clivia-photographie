import { projets, type Projet } from "../data/projets";

export interface LocationCard {
  name: string;
  slug: string;
  image: string;
  count: number;
  projects: string[];
}

const SLUG_BY_NAME: Record<string, string> = {
  Bordeaux: "bordeaux",
  "Saint Émilion": "saint-emilion",
  "Saint-Émilion": "saint-emilion",
  "Castres sur Gironde": "castres-sur-gironde",
  "Cap Ferret": "cap-ferret",
  "Ostuni, Pouilles, Italie": "italie-pouilles",
  "Lecce, Pouilles, Italie": "italie-pouilles",
  "Chambord, Châteaux de la Loire": "chateaux-de-la-loire",
  "Chenonceau, Châteaux de la Loire": "chateaux-de-la-loire",
  "Villandry, Châteaux de la Loire": "chateaux-de-la-loire",
};

const DISPLAY_BY_SLUG: Record<string, string> = {
  bordeaux: "Bordeaux",
  "saint-emilion": "Saint-Émilion",
  "castres-sur-gironde": "Castres-sur-Gironde",
  "cap-ferret": "Cap-Ferret",
  "italie-pouilles": "Pouilles, Italie",
  "chateaux-de-la-loire": "Châteaux de la Loire",
};

export function buildLocationCards(): LocationCard[] {
  const map = new Map<string, LocationCard>();

  for (const p of projets) {
    for (const serie of p.series) {
      const key = SLUG_BY_NAME[serie.location] ?? serie.slug;
      if (!map.has(key)) {
        map.set(key, {
          name: DISPLAY_BY_SLUG[key] ?? serie.location,
          slug: key,
          image: serie.images[0],
          count: 0,
          projects: [],
        });
      }
      const card = map.get(key)!;
      card.count += serie.postCount;
      if (!card.projects.includes(p.title)) card.projects.push(p.title);
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function projetsByLocationSlug(slug: string): Projet[] {
  return projets.filter((p) =>
    p.series.some((s) => (SLUG_BY_NAME[s.location] ?? s.slug) === slug),
  );
}
