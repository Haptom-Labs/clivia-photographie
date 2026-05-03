import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  src: string;
  alt?: string;
  ratio?: "16/9" | "4/5" | "3/4" | "1/1" | "21/9";
  reveal?: "left" | "right" | "up" | "center";
  className?: string;
  loading?: "eager" | "lazy";
}

export default function ImageReveal({
  src,
  alt = "",
  ratio = "16/9",
  reveal = "up",
  className = "",
  loading = "lazy",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const startClip = {
    left: "inset(0% 0% 0% 100%)",
    right: "inset(0% 100% 0% 0%)",
    up: "inset(100% 0% 0% 0%)",
    center: "inset(50% 50% 50% 50% round 8px)",
  }[reveal];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (wrapRef.current) wrapRef.current.style.clipPath = "inset(0% 0% 0% 0%)";
        return;
      }

      if (!wrapRef.current || !imgRef.current) return;

      gsap.set(wrapRef.current, { clipPath: startClip });
      gsap.set(imgRef.current, { scale: 1.18 });

      gsap.to(wrapRef.current, {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [reveal]);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden bg-[var(--color-ink)] ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className="js-cursor-media absolute inset-0 h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}
