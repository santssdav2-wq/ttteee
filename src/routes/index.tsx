import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import {
  ClipboardList,
  Target,
  Smartphone,
  Layers,
  Check,
  ShieldCheck,
  Gift,
  Award,
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
      <Demo />
      <Reasons />
      <Testimonials />
      <Bonuses />
      <Plans />
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
  const userStartedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);

  // O vídeo tem 12,7 MB. Baixá-lo junto com a página satura a conexão móvel e
  // atrasa o primeiro paint, então a prévia silenciosa começa pouco depois da
  // hidratação (que roda após o conteúdo já estar visível). O primeiro toque
  // continua reiniciando o vídeo do começo com áudio.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const timer = window.setTimeout(() => {
      if (userStartedRef.current || !video.paused) return;
      video.muted = true;
      void video.play().catch(() => {});
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

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
      userStartedRef.current = true;
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
    <section className="relative overflow-hidden bg-background px-4 pb-7 pt-5 sm:pb-9 sm:pt-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,oklch(0.64_0.18_148/0.11),transparent_65%)]"
      />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Hierarquia fixa: o +300 ocupa sempre a primeira linha, sozinho, em
            qualquer largura de tela. As linhas seguintes usam blocos separados
            para que o número nunca seja puxado para o meio da frase. */}
        <h1 className="font-headline text-ink">
          <span className="block text-[clamp(2.75rem,6.2vw,4rem)] font-black leading-[0.95] tracking-[-0.02em] text-forest">
            +300
          </span>
          <span className="mt-1 block text-[clamp(1.3rem,3.4vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.01em] text-forest">
            Dinâmicas Interativas
          </span>
          <span className="mt-1 block text-[clamp(1.15rem,2.7vw,1.7rem)] font-bold leading-[1.15] tracking-[-0.005em]">
            de CAPOEIRA Prontas para
          </span>
          <span className="mt-0.5 block text-[clamp(1.15rem,2.7vw,1.7rem)] font-bold leading-[1.15] tracking-[-0.005em]">
            Aplicar para os Alunos
          </span>
        </h1>
        <div className="relative mx-auto mt-4 aspect-[9/16] w-[calc(clamp(300px,40vh,350px)*9/16)] max-w-full overflow-hidden rounded-xl bg-ink shadow-lg sm:mt-5 sm:w-[calc(clamp(320px,44vh,400px)*9/16)] sm:rounded-2xl">
          <video
            ref={videoRef}
            src="/vsl.mp4"
            poster="/vsl-poster.webp"
            muted
            playsInline
            preload="none"
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
        <p className="font-hero mt-3 max-w-[26rem] text-balance text-[14px] leading-[1.5] text-muted-foreground sm:mt-4 sm:text-[15px]">
          Mais de 300 atividades com objetivos, materiais necessários e passo a passo, organizadas
          para você ter sempre uma nova ideia pronta para a próxima aula.
        </p>
        <div className="mt-4 w-full max-w-md">
          <CtaButton className="font-hero">QUERO AS +300 DINÂMICAS AGORA</CtaButton>
        </div>
      </div>
    </section>
  );
}

function Demo() {
  const imgs = offer.previewImages;
  const pages: ({ src: string; alt: string } | null)[] = imgs.length
    ? imgs
    : Array.from({ length: 5 }, () => null);

  const card = (img: (typeof pages)[number], i: number, extra: string) => (
    <div
      key={i}
      className={`${extra} aspect-[2/3] overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm`}
    >
      {img ? (
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="h-full w-full object-cover"
        />
      ) : (
        <MaterialPage n={i + 1} />
      )}
    </div>
  );

  return (
    <section className="bg-background px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-4xl" data-reveal>
        <SectionTitle eyebrow="Veja por dentro">
          Conheça Algumas das <span className="text-green-600 font-bold">Dinâmicas</span>
        </SectionTitle>
        {/* Celular: tira com encaixe; computador: grade de três colunas.
            Um único conjunto de imagens evita baixar a mesma prévia duas vezes. */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
          {pages.map((img, i) =>
            card(
              img,
              i,
              "w-[70vw] max-w-[280px] shrink-0 snap-center sm:w-full sm:max-w-none",
            ),
          )}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    icon: Layers,
    title: "Mais de 300 dinâmicas",
    text: "Diversas atividades prontas para ampliar as possibilidades das suas aulas de capoeira.",
  },
  {
    icon: ClipboardList,
    title: "Tudo organizado",
    text: "Dinâmicas organizadas para facilitar a consulta e encontrar atividades com mais praticidade.",
  },
  {
    icon: Target,
    title: "Fácil aplicação",
    text: "Orientações para ajudar na compreensão e aplicação das propostas durante as aulas.",
  },
  {
    icon: Smartphone,
    title: "Acesso digital",
    text: "Consulte o material digitalmente e tenha a possibilidade de imprimir as atividades.",
  },
];

function Reasons() {
  return (
    <section className="bg-muted px-4 py-9 sm:py-11">
      <div className="mx-auto w-full max-w-5xl">
        <SectionTitle eyebrow="Diferenciais">
          Por Que Escolher as <span className="text-green-600 font-bold">Dinâmicas</span> de
          Capoeira?
        </SectionTitle>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ transitionDelay: `${i * 60}ms` }}
              className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest/5 text-cta ring-1 ring-cta/15">
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <h3 className="mt-2.5 font-display text-[15px] font-extrabold leading-snug text-ink">
                {title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
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

function WhatsAppNote() {
  return (
    <p className="mt-2.5 text-center text-[11.5px] font-semibold leading-tight text-green-700">
      Você receberá seu material pelo WhatsApp.
    </p>
  );
}

function SecurityNote() {
  return (
    <p className="mt-1 flex items-center justify-center gap-1.5 text-[10.5px] font-medium text-muted-foreground">
      <ShieldCheck className="h-3 w-3 shrink-0 text-cta" aria-hidden="true" />
      Pagamento seguro
      <span aria-hidden="true">·</span>
      <Smartphone className="h-3 w-3 shrink-0 text-cta" aria-hidden="true" />
      Acesso digital
    </p>
  );
}

function Plans() {
  const [basico, completo] = offer.plans;
  // POPUP DE UPGRADE (R$ 17,90) DESATIVADO TEMPORARIAMENTE.
  // O componente `UpgradeDialog` e `offer.upgrade` continuam intactos neste arquivo
  // e em `src/config/offer.ts`. Para reativar, restaure:
  //   const [upgradeOpen, setUpgradeOpen] = useState(false);
  //   <CheckoutButton plan={basico} muted onSelect={() => setUpgradeOpen(true)} />
  //   <UpgradeDialog open={upgradeOpen} onClose={() => setUpgradeOpen(false)}
  //     basicCheckoutUrl={basico?.checkoutUrl ?? null} />
  return (
    <Section id="planos" className="bg-muted">
      <CountdownTimer />
      <SectionTitle eyebrow="Escolha seu plano">
        Escolha o melhor <span className="text-green-600 font-bold">pacote</span> para suas aulas
      </SectionTitle>
      {/* `data-reveal` fica no agrupamento, não em cada card: assim os dois planos
          aparecem juntos, no mesmo instante, sem efeito escalonado. */}
      <div className="mx-auto grid max-w-4xl items-start gap-4 md:grid-cols-2" data-reveal>
        {basico && (
          <article className="relative flex flex-col rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <h3 className="font-display text-lg font-extrabold leading-tight text-ink sm:text-xl">
              {basico.name}
            </h3>
            <div className="mt-2">
              <p className="font-display text-3xl font-extrabold leading-none text-ink sm:text-4xl">
                {basico.price ?? (
                  <span className="text-xl text-muted-foreground">Preço a definir</span>
                )}
              </p>
              {basico.priceNote && (
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {basico.priceNote}
                </p>
              )}
            </div>
            <ul className="my-3.5 space-y-1.5">
              {basico.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-start gap-2 text-[14px] leading-snug text-ink sm:text-[14.5px]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
                  <span>{it.label}</span>
                </li>
              ))}
            </ul>
            <CheckoutButton plan={basico} muted />
            <WhatsAppNote />
            <SecurityNote />
          </article>
        )}
        {completo && (
          <article className="relative flex flex-col rounded-2xl border-2 border-green-600 bg-card p-4 shadow-lg shadow-green-950/5 sm:p-5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-ink shadow-sm">
              Pacote mais vantajoso
            </span>
            <h3 className="font-display text-lg font-extrabold leading-tight text-ink sm:text-xl">
              {completo.name}
            </h3>
            {/* Mockup sozinho em cima; o preço fica abaixo da lista. */}
            <div className="mt-2 flex justify-center">
              <img
                src="/mockup-completo.webp"
                alt="Mockup do pacote completo: +300 dinâmicas e os três bônus"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="h-24 w-24 object-contain drop-shadow-sm sm:h-28 sm:w-28"
              />
            </div>
            <ul className="my-3.5 space-y-1.5">
              {completo.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-start gap-2 text-[14px] leading-snug text-ink sm:text-[14.5px]"
                >
                  {it.gift ? (
                    <Gift
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#c8951a]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                  )}
                  <span className={it.gift ? "font-semibold" : undefined}>{it.label}</span>
                </li>
              ))}
            </ul>
            <div className="mb-1 text-center">
              {completo.anchorPrice && (
                <p className="text-[11px] font-semibold leading-tight text-muted-foreground">
                  {completo.anchorLabel}{" "}
                  <span className="font-extrabold text-ink/50 line-through decoration-2">
                    {completo.anchorPrice}
                  </span>
                </p>
              )}
              <p className="font-display text-3xl font-extrabold leading-none text-primary sm:text-4xl">
                {completo.price ?? (
                  <span className="text-xl text-muted-foreground">Preço a definir</span>
                )}
              </p>
              {completo.priceNote && (
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {completo.priceNote}
                </p>
              )}
            </div>
            <CheckoutButton plan={completo} />
            <WhatsAppNote />
            <SecurityNote />
          </article>
        )}
      </div>
      {/* <UpgradeDialog
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        basicCheckoutUrl={basico?.checkoutUrl ?? null}
      /> */}
    </Section>
  );
}

function Bonuses() {
  if (!offer.bonuses.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest via-[oklch(0.3_0.08_158)] to-[oklch(0.42_0.12_152)] px-4 py-9 text-forest-foreground sm:py-11">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.83_0.15_84/0.22),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-4xl">
        <div className="text-center" data-reveal>
          <span className="eyebrow text-gold/90">Inclusos no Material Completo</span>
          <h2 className="mt-1.5 font-display text-[1.5rem] font-extrabold leading-tight text-forest-foreground sm:text-[1.9rem]">
            3 Bônus Exclusivos <span className="text-gold">Grátis</span>
          </h2>
          <div className="berimbau-line mx-auto mt-3" />
        </div>
        <ul className="mx-auto mt-6 grid max-w-sm gap-4 sm:max-w-none sm:grid-cols-3">
          {offer.bonuses.map((b, i) => (
            <li
              key={b.title}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="flex h-full flex-col rounded-2xl border border-white/50 bg-[#FBF7EC] p-2.5 shadow-xl shadow-black/20 ring-1 ring-black/5"
            >
              <div className="grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-xl bg-white p-2">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                ) : (
                  <Award className="h-10 w-10 text-forest" aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-2.5 flex flex-1 items-center justify-center px-1 pb-1 text-center font-display text-[13.5px] font-extrabold leading-snug text-ink sm:text-sm">
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
    <section className="bg-card px-4 py-7 sm:py-9">
      <div className="mx-auto w-full max-w-3xl" data-reveal>
        <SectionTitle eyebrow="Depoimentos" compact>
          O Que Estão <span className="text-green-600 font-bold">Dizendo</span>
        </SectionTitle>
        <Carousel count={count} label="Depoimentos sobre as dinâmicas" speed={0.45}>
          {imgs.map((img, i) => (
            <div
              key={i}
              className="aspect-[9/20] w-[44vw] shrink-0 snap-center overflow-hidden rounded-xl border border-border/70 bg-background p-1 shadow-sm sm:w-[172px]"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function Guarantee() {
  const g = offer.guarantee;
  if (!g) return null;
  return (
    <section className="bg-card px-4 py-7 sm:py-8">
      <div
        className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-border/70 bg-background p-4 text-center shadow-sm sm:flex-row sm:gap-4 sm:p-5 sm:text-left"
        data-reveal
      >
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-gold bg-forest text-gold">
          <div className="text-center leading-none">
            <ShieldCheck className="mx-auto h-4 w-4" aria-hidden="true" />
            <span className="font-display text-lg font-extrabold">{g.days}</span>
            <span className="block text-[8.5px] font-bold tracking-wide">DIAS</span>
          </div>
        </div>
        <div>
          <h2 className="text-[1.05rem] font-extrabold leading-tight text-ink sm:text-lg">
            GARANTIA INCONDICIONAL DE {g.days} DIAS
          </h2>
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{g.text}</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <Section spacing="py-8 sm:py-10">
      <SectionTitle eyebrow="Dúvidas" compact>
        Perguntas <span className="text-green-600 font-bold">Frequentes</span>
      </SectionTitle>
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        {offer.faq.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="py-3 text-left text-[14px] font-bold leading-snug text-ink">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-[13.5px] leading-relaxed text-muted-foreground">
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
    <section className="bg-forest px-4 py-9 text-center text-forest-foreground sm:py-11">
      <div className="mx-auto max-w-xl" data-reveal>
        <Target className="mx-auto mb-1.5 h-6 w-6 text-gold" aria-hidden="true" />
        <h2 className="text-[1.3rem] font-extrabold leading-[1.15] sm:text-[1.85rem]">
          Tenha Mais Dinâmicas à Sua Disposição Para as{" "}
          <span className="text-gold">Próximas Aulas</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-forest-muted">
          Conheça o material e descubra como ele pode ajudar a organizar suas propostas de capoeira.
        </p>
        <div className="mx-auto mt-4 w-full max-w-sm">
          <CtaButton>QUERO ACESSAR O MATERIAL</CtaButton>
        </div>
        {offer.purchaseInfo.length > 0 && (
          <p className="mt-2.5 text-[11px] text-forest-muted">{offer.purchaseInfo.join(" · ")}</p>
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
