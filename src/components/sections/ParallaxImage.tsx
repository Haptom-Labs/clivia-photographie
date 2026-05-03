import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  src: string;
  alt?: string;
  speed?: number;
  ratio?: "16/9" | "4/5" | "3/4" | "1/1" | "21/9" | "fullbleed";
  className?: string;
}

export default function ParallaxImage({
  src,
  alt = "",
  speed = 0.15,
  ratio = "16/9",
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!wrapRef.current || !imgRef.current) return;

      gsap.fromTo(
        imgRef.current,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        wrapRef.current,
        { clipPath: "inset(8% 8% 8% 8% round 6px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );
    }, wrapRef);
    return () => ctx.revert();
  }, [speed]);

  const ratioStyle =
    ratio === "fullbleed"
      ? { aspectRatio: undefined, height: "100svh" }
      : { aspectRatio: ratio.replace("/", " / ") };

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden bg-[var(--color-ink)] ${className}`}
      style={ratioStyle}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="js-cursor-media absolute inset-0 h-[120%] w-full object-cover will-change-transform"
      />
    </div>
  );
}
