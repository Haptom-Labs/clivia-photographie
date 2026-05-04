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
  titleSize?: "default" | "compact";
}

export default function HeroFullBleed({
  image,
  alt = "",
  eyebrow,
  titleTop,
  titleBottom,
  subtitle,
  height = "full",
  titleSize = "default",
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
          className={`mt-5 font-display leading-[1.05] tracking-[-0.018em] ${
            titleSize === "compact"
              ? "text-[clamp(2.6rem,11vw,4.4rem)] md:text-[clamp(3.4rem,7vw,7rem)]"
              : "text-[clamp(3.6rem,18vw,5.4rem)] md:text-[clamp(4.5rem,10vw,9.5rem)] leading-[1]"
          }`}
        >
          <span className="block overflow-hidden pb-[0.18em]">
            <span className="js-hero-line block">{titleTop}</span>
          </span>
          <span className="block overflow-hidden pb-[0.18em]">
            <span className="js-hero-line block italic font-light">
              {titleBottom}
            </span>
          </span>
        </h1>
        {subtitle && (
          <p
            className="max-w-md text-[0.92rem] leading-relaxed opacity-85 md:text-[0.95rem]"
            style={{ marginTop: titleSize === "compact" ? "3rem" : "1.75rem" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
        <svg
          width="10"
          height="40"
          viewBox="0 0 10 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ color: "var(--color-bg)" }}
          className="opacity-45"
        >
          <path
            d="M5 1 V31"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            pathLength={100}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: "drawHeroLine 3.6s cubic-bezier(0.6,0.05,0.3,1) infinite",
            }}
          />
          <path
            d="M1.5 28 L5 31.5 L8.5 28"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: "drawHeroArrow 3.6s cubic-bezier(0.6,0.05,0.3,1) infinite",
            }}
          />
        </svg>
      </div>

      <style>{`
        @keyframes drawHeroLine {
          0%   { stroke-dashoffset: 100; opacity: 0; }
          8%   { opacity: 1; }
          40%  { stroke-dashoffset: 0; opacity: 1; }
          80%  { stroke-dashoffset: 0; opacity: 1; }
          92%  { opacity: 0; }
          100% { stroke-dashoffset: 100; opacity: 0; }
        }
        @keyframes drawHeroArrow {
          0%   { stroke-dashoffset: 100; opacity: 0; }
          40%  { stroke-dashoffset: 100; opacity: 0; }
          60%  { stroke-dashoffset: 0; opacity: 1; }
          80%  { stroke-dashoffset: 0; opacity: 1; }
          92%  { opacity: 0; }
          100% { stroke-dashoffset: 100; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
