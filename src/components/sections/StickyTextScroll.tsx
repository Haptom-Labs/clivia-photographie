import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  images: string[];
  eyebrow?: string;
  title: string;
  body?: string;
  side?: "left" | "right";
}

export default function StickyTextScroll({
  images,
  eyebrow,
  title,
  body,
  side = "right",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!imagesRef.current) return;

      const items = Array.from(
        imagesRef.current.querySelectorAll<HTMLDivElement>("[data-sticky-img]"),
      );
      items.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { y: 90, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: idx * 0.05,
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stickyOnLeft = side === "left";

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[var(--container-wide)] gap-12 md:grid-cols-12 md:gap-16">
        <div
          className={`md:col-span-4 ${stickyOnLeft ? "md:order-1" : "md:order-2"}`}
        >
          <div className="md:sticky md:top-32">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h2 className="font-display text-4xl leading-[1.04] md:text-[clamp(2.4rem,3.4vw,3.8rem)]">
              {title}
            </h2>
            {body && (
              <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
                {body}
              </p>
            )}
          </div>
        </div>

        <div
          ref={imagesRef}
          className={`md:col-span-8 grid grid-cols-1 gap-6 md:gap-10 ${stickyOnLeft ? "md:order-2" : "md:order-1"}`}
        >
          {images.map((src, i) => (
            <div
              key={src}
              data-sticky-img
              className={`relative w-full overflow-hidden bg-[var(--color-ink)] ${
                i % 3 === 0 ? "md:translate-x-0" : i % 3 === 1 ? "md:translate-x-8" : "md:-translate-x-4"
              }`}
              style={{ aspectRatio: i % 2 === 0 ? "4 / 5" : "3 / 4" }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="js-cursor-media absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
