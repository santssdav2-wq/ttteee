import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  ClipboardList,
  Target,
  Smartphone,
  Layers,
  Users,
  GraduationCap,
  Building2,
  Baby,
  Check,
  ShieldCheck,
  Gift,
  Award,
  Printer,
  X,
} from "lucide-react";
import { offer } from "@/config/offer";
import {
  Section,
  SectionTitle,
  CtaButton,
  CheckoutButton,
  Carousel,
  MaterialPage,
} from "@/components/sales/parts";
import { ScrollReveal } from "@/components/sales/scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "+300 Dinâmicas Interativas de Capoeira | União Capoeirista" },
      {
        name: "description",
        content:
          "Material digital com +300 dinâmicas interativas de capoeira prontas para aplicar nas aulas. Para professores e instrutores.",
      },
      {
        property: "og:title",
        content: "+300 Dinâmicas Interativas de Capoeira | União Capoeirista",
      },
      {
        property: "og:description",
        content: "Repertório organizado de dinâmicas para quem ensina capoeira.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    // A capa do vídeo é o maior elemento da primeira dobra (LCP no mobile).
    // Antecipar o download evita que o navegador só a busque ao montar o <video>.
    links: [{ rel: "preload", as: "image", href: "/vsl-poster.webp", fetchPriority: "high" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-hidden">
      <ScrollReveal />
      <TopBar />
      <Hero />
      <Receive />
      <Audience />
      <Bonuses />
      <Plans />
      <Testimonials />
      <Guarantee />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}

function TopBar() {
  return (
    <div className="bg-forest px-4 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-gold sm:text-[11px]">
      Material digital | Acesso imediato
    </div>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);

  // O vídeo NÃO pausa ao rolar a página: quem começa a assistir continua
  // ouvindo enquanto navega pelo conteúdo.
  //
  // O player nativo fica escondido (sem o atributo `controls`): nada de barra
  // de progresso, tempo ou botões. O toque em qualquer ponto da moldura é o
  // único controle — o primeiro reinicia do começo com som; os seguintes
  // pausam e retomam exatamente de onde pararam, também com som.
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!started) {
      video.muted = false;
      video.currentTime = 0;
      void video.play();
      setStarted(true);
      return;
    }
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const handleToggleKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    togglePlayback();
  };

  return (
    <section className="relative bg-background px-4 pb-6 pt-6 sm:pb-8 sm:pt-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="eyebrow">Material para quem ensina capoeira</p>
        <h1 className="font-headline mx-auto mt-4 max-w-3xl text-balance text-[1.35rem] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink sm:mt-4.5 sm:text-[2rem]">
          +300 dinâmicas prontas para <span className="text-green-600">facilitar sua rotina</span>{" "}
          nas aulas de <span className="text-green-600">CAPOEIRA</span>
        </h1>
        <div className="relative mx-auto mt-4.5 aspect-[9/16] w-[calc(clamp(340px,45vh,400px)*9/16)] max-w-full overflow-hidden rounded-xl bg-ink shadow-lg sm:mt-6 sm:w-[calc(clamp(330px,52vh,470px)*9/16)] sm:rounded-2xl">
          <video
            ref={videoRef}
            src="/vsl.mp4"
            poster="/vsl-poster.webp"
            autoPlay
            muted
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="h-full w-full object-cover"
          />
          {/* Camada invisível cobrindo toda a moldura: é o único controle do
              vídeo. 1º toque inicia do começo com som; depois alterna pausa e
              continuação de onde parou. */}
          <div
            role="button"
            tabIndex={0}
            aria-label={
              !started
                ? "Toque para assistir com áudio"
                : playing
                  ? "Pausar vídeo"
                  : "Continuar vídeo de onde parou"
            }
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={togglePlayback}
            onKeyDown={handleToggleKey}
          />
          {!started && (
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="pulse-cta pointer-events-none absolute inset-x-2 top-1/2 z-20 mx-auto w-fit max-w-full -translate-y-1/2 rounded-xl bg-gold px-2.5 py-1.5 text-center text-[11px] font-extrabold leading-tight text-balance text-forest shadow-xl transition-all hover:opacity-90 sm:text-xs"
            >
              🔊 TOQUE PARA ASSISTIR COM ÁUDIO
            </button>
          )}
          {/* Balão de pausa: some sozinho quando o vídeo volta a tocar. */}
          {started && !playing && (
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 top-1/2 z-20 mx-auto flex w-fit max-w-full -translate-y-1/2 flex-col items-center gap-0.5 rounded-xl bg-gold px-2.5 py-1.5 text-forest shadow-xl sm:px-3 sm:py-2"
            >
              <span className="text-[11px] font-extrabold leading-none sm:text-xs">⏸ PAUSADO</span>
              <span className="text-[9px] font-bold uppercase leading-none tracking-wide text-forest/75">
                Toque para continuar
              </span>
            </button>
          )}
        </div>
        <p className="font-hero mt-3.5 max-w-[27rem] text-balance text-[14px] leading-[1.5] text-muted-foreground sm:mt-5 sm:text-[15px]">
          Mais de 300 atividades com objetivos, materiais necessários e passo a passo, organizadas
          para você ter sempre uma nova ideia pronta para a próxima aula.
        </p>
        <div className="mt-4 w-full sm:mt-5">
          <CtaButton className="font-hero">QUERO AS +300 DINÂMICAS AGORA</CtaButton>
        </div>
      </div>
    </section>
  );
}

const receiveItems = [
  {
    icon: Layers,
    title: "+300 dinâmicas",
    text: "Dinâmicas interativas de capoeira em um só material.",
  },
  {
    icon: Gift,
    title: "Bônus exclusivos",
    text: "Materiais extras para complementar suas dinâmicas e enriquecer suas aulas.",
  },
  {
    icon: BookOpen,
    title: "Organizadas",
    text: "Atividades organizadas para facilitar a consulta.",
  },
  { icon: ClipboardList, title: "Como aplicar", text: "Orientações de aplicação das propostas." },
  { icon: Smartphone, title: "Acesso digital", text: "Consulte no celular, tablet ou computador." },
  {
    icon: Printer,
    title: "Pronto para Imprimir",
    text: "Aplique nas aulas sem depender de tecnologia.",
  },
];

function Receive() {
  return (
    <Section className="bg-card" spacing="pb-7 pt-7 sm:pb-9 sm:pt-9">
      <SectionTitle eyebrow="O material">
        O Que Você <span className="text-green-600 font-bold">Vai Receber</span>?
      </SectionTitle>
      <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-2.5 sm:gap-3">
        {receiveItems.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
            className="flex items-start gap-2.5 rounded-lg border bg-background p-2.5 sm:gap-3 sm:p-3.5"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forest text-gold sm:h-10 sm:w-10">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-[13.5px] font-bold leading-tight text-ink sm:text-base">
                {title}
              </h3>
              <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground sm:text-sm">
                {text}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t pt-5 sm:mt-6 sm:pt-6" data-reveal>
        <Demo />
      </div>
    </Section>
  );
}

function Demo() {
  const imgs = offer.previewImages;
  const count = imgs.length || 5;
  return (
    <div>
      <SectionTitle eyebrow="Por dentro">
        Conheça Algumas das <span className="text-green-600 font-bold">Dinâmicas</span>
      </SectionTitle>
      <Carousel count={count} label="Prévias do material">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] w-[66vw] shrink-0 snap-center overflow-hidden rounded-lg border bg-card shadow-sm sm:w-[340px]"
          >
            {imgs[i] ? (
              <img
                src={imgs[i].src}
                alt={imgs[i].alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <MaterialPage n={i + 1} />
            )}
          </div>
        ))}
      </Carousel>
      {!imgs.length && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Prévias ilustrativas da estrutura das páginas.
        </p>
      )}
    </div>
  );
}

const audience = [
  { icon: GraduationCap, t: "Professores e instrutores de capoeira" },
  { icon: Users, t: "Mestres e contramestres que organizam aulas" },
  { icon: Building2, t: "Profissionais de projetos e atividades de capoeira" },
  { icon: Baby, t: "Instrutores que trabalham com turmas infantis" },
];

function Audience() {
  return (
    <Section className="bg-card" spacing="pb-7 pt-7 sm:pb-9 sm:pt-9">
      <SectionTitle eyebrow="Para quem é?">
        Feito Para <span className="text-green-600 font-bold">Quem Ensina Capoeira</span>
      </SectionTitle>
      <ul className="mx-auto max-w-2xl divide-y">
        {audience.map(({ icon: Icon, t }, i) => (
          <li
            key={t}
            data-reveal
            style={{ transitionDelay: `${i * 70}ms` }}
            className="flex items-center gap-3 py-2.5"
          >
            <Icon className="h-5 w-5 shrink-0 text-cta" />
            <span className="text-[14.5px] font-semibold leading-snug text-ink">{t}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CountdownTimer() {
  const [seconds, setSeconds] = useState(11 * 60 + 13);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setSeconds((s) => (s <= 0 ? 11 * 60 + 13 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <div className="mx-auto mb-4 flex max-w-md items-center justify-center gap-2.5 rounded-xl border border-cta/30 bg-card px-3.5 py-2 shadow-sm sm:mb-5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        Oferta expira em
      </span>
      <span className="font-mono text-xl font-extrabold tabular-nums text-cta">
        {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      </span>
    </div>
  );
}

/** Popup de upgrade exibido ao escolher o Material Básico. */
function UpgradeDialog({
  open,
  onClose,
  basicCheckoutUrl,
}: {
  open: boolean;
  onClose: () => void;
  basicCheckoutUrl: string | null;
}) {
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const upgrade = offer.upgrade;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primaryRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm motion-safe:animate-[dialog-fade_180ms_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        className="relative max-h-[85vh] w-full max-w-[16rem] overflow-y-auto rounded-2xl bg-white px-2.5 pb-2 pt-4 text-center shadow-2xl motion-safe:animate-[dialog-pop_200ms_ease-out] sm:max-w-[18rem] sm:px-3"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-1.5 top-1.5 rounded-full p-0.5 text-ink/40 transition hover:bg-muted hover:text-ink"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>

        <span className="inline-flex items-center rounded-full bg-gold px-1.5 py-0.5 text-[8px] font-extrabold uppercase leading-none tracking-[0.12em] text-ink">
          {upgrade.badge}
        </span>

        <h2
          id="upgrade-title"
          className="mt-1 font-display text-[14px] font-extrabold leading-[1.1] text-ink sm:text-base"
        >
          {upgrade.title}
        </h2>
        <p className="mx-auto mt-0.5 max-w-[14rem] text-[10px] font-semibold leading-snug text-ink/65">
          {upgrade.subtitle}
        </p>

        <div className="mt-1.5 flex items-center justify-center gap-1.5 rounded-lg border border-gold/40 bg-[#FAF5E9] px-2 py-1">
          <div className="flex flex-col items-center leading-none">
            {upgrade.anchorPrice ? (
              <span className="text-[8.5px] font-bold text-ink/45 line-through">
                {upgrade.anchorPrice}
              </span>
            ) : null}
            <span className="font-display text-[22px] font-extrabold leading-none text-ink">
              {upgrade.price}
            </span>
          </div>
          <span className="max-w-[5.5rem] border-l border-gold/40 pl-1.5 text-left text-[9px] font-bold leading-[1.2] text-green-700">
            {upgrade.priceNote}
          </span>
        </div>

        <ul className="mx-auto mt-1.5 space-y-0.5 text-left">
          {upgrade.items.map((item) => (
            <li key={item} className="flex items-start gap-1 text-[10px] leading-snug text-ink">
              <Check className="mt-[2px] h-2 w-2 shrink-0 text-cta" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {upgrade.checkoutUrl ? (
          <a
            ref={primaryRef}
            href={upgrade.checkoutUrl}
            className="btn-cta btn-cta-gold-pulse mt-1.5 !min-h-[36px] !text-[0.75rem] !px-2"
            rel="noopener"
            suppressHydrationWarning
          >
            {upgrade.ctaLabel}
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="btn-cta mt-1.5 !min-h-[36px] !text-[0.75rem] opacity-60"
            title="Link de checkout pendente de configuração"
          >
            {upgrade.ctaLabel} · LINK PENDENTE
          </span>
        )}

        {basicCheckoutUrl ? (
          <a
            href={basicCheckoutUrl}
            className="mt-0.5 inline-block px-2 py-0.5 text-[10px] font-semibold text-muted-foreground underline underline-offset-4 transition hover:text-ink"
          >
            {upgrade.dismissLabel}
          </a>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="mt-0.5 inline-block px-2 py-0.5 text-[10px] font-semibold text-muted-foreground underline underline-offset-4 transition hover:text-ink"
          >
            {upgrade.dismissLabel}
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Plans() {
  const [basico, completo] = offer.plans;
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  return (
    <Section id="planos" className="bg-muted">
      <CountdownTimer />
      <SectionTitle eyebrow="Escolha seu plano">
        Escolha o melhor <span className="text-green-600 font-bold">pacote</span> para suas aulas
      </SectionTitle>
      <p className="mx-auto -mt-2 mb-6 max-w-2xl text-center text-[14px] leading-relaxed text-muted-foreground sm:-mt-3 sm:mb-7 sm:text-[15px]">
        Comece com as dinâmicas de capoeira ou leve também os materiais extras para organizar e
        acompanhar suas aulas.
      </p>
      {/* `data-reveal` fica no agrupamento, não em cada card: assim os dois planos
          aparecem juntos, no mesmo instante, sem efeito escalonado. */}
      <div
        className="mx-auto grid max-w-4xl items-stretch gap-4 sm:gap-5 md:grid-cols-2"
        data-reveal
      >
        {basico && (
          <article className="relative flex h-full flex-col rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <h3 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
              {basico.name}
            </h3>
            <p className="mt-1 text-[13px] text-muted-foreground sm:text-sm">
              O essencial para ampliar seu repertório de atividades.
            </p>
            <div className="mt-3">
              <p className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
                {basico.price ?? (
                  <span className="text-xl text-muted-foreground">Preço a definir</span>
                )}
              </p>
              {basico.priceNote && (
                <p className="text-xs text-muted-foreground">{basico.priceNote}</p>
              )}
            </div>
            <ul className="my-4 flex-1 space-y-1.5">
              {basico.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-start gap-2 text-[14px] leading-snug text-ink sm:text-[15px]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta sm:h-5 sm:w-5" />
                  <span>{it.label}</span>
                </li>
              ))}
            </ul>
            <CheckoutButton plan={basico} muted onSelect={() => setUpgradeOpen(true)} />
          </article>
        )}
        {completo && (
          <article className="relative flex h-full flex-col rounded-xl border-2 border-green-600 bg-card p-4 shadow-lg sm:p-5 md:-mt-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-ink">
              PACOTE MAIS VANTAJOSO
            </span>
            <h3 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
              {completo.name}
            </h3>
            <p className="mt-1 text-[13px] text-muted-foreground sm:text-sm">
              Mais recursos para planejar suas aulas e acompanhar seus alunos.
            </p>
            <div className="mt-3 flex justify-center">
              <img
                src="/mockup-completo.webp"
                alt="Mockup do pacote completo: +300 dinâmicas e os três bônus"
                loading="lazy"
                decoding="async"
                className="h-32 w-32 object-contain drop-shadow-sm sm:h-36 sm:w-36"
              />
            </div>
            <ul className="my-4 flex-1 space-y-1.5">
              {completo.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-start gap-2 text-[14px] leading-snug text-ink sm:text-[15px]"
                >
                  {it.gift ? (
                    <Gift
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#c8951a] sm:h-5 sm:w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 sm:h-5 sm:w-5" />
                  )}
                  <span className={it.gift ? "font-semibold" : undefined}>{it.label}</span>
                </li>
              ))}
            </ul>
            <div className="mb-4 rounded-xl border border-gold/70 bg-gradient-to-b from-gold/20 to-gold/5 px-3 py-3 text-center">
              {completo.anchorPrice && (
                <p className="text-[12px] font-semibold text-ink/70">
                  {completo.anchorLabel}{" "}
                  <span className="text-[14px] font-extrabold text-ink/60 line-through decoration-2">
                    {completo.anchorPrice}
                  </span>
                </p>
              )}
              <p className="mt-0.5 text-[10.5px] font-extrabold uppercase tracking-wider text-green-700">
                Hoje o pacote completo sai por
              </p>
              <p className="font-display text-4xl font-extrabold leading-none text-primary sm:text-5xl">
                {completo.price ?? (
                  <span className="text-xl text-muted-foreground">Preço a definir</span>
                )}
              </p>
              {completo.priceNote && (
                <p className="mt-1 text-xs font-semibold text-muted-foreground">
                  {completo.priceNote}
                </p>
              )}
            </div>
            <CheckoutButton plan={completo} />
          </article>
        )}
      </div>
      <UpgradeDialog
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        basicCheckoutUrl={basico?.checkoutUrl ?? null}
      />
    </Section>
  );
}

function Bonuses() {
  if (!offer.bonuses.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest via-[oklch(0.3_0.08_158)] to-[oklch(0.42_0.12_152)] px-4 pb-7 pt-6 text-forest-foreground sm:pb-9 sm:pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.83_0.15_84/0.22),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-5xl" data-reveal>
        <SectionTitle light compact>
          E NÃO PARA <span className="font-bold text-gold">POR AÍ</span>!
        </SectionTitle>
        <p className="mx-auto mb-4 max-w-xl text-center text-[13px] leading-relaxed text-forest-muted sm:mb-5 sm:text-sm">
          Materiais extras{" "}
          <span className="font-semibold text-gold">inclusos no Material Completo</span> para
          reconhecer, acompanhar e planejar suas aulas.
        </p>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {offer.bonuses.map((b, i) => (
            <li
              key={b.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="flex flex-col items-center rounded-xl border border-gold/25 bg-[#FAF5E9] px-3 pb-2.5 pt-2 text-center shadow-lg shadow-black/10 sm:px-3.5 sm:pb-3 sm:pt-2.5"
            >
              <div className="w-full overflow-hidden rounded-lg md:aspect-square">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-contain mix-blend-multiply md:h-full"
                  />
                ) : (
                  <div className="grid aspect-square w-full place-items-center">
                    <Award className="h-12 w-12 text-forest" aria-hidden="true" />
                  </div>
                )}
              </div>
              <h3 className="mt-1.5 font-display text-[14px] font-bold leading-snug text-ink sm:text-base md:flex md:min-h-10 md:items-center md:justify-center">
                {b.title}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  const imgs = offer.testimonialImages;
  if (!imgs.length) return null;
  const count = imgs.length;
  return (
    <Section className="bg-card">
      <SectionTitle eyebrow="Depoimentos">
        O Que Estão <span className="text-green-600 font-bold">Dizendo</span> Sobre as Dinâmicas
      </SectionTitle>
      <p className="mx-auto -mt-2 mb-5 max-w-xl text-center text-[14px] leading-relaxed text-muted-foreground sm:-mt-4 sm:text-[15px]">
        Prints reais de quem já está usando as dinâmicas nas aulas de capoeira.
      </p>
      <Carousel count={count} label="Depoimentos sobre as dinâmicas" speed={0.5}>
        {imgs.map((img, i) => (
          <div
            key={i}
            className="aspect-[9/20] w-[58vw] shrink-0 snap-center overflow-hidden rounded-lg border bg-card shadow-sm sm:w-[250px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </Carousel>
    </Section>
  );
}

function Guarantee() {
  const g = offer.guarantee;
  if (!g) return null;
  return (
    <section className="bg-card px-4 py-8 sm:py-10">
      <div
        className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left"
        data-reveal
      >
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-gold bg-forest text-gold">
          <div className="text-center leading-none">
            <ShieldCheck className="mx-auto h-5 w-5" />
            <span className="font-display text-xl font-extrabold">{g.days}</span>
            <span className="block text-[10px] font-bold">DIAS</span>
          </div>
        </div>
        <div>
          <h2 className="text-[1.15rem] font-extrabold leading-tight text-ink sm:text-xl">
            VOCÊ TEM {g.days} DIAS DE GARANTIA
          </h2>
          <p className="mt-1 text-[14px] leading-snug text-muted-foreground">{g.text}</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <Section>
      <SectionTitle eyebrow="Dúvidas">
        Perguntas <span className="text-green-600 font-bold">Frequentes</span>
      </SectionTitle>
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        {offer.faq.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="py-3.5 text-left text-[14.5px] font-bold leading-snug text-ink">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="bg-forest px-4 py-10 text-center text-forest-foreground sm:py-14">
      <div className="mx-auto max-w-xl" data-reveal>
        <Target className="mx-auto mb-2 h-7 w-7 text-gold" />
        <h2 className="text-[1.35rem] font-extrabold leading-[1.15] sm:text-3xl">
          Tenha Mais Dinâmicas à Sua Disposição Para as{" "}
          <span className="text-gold">Próximas Aulas</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-forest-muted">
          Conheça o material e descubra como ele pode ajudar a organizar suas propostas de capoeira.
        </p>
        <div className="mt-5">
          <CtaButton>QUERO ACESSAR O MATERIAL</CtaButton>
        </div>
        {offer.purchaseInfo.length > 0 && (
          <p className="mt-3 text-xs text-forest-muted">{offer.purchaseInfo.join(" · ")}</p>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-4 py-6 text-center text-xs text-forest-muted">
      <p className="font-display text-sm font-bold text-gold">{offer.brand}</p>
      <p className="mt-1">
        © {new Date().getFullYear()} {offer.brand}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
