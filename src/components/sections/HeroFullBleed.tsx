import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  image: string;
  alt?: string;
  eyebrow?: string;
  titleTop: string;
  titleBottom: string;
  subtitle?: string;
  height?: "full" | "tall";
}

export default function HeroFullBleed({
  image,
  alt = "",
  eyebrow,
  titleTop,
  titleBottom,
  subtitle,
  height = "full",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (imgRef.current && !reduced) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1, filter: "brightness(0.55)" },
          {
            scale: 1.08,
            filter: "brightness(0.7)",
            ease: "none",
            duration: 14,
            repeat: -1,
            yoyo: true,
          },
        );
      }
      if (titleRef.current && !reduced) {
        gsap.fromTo(
          titleRef.current.querySelectorAll(".js-hero-line"),
          { y: 110, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.18,
            delay: 0.25,
          },
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const heightCls =
    height === "tall"
      ? "min-h-[78svh] md:min-h-[80svh]"
      : "min-h-[94svh] md:min-h-[100svh]";

  return (
    <section
      ref={containerRef}
      className={`relative ${heightCls} flex items-end overflow-hidden bg-[#0e0e0c] text-[var(--color-bg)]`}
    >
      <img
        ref={imgRef}
        src={image}
        alt={alt}
        loading="eager"
        decoding="async"
        className="js-cursor-media absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(14,14,12,0.45)] via-transparent to-[rgba(14,14,12,0.65)]" />

      <div
        className="relative z-20 mx-auto w-full max-w-[var(--container-wide)] px-5 pb-10 md:px-10 md:pb-24"
        style={{
          paddingBottom: "max(3.5rem, env(safe-area-inset-bottom, 0px))",
        }}
      >
        {eyebrow && (
          <p
            className="eyebrow opacity-75"
            style={{ color: "var(--color-bg)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          ref={titleRef}
          className="mt-5 font-display leading-[0.9] tracking-[-0.018em] text-[clamp(3.6rem,18vw,5.4rem)] md:text-[clamp(4.5rem,10vw,9.5rem)]"
        >
          <span className="block overflow-hidden">
            <span className="js-hero-line block">{titleTop}</span>
          </span>
          <span className="block overflow-hidden">
            <span className="js-hero-line block italic font-light">
              {titleBottom}
            </span>
          </span>
        </h1>
        {subtitle && (
          <p className="mt-7 max-w-md text-[0.92rem] leading-relaxed opacity-85 md:text-[0.95rem]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 opacity-60">
          <span className="eyebrow text-[0.6rem]" style={{ color: "var(--color-bg)" }}>
            scroll
          </span>
          <span
            className="block h-10 w-px animate-[scrollIndicator_2.4s_ease-in-out_infinite] bg-[var(--color-bg)]"
            style={{ transformOrigin: "top" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
