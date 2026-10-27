import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PLANS_ANCHOR, type Plan } from "@/config/offer";

export function Section({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`px-5 py-14 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionTitle({ eyebrow, children, light }: { eyebrow?: string; children: ReactNode; light?: boolean }) {
  return (
    <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
      {eyebrow && <span className="eyebrow mb-2">{eyebrow}</span>}
      <h2 className={`max-w-xl text-[1.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl ${light ? "text-forest-foreground" : "text-ink"}`}>
        {children}
      </h2>
      <div className="berimbau-line mt-4" />
    </div>
  );
}

/** CTA geral: rola até a seção de planos. */
export function CtaButton({ children }: { children: ReactNode }) {
  return (
    <a href={`#${PLANS_ANCHOR}`} className="btn-cta mx-auto max-w-md">
      {children}
    </a>
  );
}

/** Botão de checkout do plano. Desativado enquanto o link estiver pendente. */
export function CheckoutButton({ plan }: { plan: Plan }) {
  if (!plan.checkoutUrl) {
    return (
      <span aria-disabled="true" className="btn-cta" title="Link de checkout pendente de configuração">
        {plan.ctaLabel} · LINK PENDENTE
      </span>
    );
  }
  return (
    <a href={plan.checkoutUrl} className="btn-cta" rel="noopener">
      {plan.ctaLabel}
    </a>
  );
}

/** Carrossel leve com scroll-snap (toque nativo) + setas e indicadores. */
export function Carousel({ count, children, label }: { count: number; children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      Array.from(el.children).forEach((child, index) => {
        const item = child as HTMLElement;
        const delta = Math.abs(item.offsetLeft - el.offsetLeft + item.offsetWidth / 2 - center);
        if (delta < distance) {
          nearest = index;
          distance = delta;
        }
      });
      setActive(nearest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = ref.current;
    const item = el?.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div className="relative" aria-roledescription="carrossel" aria-label={label}>
      <div
        ref={ref}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[12%] pb-2 [scrollbar-width:none] sm:mx-0 sm:px-[calc(50%_-_200px)] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button aria-label="Anterior" onClick={() => go(active - 1)} className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-md sm:grid">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button aria-label="Próxima" onClick={() => go(active + 1)} className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-md sm:grid">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="mt-5 flex justify-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-cta" : "w-2 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}

/** Página-modelo temporária do material (substituir por imagens reais em offer.previewImages). */
export function MaterialPage({ n, compact }: { n: number; compact?: boolean }) {
  const line = (w: string) => <div className={`h-1.5 rounded-full bg-muted ${w}`} />;
  return (
    <div className="flex h-full flex-col bg-card p-3 text-left">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded bg-forest px-1.5 py-0.5 text-[9px] font-bold text-forest-foreground">DINÂMICA {String(n).padStart(3, "0")}</span>
        <span className="h-2 w-2 rounded-full bg-gold" />
      </div>
      <div className="mb-3 h-2.5 w-3/4 rounded-full bg-ink/80" />
      {["Objetivo", "Materiais", "Como aplicar"].map((t, i) => (
        <div key={t} className="mb-2.5">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-primary">{t}</p>
          <div className="space-y-1">
            {line("w-full")}
            {line(i === 2 ? "w-11/12" : "w-2/3")}
            {i === 2 && !compact && (
              <>
                {line("w-full")}
                {line("w-4/5")}
                {line("w-3/5")}
              </>
            )}
          </div>
        </div>
      ))}
      <p className="mt-auto pt-2 text-center text-[8px] text-muted-foreground">Prévia de estrutura · União Capoeirista</p>
    </div>
  );
}
