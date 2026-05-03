import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorCustom() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    document.documentElement.style.setProperty("cursor", "none");
    document
      .querySelectorAll<HTMLElement>("a, button, input, textarea, [data-cursor]")
      .forEach((el) => (el.style.cursor = "none"));

    gsap.set(wrap, { autoAlpha: 0 });

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.38, ease: "power3" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.38, ease: "power3" });

    let revealed = false;
    const move = (e: PointerEvent) => {
      if (!revealed) {
        gsap.to(wrap, { autoAlpha: 1, duration: 0.35 });
        revealed = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const leave = () => {
      gsap.to(wrap, { autoAlpha: 0, duration: 0.25 });
      revealed = false;
    };

    const setState = (state: "default" | "link" | "media") => {
      if (state === "link") {
        gsap.to(ring, {
          width: 6,
          height: 6,
          duration: 0.35,
          ease: "power3.out",
        });
      } else if (state === "media") {
        gsap.to(ring, {
          width: 44,
          height: 44,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(ring, {
          width: 14,
          height: 14,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    const press = () =>
      gsap.to(ring, { scale: 0.8, duration: 0.16, ease: "power3.out" });
    const release = () =>
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });

    const handlersByEl = new WeakMap<HTMLElement, { in: () => void; out: () => void }>();

    const attach = () => {
      document
        .querySelectorAll<HTMLElement>("a, button, [data-cursor='link']")
        .forEach((el) => {
          if (handlersByEl.has(el)) return;
          const h = { in: () => setState("link"), out: () => setState("default") };
          el.addEventListener("pointerenter", h.in);
          el.addEventListener("pointerleave", h.out);
          el.style.cursor = "none";
          handlersByEl.set(el, h);
        });
      document
        .querySelectorAll<HTMLElement>("[data-cursor='media'], .js-cursor-media")
        .forEach((el) => {
          if (handlersByEl.has(el)) return;
          const h = { in: () => setState("media"), out: () => setState("default") };
          el.addEventListener("pointerenter", h.in);
          el.addEventListener("pointerleave", h.out);
          el.style.cursor = "none";
          handlersByEl.set(el, h);
        });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    attach();
    const obs = new MutationObserver(() => attach());
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      obs.disconnect();
      document.documentElement.style.removeProperty("cursor");
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="cursor-custom pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    >
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 14,
          height: 14,
          backgroundColor: "#ffffff",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
