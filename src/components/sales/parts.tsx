import { useRef, useState, type ReactNode } from "react";
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

/** Carrossel fluido (marquee) em loop contínuo, sem pausa e sem setas laterais. */
export function Carousel({
  count,
  children,
  label,
  interval = 2200,
}: {
  count: number;
  children: ReactNode;
  label: string;
  autoPlay?: boolean;
  interval?: number;
}) {
  // Duração de um ciclo completo (ida) em ms: count * interval, com piso de 4s.
  const durationMs = Math.max(count * interval, 4000);
  const durationSec = (durationMs / 1000).toFixed(2);
  // Pausa enquanto o usuário segura/arrasta (mouse ou toque); retoma instantaneamente ao soltar.
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      aria-roledescription="carrossel"
      aria-label={label}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
    >
      <div
        className="carousel-track flex w-max gap-4 py-2"
        style={{
          animation: `marquee ${durationSec}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {children}
        <div aria-hidden className="flex gap-4">
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
