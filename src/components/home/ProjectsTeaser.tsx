import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Projet } from "../../data/projets";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  projets: Projet[];
}

export default function ProjectsTeaser({ projets }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = ref.current?.querySelectorAll<HTMLAnchorElement>("[data-card]");
      cards?.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            delay: idx * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );

        const img = card.querySelector("img");
        const overlay = card.querySelector("[data-card-overlay]");
        const title = card.querySelector("[data-card-title]");
        if (!img) return;

        card.addEventListener("pointerenter", () => {
          gsap.to(img, { scale: 1.06, duration: 0.9, ease: "power3.out" });
          gsap.to(overlay, { opacity: 1, duration: 0.4 });
          gsap.fromTo(
            title,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
          );
        });
        card.addEventListener("pointerleave", () => {
          gsap.to(img, { scale: 1, duration: 1, ease: "power3.out" });
          gsap.to(overlay, { opacity: 0, duration: 0.4 });
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 py-14 md:px-8 md:py-32">
      <div className="mx-auto max-w-[var(--container-wide)]">
        <div className="mb-8 flex flex-col gap-4 px-2 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Sélection</p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-[clamp(2.6rem,5vw,5rem)]">
              Quatre projets, une <span className="italic font-light">écriture</span>.
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

        <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          {projets.map((p, idx) => {
            const layouts = [
              {
                desktop: "md:col-span-7 md:row-span-2 md:aspect-[4/5]",
                mobile: "aspect-[4/5]",
                offset: "",
              },
              {
                desktop: "md:col-span-5 md:aspect-[1/1]",
                mobile: "aspect-[1/1]",
                offset: "ml-auto w-[95%]",
              },
              {
                desktop: "md:col-span-5 md:aspect-[3/4]",
                mobile: "aspect-[3/4]",
                offset: "mr-auto w-[97%]",
              },
              {
                desktop: "md:col-span-7 md:aspect-[16/10]",
                mobile: "aspect-[16/11]",
                offset: "ml-auto w-[98%]",
              },
            ];
            const cfg = layouts[idx % layouts.length];

            return (
              <a
                key={p.slug}
                href={`/projets/${p.slug}`}
                data-card
                data-cursor="link"
                className={`group relative overflow-hidden bg-[var(--color-ink)] ${cfg.mobile} ${cfg.desktop} ${cfg.offset} md:ml-0 md:mr-0 md:w-auto`}
              >
                <img
                  src={p.cover}
                  alt={`${p.title} — ${p.locations.join(", ")}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                />
                <div
                  data-card-overlay
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,12,0.85)] via-[rgba(14,14,12,0.25)] to-transparent opacity-100 md:opacity-0"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-[var(--color-bg)] md:p-10">
                  <div data-card-title>
                    <p
                      className="eyebrow opacity-80"
                      style={{ color: "var(--color-bg)" }}
                    >
                      {p.locations.slice(0, 2).join(" · ")}
                    </p>
                    <h3 className="mt-2 font-display text-[2rem] leading-[0.98] md:text-[clamp(1.8rem,2.6vw,2.8rem)]">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <span className="absolute top-5 right-5 text-[0.66rem] tracking-[0.18em] uppercase text-[var(--color-bg)] opacity-70 md:top-8 md:right-8 md:text-[0.7rem]">
                  {p.imageCount} photos
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
