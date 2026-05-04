import { agences, type Agence, type ProjetIndividuel } from "../data/projets";

export interface LocationCard {
  name: string;
  slug: string;
  image: string;
  count: number;
  projects: string[];
}

export interface ProjetWithAgence {
  projet: ProjetIndividuel;
  agence: Agence;
}

const SLUG_BY_NAME: Record<string, string> = {
  Bordeaux: "bordeaux",
  "Saint Émilion": "saint-emilion",
  "Saint-Émilion": "saint-emilion",
  "Saint Emilion": "saint-emilion",
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

function locationSlug(p: ProjetIndividuel): string {
  return p.locationSlug || SLUG_BY_NAME[p.location] || p.location.toLowerCase().replace(/\s+/g, "-");
}

export function buildLocationCards(): LocationCard[] {
  const map = new Map<string, LocationCard>();

  for (const a of agences) {
    for (const p of a.projects) {
      const key = locationSlug(p);
      if (!map.has(key)) {
        map.set(key, {
          name: DISPLAY_BY_SLUG[key] ?? p.location,
          slug: key,
          image: p.images[0] ?? p.cover,
          count: 0,
          projects: [],
        });
      }
      const card = map.get(key)!;
      card.count += p.imageCount;
      if (!card.projects.includes(p.title)) card.projects.push(p.title);
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function projetsByLocationSlug(slug: string): ProjetWithAgence[] {
  const out: ProjetWithAgence[] = [];
  for (const a of agences) {
    for (const p of a.projects) {
      if (locationSlug(p) === slug) {
        out.push({ projet: p, agence: a });
      }
    }
  }
  return out;
}

export function allProjects(): ProjetWithAgence[] {
  return agences.flatMap((a) => a.projects.map((p) => ({ projet: p, agence: a })));
}
