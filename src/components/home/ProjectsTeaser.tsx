import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Agence } from "../../data/projets";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  agences: Agence[];
}

export default function ProjectsTeaser({ agences }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = ref.current?.querySelectorAll<HTMLAnchorElement>("[data-card]");
      cards?.forEach((card, idx) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: idx * 0.07,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=80",
            once: true,
          },
        });

        const img = card.querySelector("img");
        if (!img) return;
        card.addEventListener("pointerenter", () => {
          gsap.to(img, { scale: 1.04, duration: 0.9, ease: "power3.out" });
        });
        card.addEventListener("pointerleave", () => {
          gsap.to(img, { scale: 1, duration: 1, ease: "power3.out" });
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 pt-24 pb-14 md:px-8 md:py-32">
      <div className="mx-auto max-w-[var(--container-wide)]">
        <div className="mb-10 flex flex-col gap-4 px-2 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Sélection</p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-[clamp(2.6rem,5vw,5rem)]">
              Quatre architectes, plusieurs <span className="italic font-light">projets</span>.
            </h2>
          </div>
          <a
            href="/projets"
            className="border-b border-[var(--color-ink)] pb-1 text-[0.78rem] tracking-[0.2em] uppercase transition-colors hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
            data-cursor="link"
          >
            Voir tous les projets →
          </a>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-x-8 md:gap-y-6">
          {(() => {
            const DISPLAY_ORDER = [
              "brochet-rose",
              "dgot",
              "florentine-du-chazaud",
              "agence-dame",
            ];
            const ordered = DISPLAY_ORDER
              .map((slug) => agences.find((a) => a.slug === slug))
              .filter((a): a is Agence => Boolean(a));
            return ordered;
          })().map((a, idx) => {
            const layouts = [
              {
                desktop: "col-span-2 md:col-span-7 md:row-span-2",
                aspect: "aspect-[4/5] md:aspect-[3/5]",
                translate: "",
              },
              {
                desktop: "col-span-1 md:col-span-5",
                aspect: "aspect-[3/4] md:aspect-[4/5]",
                translate: "md:translate-y-8",
              },
              {
                desktop: "col-span-1 md:col-span-5",
                aspect: "aspect-[3/4] md:aspect-[1/1]",
                translate: "",
              },
              {
                desktop: "col-span-2 md:col-span-12",
                aspect: "aspect-[16/10] md:aspect-[21/9]",
                translate: "md:min-h-[480px]",
              },
            ];
            const cfg = layouts[idx % layouts.length];
            const num = String(idx + 1).padStart(2, "0");

            return (
              <a
                key={a.slug}
                href={`/agences/${a.slug}`}
                data-card
                data-cursor="link"
                className={`group relative block overflow-hidden bg-[var(--color-ink)] ${cfg.desktop} ${cfg.aspect} ${cfg.translate}`}
              >
                <img
                  src={a.cover}
                  alt={`${a.name} — ${a.locations.join(", ")}`}
                  loading="eager"
                  decoding="async"
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                />

                <span
                  className="absolute top-5 left-5 z-10 font-display text-[0.7rem] tracking-[0.22em] uppercase opacity-80 md:top-7 md:left-7"
                  style={{ color: "var(--color-bg)" }}
                >
                  — {num}
                </span>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-2/3 bg-gradient-to-t from-[rgba(14,14,12,0.62)] via-[rgba(14,14,12,0.18)] to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-[var(--color-bg)] md:p-8">
                  <p
                    className="text-[0.66rem] tracking-[0.22em] uppercase opacity-85"
                    style={{ color: "var(--color-bg)" }}
                  >
                    {a.locations.slice(0, 2).join(" · ")} · {a.projects.length} projets
                  </p>
                  <h3 className="mt-3 font-display text-[1.9rem] leading-[1.02] tracking-[-0.005em] transition-colors group-hover:text-[var(--color-accent)] md:mt-4 md:text-[clamp(1.7rem,2.4vw,2.6rem)]">
                    {a.name}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
