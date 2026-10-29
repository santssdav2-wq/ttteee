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
  compact,
}: {
  eyebrow?: string;
  children: ReactNode;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center ${compact ? "mb-3 sm:mb-4" : "mb-8 sm:mb-12"}`}
    >
      {eyebrow && <span className="eyebrow mb-2">{eyebrow}</span>}
      <h2
        className={`max-w-xl text-[1.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl ${light ? "text-forest-foreground" : "text-ink"}`}
      >
        {children}
      </h2>
      <div className={`berimbau-line ${compact ? "mt-2.5" : "mt-4"}`} />
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

/** Botão de checkout do plano. Desativado enquanto o link estiver pendente.
 *  `muted`: variante apagada (cinza), usada no plano de entrada.
 *  `onSelect`: intercepta o clique (ex.: abrir popup) antes de navegar. */
export function CheckoutButton({
  plan,
  muted,
  onSelect,
}: {
  plan: Plan;
  muted?: boolean;
  onSelect?: () => void;
}) {
  const className = muted ? "btn-cta-muted" : "btn-cta";
  if (!plan.checkoutUrl) {
    return (
      <span
        aria-disabled="true"
        className={className}
        title="Link de checkout pendente de configuração"
      >
        {plan.ctaLabel} · LINK PENDENTE
      </span>
    );
  }
  return (
    <a
      href={plan.checkoutUrl}
      className={className}
      rel="noopener"
      onClick={
        onSelect
          ? (event) => {
              event.preventDefault();
              onSelect();
            }
          : undefined
      }
    >
      {plan.ctaLabel}
    </a>
  );
}

/** Largura de um ciclo completo (distância entre o 1º item da 1ª cópia e o 1º da 2ª cópia). */
function cycleWidth(el: HTMLDivElement) {
  const inner = el.firstChild as HTMLElement | null;
  const secondFirst = inner?.children?.[1]?.firstChild as HTMLElement | null;
  const innerRect = inner?.getBoundingClientRect();
  const itemRect = secondFirst?.getBoundingClientRect();
  if (innerRect && itemRect) return itemRect.left - innerRect.left;
  return 0;
}

/** Carrossel arrastável em loop contínuo: auto-scroll suave, pausa ao segurar/arrastar,
 *  retoma instantaneamente ao soltar; arrastável para esquerda/direita (mouse e toque).
 *  Gestos verticais são deixados para a página (rolagem normal), sem prender o dedo. */
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
  const pausedRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startScroll: 0,
    horizontal: false,
  });

  // Auto-scroll contínuo em loop, com wrap suave.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const speed = 1.2; // px/frame (~72px/s) — ritmo legível
    let raf = 0;
    const step = () => {
      if (!pausedRef.current) {
        const b = cycleWidth(el);
        el.scrollLeft += speed;
        if (b > 0 && el.scrollLeft >= b) el.scrollLeft -= b;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const endGesture = (pointerId?: number) => {
    const el = containerRef.current;
    if (el && pointerId !== undefined) {
      try {
        el.releasePointerCapture(pointerId);
      } catch {
        /* ignore */
      }
    }
    gesture.current = { pointerId: -1, startX: 0, startY: 0, startScroll: 0, horizontal: false };
    pausedRef.current = false;
    setDragging(false);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    gesture.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startScroll: el.scrollLeft,
      horizontal: false,
    };
    // Segurar pausa o auto-scroll, mas não bloqueia a rolagem da página.
    pausedRef.current = true;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const g = gesture.current;
    if (!el || g.pointerId !== e.pointerId) return;

    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;

    // Ainda não sabemos a intenção: espera um mínimo de movimento.
    if (!g.horizontal) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) >= Math.abs(dx)) {
        // Gesto vertical: solta o controle para a página rolar normalmente.
        endGesture();
        return;
      }
      g.horizontal = true;
      setDragging(true);
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    const b = cycleWidth(el);
    let newScroll = g.startScroll - dx;
    if (b > 0) {
      while (newScroll >= b) newScroll -= b;
      while (newScroll < 0) newScroll += b;
    }
    el.scrollLeft = newScroll;
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        dragging ? "cursor-grabbing" : ""
      }`}
      aria-roledescription="carrossel"
      aria-label={label}
      style={{ touchAction: "pan-y pinch-zoom" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => endGesture(e.pointerId)}
      onPointerCancel={() => endGesture()}
      onLostPointerCapture={() => endGesture()}
    >
      <div className="flex w-max gap-4 py-2">
        <div className="flex shrink-0 gap-4">{children}</div>
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
