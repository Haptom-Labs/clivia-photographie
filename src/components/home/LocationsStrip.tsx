import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Location {
  name: string;
  slug: string;
  image: string;
  count: number;
}

interface Props {
  locations: Location[];
}

export default function LocationsStrip({ locations }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const items = track.querySelectorAll<HTMLDivElement>("[data-loc-item]");
      items.forEach((it, i) => {
        gsap.fromTo(
          it,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: it,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const distance = track.scrollWidth - window.innerWidth + 80;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="territoires"
      className="relative overflow-hidden bg-[var(--color-bg-warm)] py-14 md:py-28"
    >
      <div className="mx-auto mb-8 flex max-w-[var(--container-wide)] flex-col gap-3 px-6 md:mb-16 md:px-10">
        <p className="eyebrow">Territoires</p>
        <h2 className="font-display text-3xl leading-tight md:text-[clamp(2.2rem,3.6vw,3.8rem)]">
          Un travail <span className="italic font-light">enraciné</span> en Gironde.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex w-max gap-5 px-5 will-change-transform md:gap-10 md:px-10"
      >
        {locations.map((loc) => (
          <a
            key={loc.slug}
            href={`/lieux/${loc.slug}`}
            data-loc-item
            data-cursor="link"
            className="group relative shrink-0 overflow-hidden bg-[var(--color-ink)]"
            style={{ width: "min(78vw, 540px)", aspectRatio: "3 / 4" }}
          >
            <img
              src={loc.image}
              alt={loc.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,12,0.6)] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--color-bg)] md:p-8">
              <p className="eyebrow opacity-80" style={{ color: "var(--color-bg)" }}>
                {loc.count} reportages
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-[var(--color-accent)] md:text-4xl">
                {loc.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
