import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import { PLANS_ANCHOR, type Plan } from "@/config/offer";

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-5 py-14 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  children,
  light,
}: {
  eyebrow?: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
      {eyebrow && <span className="eyebrow mb-2">{eyebrow}</span>}
      <h2
        className={`max-w-xl text-[1.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl ${light ? "text-forest-foreground" : "text-ink"}`}
      >
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
      <span
        aria-disabled="true"
        className="btn-cta"
        title="Link de checkout pendente de configuração"
      >
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

/** Carrossel arrastável em loop contínuo: auto-scroll suave, pausa ao segurar/arrastar,
 *  retoma instantaneamente ao soltar; arrastável para esquerda/direita (mouse e toque). */
export function Carousel({
  count,
  children,
  label,
}: {
  count: number;
  children: ReactNode;
  label: string;
  autoPlay?: boolean;
  interval?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null); // primeira cópia (mede a largura de um ciclo)
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, scroll: 0 });

  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

  // Auto-scroll contínuo em loop, com wrap suave.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const speed = 1.2; // px/frame (~72px/s) — ritmo legível
    let raf = 0;
    const boundary = () => {
      const inner = el.firstChild as HTMLElement | null;
      const secondFirst = inner?.children?.[1]?.firstChild as HTMLElement | null;
      const innerRect = inner?.getBoundingClientRect();
      const itemRect = secondFirst?.getBoundingClientRect();
      if (innerRect && itemRect) return itemRect.left - innerRect.left;
      return (setRef.current?.offsetWidth ?? 0) + 16;
    };
    const step = () => {
      if (!draggingRef.current) {
        const b = boundary();
        el.scrollLeft += speed;
        if (b > 0 && el.scrollLeft >= b) el.scrollLeft -= b;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, scroll: el.scrollLeft };
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!dragging || !el) return;
    const delta = e.clientX - dragStart.current.x;
    const b = (() => {
      const inner = el.firstChild as HTMLElement | null;
      const secondFirst = inner?.children?.[1]?.firstChild as HTMLElement | null;
      const innerRect = inner?.getBoundingClientRect();
      const itemRect = secondFirst?.getBoundingClientRect();
      if (innerRect && itemRect) return itemRect.left - innerRect.left;
      return (setRef.current?.offsetWidth ?? 0) + 16;
    })();
    let newScroll = dragStart.current.scroll - delta;
    if (b > 0) {
      while (newScroll >= b) newScroll -= b;
      while (newScroll < 0) newScroll += b;
    }
    el.scrollLeft = newScroll;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    setDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        dragging ? "cursor-grabbing" : ""
      }`}
      aria-roledescription="carrossel"
      aria-label={label}
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="flex w-max gap-4 py-2">
        <div ref={setRef} className="flex shrink-0 gap-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-4" aria-hidden>
          {children}
        </div>
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
        <span className="rounded bg-forest px-1.5 py-0.5 text-[9px] font-bold text-forest-foreground">
          DINÂMICA {String(n).padStart(3, "0")}
        </span>
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
      <p className="mt-auto pt-2 text-center text-[8px] text-muted-foreground">
        Prévia de estrutura · União Capoeirista
      </p>
    </div>
  );
}
