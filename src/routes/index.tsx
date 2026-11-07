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
  ShoppingCart,
  Clock,
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
          <span className="block text-[clamp(3.25rem,6.2vw,4rem)] font-black leading-[0.95] tracking-[-0.02em] text-green-600">
            +300
          </span>
          <span className="mt-1 block text-[clamp(1.5rem,3.4vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.01em] text-green-600">
            Dinâmicas Interativas
          </span>
          <span className="mt-1 block text-[clamp(1.25rem,2.7vw,1.7rem)] font-bold leading-[1.15] tracking-[-0.005em]">
            de CAPOEIRA Prontas para
          </span>
          <span className="mt-0.5 block text-[clamp(1.25rem,2.7vw,1.7rem)] font-bold leading-[1.15] tracking-[-0.005em] text-gold">
            Aplicar para os Alunos
          </span>
        </h1>
        <div className="relative mx-auto mt-4 aspect-[9/16] w-[calc(clamp(340px,44vh,390px)*9/16)] max-w-full overflow-hidden rounded-xl bg-ink shadow-lg sm:mt-5 sm:w-[calc(clamp(340px,46vh,420px)*9/16)] sm:rounded-2xl">
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

const demoImages = Array.from({ length: 13 }, (_, i) => `/dinamica-${String(i + 1).padStart(2, "0")}.webp`);

function Demo() {
  const half = Math.ceil(demoImages.length / 2);
  const top = demoImages.slice(0, half);
  const bottom = demoImages.slice(half);
  const card = (src: string, i: number) => (
    <div
      key={i}
      className="aspect-[2/3] w-[32vw] max-w-[150px] shrink-0 overflow-hidden rounded-lg bg-card shadow-sm sm:w-[160px] sm:max-w-[160px]"
    >
      <img
        src={src}
        alt={`Dinâmica de capoeira ${i + 1}`}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="h-full w-full object-cover"
      />
    </div>
  );
  return (
    <section className="bg-background px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-4xl" data-reveal>
        <SectionTitle eyebrow="Veja por dentro">
          Conheça Algumas das <span className="text-green-600 font-bold">Dinâmicas</span>
        </SectionTitle>
        <div className="space-y-2 overflow-hidden">
          <div className="pointer-events-none">
            <Carousel count={top.length} label="Dinâmicas de capoeira" speed={0.5}>
              {top.map((src, i) => card(src, i))}
            </Carousel>
          </div>
          <div className="pointer-events-none">
            <Carousel count={bottom.length} label="Dinâmicas de capoeira" speed={0.5} reverse>
              {bottom.map((src, i) => card(src, half + i))}
            </Carousel>
          </div>
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
        <div className="mt-6 flex justify-center">
          <CtaButton className="font-hero">QUERO AS DINÂMICAS AGORA</CtaButton>
        </div>
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

function UpgradeDialog({
  open,
  onClose,
  basicCheckoutUrl,
  upgradeCheckoutUrl,
}: {
  open: boolean;
  onClose: () => void;
  basicCheckoutUrl: string | null;
  upgradeCheckoutUrl: string | null;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        className="relative max-h-[92vh] w-[94%] max-w-[24rem] overflow-y-auto rounded-2xl bg-white px-5 pb-4 pt-6 text-center shadow-2xl sm:w-full sm:max-w-md sm:px-7 sm:pb-5 sm:pt-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-ink/40 transition hover:bg-muted hover:text-ink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Cabeçalho */}
        <div className="flex flex-col items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold to-[#f5c542] shadow-lg shadow-gold/30 ring-4 ring-gold/20 sm:h-20 sm:w-20">
            <Gift className="h-8 w-8 text-forest sm:h-10 sm:w-10" aria-hidden="true" />
          </span>
          <h2
            id="upgrade-title"
            className="mt-3 font-display text-xl font-extrabold leading-tight text-ink sm:text-2xl"
          >
            VOCÊ GANHOU UM PRESENTE!
          </h2>
        </div>

        {/* Quadro de preço */}
        <div className="mt-4 rounded-xl border-2 border-gold/60 bg-[#FBF5E6] px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-sm font-bold text-ink sm:text-base">Leve o Plano Completo + Bônus</p>
          <p className="mt-1 text-sm font-semibold text-ink/45 line-through">
            De {upgrade.anchorPrice}
          </p>
          <p className="mt-0.5 font-display text-4xl font-extrabold leading-none text-cta sm:text-5xl">
            {upgrade.price}
          </p>
          <p className="mt-1.5 text-xs font-semibold text-cta sm:text-sm">
            Economize R$ 124,00.
          </p>
        </div>

        {/* Lista */}
        <div className="mt-4 text-left">
          <p className="text-sm font-extrabold uppercase tracking-wide text-ink sm:text-base">
            VOCÊ VAI RECEBER:
          </p>
          <ul className="mt-2 space-y-1.5">
            {upgrade.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-snug text-ink sm:text-[15px]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta sm:h-5 sm:w-5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botão principal */}
        {upgradeCheckoutUrl ? (
          <a
            ref={primaryRef}
            href={upgradeCheckoutUrl ?? "#"}
            className="btn-cta mt-5 !min-h-[52px] gap-2 text-base sm:!min-h-[56px] sm:text-lg"
            rel="noopener"
            suppressHydrationWarning
            onClick={() => {
              try {
                window.localStorage.setItem("capoeira_upgrade_dismissed", "1");
              } catch {
                /* ignore */
              }
            }}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {upgrade.ctaLabel}
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="btn-cta mt-5 !min-h-[52px] opacity-60"
          >
            {upgrade.ctaLabel}
          </span>
        )}

        {/* Opção secundária */}
        {basicCheckoutUrl ? (
          <a
            href={basicCheckoutUrl}
            onClick={() => {
              try {
                window.localStorage.setItem("capoeira_upgrade_dismissed", "1");
              } catch {
                /* ignore */
              }
            }}
            className="mt-3 inline-block text-sm font-semibold text-muted-foreground underline underline-offset-4 transition hover:text-ink"
          >
            {upgrade.dismissLabel}
          </a>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-block text-sm font-semibold text-muted-foreground underline underline-offset-4 transition hover:text-ink"
          >
            {upgrade.dismissLabel}
          </button>
        )}

        {/* Aviso */}
        <div className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 sm:text-sm">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          Se você sair agora, essa oferta não aparecerá novamente.
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Plans() {
  const [basico, completo] = offer.plans;
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const isDismissed = () => {
    try {
      return window.localStorage.getItem("capoeira_upgrade_dismissed") === "1";
    } catch {
      return false;
    }
  };

  const dismissUpgrade = () => {
    try {
      window.localStorage.setItem("capoeira_upgrade_dismissed", "1");
    } catch {
      /* ignore */
    }
    setUpgradeOpen(false);
  };

  const handleBasicClick = () => {
    if (isDismissed()) {
      if (basico?.checkoutUrl) window.location.href = basico.checkoutUrl;
      return;
    }
    setUpgradeOpen(true);
  };

  const handleUpgradeAccept = () => {
    try {
      window.localStorage.setItem("capoeira_upgrade_dismissed", "1");
    } catch {
      /* ignore */
    }
    setUpgradeOpen(false);
  };
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
            <CheckoutButton plan={basico} muted onSelect={handleBasicClick} />
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
      <UpgradeDialog
        open={upgradeOpen}
        onClose={dismissUpgrade}
        basicCheckoutUrl={basico?.checkoutUrl ?? null}
        upgradeCheckoutUrl={offer.upgrade.checkoutUrl}
      />
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
        <div className="mt-4 text-center" data-reveal>
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-gold sm:text-base">
            Mais de R$ 79 em b?nus extras!
          </p>
          <p className="mt-0.5 text-xs font-semibold text-forest-foreground/80 sm:text-sm">
            E voc? recebe todos gratuitamente no Plano Completo!
          </p>
        </div>
        <ul className="mx-auto mt-4 grid max-w-sm gap-4 sm:max-w-none sm:grid-cols-3">
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
              <h3 className="mt-2.5 flex flex-1 items-center justify-center px-1 text-center font-display text-[13.5px] font-extrabold leading-snug text-ink sm:text-sm">
                {b.title}
              </h3>
              <div className="mt-1 flex items-center justify-center gap-1.5">
                <span className="text-[10.5px] font-semibold text-ink/45 line-through">
                  De {b.referencePrice}
                </span>
                <span className="text-[10.5px] font-extrabold text-cta">
                  HOJE GR?TIS
                </span>
              </div>
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
