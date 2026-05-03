import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorCustom() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const enterInteractive = () => {
      gsap.to(ring, { scale: 2.2, duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const leaveInteractive = () => {
      gsap.to(ring, { scale: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const enterMedia = () => {
      gsap.to(ring, {
        scale: 4,
        backgroundColor: "rgba(248, 247, 244, 0.92)",
        mixBlendMode: "difference",
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const leaveMedia = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        mixBlendMode: "normal",
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const attach = () => {
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor='link']").forEach((el) => {
        el.addEventListener("pointerenter", enterInteractive);
        el.addEventListener("pointerleave", leaveInteractive);
      });
      document.querySelectorAll<HTMLElement>("[data-cursor='media'], .js-cursor-media").forEach((el) => {
        el.addEventListener("pointerenter", enterMedia);
        el.addEventListener("pointerleave", leaveMedia);
      });
    };

    window.addEventListener("pointermove", move);
    attach();
    const obs = new MutationObserver(() => attach());
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", move);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="cursor-custom pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-ink)]"
        style={{ width: 36, height: 36, top: 0, left: 0 }}
      />
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-ink)]"
        style={{ width: 4, height: 4, top: 0, left: 0 }}
      />
    </div>
  );
}
