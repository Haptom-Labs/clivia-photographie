import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  cover: string;
  series: { location: string; image: string; postCount: number }[];
  totalImages: number;
  yearStart: number;
  yearEnd: number;
}

export default function CarnetVoyageTeaser({
  cover,
  series,
  totalImages,
  yearStart,
  yearEnd,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!sectionRef.current || !coverRef.current) return;

      gsap.fromTo(
        coverRef.current,
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      const lines = titleRef.current?.querySelectorAll<HTMLElement>(".js-line");
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 110, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const cards = sectionRef.current.querySelectorAll<HTMLDivElement>(
        "[data-voyage-card]",
      );
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const yearRange =
    yearStart === yearEnd ? `${yearStart}` : `${yearStart} – ${yearEnd}`;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-bg)] px-5 py-14 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[var(--container-wide)]">
        <div className="mb-8 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-9">
            <p className="eyebrow mb-4">— Hors commande</p>
            <h2
              ref={titleRef}
              className="font-display text-[clamp(2.6rem,9vw,5rem)] leading-[1.04] tracking-[-0.015em] md:text-[clamp(3.2rem,5.6vw,5.6rem)]"
            >
              <span className="block overflow-hidden pb-[0.18em]">
                <span className="js-line block">Quand l'œil prend</span>
              </span>
              <span className="block overflow-hidden pb-[0.18em]">
                <span className="js-line block italic font-light">
                  des vacances.
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              Notes visuelles personnelles glanées entre deux reportages —
              {" "}
              {totalImages} photographies, {yearRange}.
            </p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <a
              href="/carnet-de-voyage"
              data-cursor="link"
              className="border-b border-[var(--color-ink)] pb-1 text-[0.78rem] tracking-[0.2em] uppercase transition-colors hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
            >
              Découvrir le carnet →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <a
            href="/carnet-de-voyage"
            data-cursor="link"
            className="relative col-span-1 block overflow-hidden bg-[var(--color-ink)] aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-[4/5]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                ref={coverRef}
                src={cover}
                alt="Carnet de voyage — image principale"
                loading="lazy"
                className="js-cursor-media h-[112%] w-full object-cover will-change-transform"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,12,0.75)] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-[var(--color-bg)] md:p-10">
              <p
                className="eyebrow opacity-80"
                style={{ color: "var(--color-bg)" }}
              >
                Personnel
              </p>
              <h3 className="mt-2 font-display text-[2rem] leading-[1.05] md:text-[clamp(2rem,2.8vw,3rem)]">
                Carnet de voyage
              </h3>
            </div>
          </a>

          {series.slice(0, 2).map((s, i) => (
            <a
              key={s.location}
              href="/carnet-de-voyage"
              data-cursor="link"
              data-voyage-card
              className={`relative block overflow-hidden bg-[var(--color-ink)] md:col-span-5 ${
                i === 0
                  ? "aspect-[3/4] ml-auto w-[95%] md:ml-0 md:w-auto md:aspect-[1/1]"
                  : "aspect-[16/11] mr-auto w-[97%] md:mr-0 md:w-auto md:aspect-[3/4]"
              }`}
            >
              <img
                src={s.image}
                alt={s.location}
                loading="lazy"
                className="js-cursor-media absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,12,0.75)] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-[var(--color-bg)] md:p-8">
                <p
                  className="eyebrow opacity-80"
                  style={{ color: "var(--color-bg)" }}
                >
                  {s.postCount} reportages
                </p>
                <h4 className="mt-2 font-display text-[1.6rem] leading-[1] md:text-[clamp(1.5rem,2vw,2rem)]">
                  {s.location}
                </h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
