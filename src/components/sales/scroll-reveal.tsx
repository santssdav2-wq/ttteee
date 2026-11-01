import { useEffect } from "react";

/**
 * Revela os elementos marcados com `data-reveal` conforme entram na tela.
 *
 * A marcação fica nos próprios elementos (sem wrappers extras), então o layout
 * não muda. Cada item é revelado uma única vez e deixa de ser observado. Quem
 * usa `prefers-reduced-motion` vê tudo de imediato (o CSS ignora a animação).
 */
export function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="in"])'),
    );
    if (!nodes.length) return;

    const showAll = () => nodes.forEach((node) => node.setAttribute("data-reveal", "in"));

    if (typeof IntersectionObserver === "undefined") {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
