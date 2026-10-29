import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
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
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-hidden">
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
    <div className="bg-forest px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px] text-gold">
      Material digital para quem ensina capoeira
    </div>
  );
}

function Hero() {
  const [showButton, setShowButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <section className="relative bg-background px-5 pb-14 pt-8 sm:pt-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-4 font-display text-sm font-bold tracking-wide text-primary">
          {offer.brand}
        </span>
        <h1 className="isolate font-display font-extrabold leading-[1.02] tracking-tight text-ink">
          <span className="block text-[1.55rem] sm:text-[2.6rem]">
            <span className="text-[2.6rem] text-cta sm:text-[4.2rem]">+300</span> Dinâmicas
            Interativas de
          </span>
          <span className="relative mx-auto mt-1 block w-fit text-[3.1rem] text-green-600 sm:text-[5.2rem]">
            Capoeira
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-1 right-1 h-2.5 -z-0 rounded-sm bg-gold/70 sm:h-4"
              style={{ zIndex: -1 }}
            />
          </span>
          <span className="mt-2 block text-[1.45rem] sm:text-[2.4rem]">
            Prontas para{" "}
            <span className="mt-1 inline-block whitespace-nowrap rounded bg-forest px-2 pb-0.5 text-gold">
              Aplicar nas Aulas!
            </span>
          </span>
        </h1>
        <div className="relative mx-auto mt-6 w-[65%] max-w-2xl overflow-hidden rounded-2xl shadow-2xl sm:mt-8 sm:w-full">
          <video
            ref={videoRef}
            src="/vsl.mp4"
            poster="/vsl-poster.jpg"
            autoPlay
            muted
            playsInline
            preload="metadata"
            controls
            className="aspect-[9/16] h-auto w-full"
          />
          {showButton && (
            <>
              {/* Camada invisível cobrindo toda a moldura: clicar em qualquer ponto inicia com som. */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Toque para assistir com som"
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  video.muted = false;
                  video.currentTime = 0;
                  void video.play();
                  setShowButton(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const video = videoRef.current;
                    if (!video) return;
                    video.muted = false;
                    video.currentTime = 0;
                    void video.play();
                    setShowButton(false);
                  }
                }}
              />
              <button
                type="button"
                className="pulse-cta pointer-events-none absolute left-1/2 top-1/2 z-20 w-max -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gold px-4 py-2 text-xs font-extrabold text-forest shadow-xl transition-all hover:opacity-90 sm:px-5 sm:py-3 sm:text-sm"
              >
                🔊 TOQUE PARA ASSISTIR COM SOM
              </button>
            </>
          )}
        </div>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Tenha mais opções de dinâmicas e atividades para variar suas aulas de capoeira e facilitar
          a preparação das suas próximas propostas.
        </p>
        <div className="mt-2 w-full">
          <CtaButton>QUERO MINHAS DINÂMICAS AGORA</CtaButton>
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
    text: "Leve para o tatame sem depender de tecnologia.",
  },
];

function Receive() {
  return (
    <Section className="bg-card">
      <SectionTitle eyebrow="O material">
        O Que Você <span className="text-green-600 font-bold">Vai Receber</span>?
      </SectionTitle>
      <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-4">
        {receiveItems.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex items-start gap-3 rounded-lg border bg-background p-3 sm:gap-4 sm:p-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest text-gold sm:h-11 sm:w-11">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-ink sm:text-lg">{title}</h3>
              <p className="text-xs text-muted-foreground sm:text-[15px]">{text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 border-t pt-10 sm:mt-12 sm:pt-12">
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
            className="aspect-[3/4] w-[76vw] shrink-0 snap-center overflow-hidden rounded-lg border bg-card shadow-sm sm:w-[400px]"
          >
            {imgs[i] ? (
              <img
                src={imgs[i].src}
                alt={imgs[i].alt}
                loading="lazy"
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
    <Section className="bg-card">
      <SectionTitle eyebrow="Para quem é">
        Feito Para <span className="text-green-600 font-bold">Quem Ensina Capoeira</span>
      </SectionTitle>
      <ul className="mx-auto max-w-2xl divide-y">
        {audience.map(({ icon: Icon, t }) => (
          <li key={t} className="flex items-center gap-4 py-4">
            <Icon className="h-6 w-6 shrink-0 text-cta" />
            <span className="text-[16px] font-semibold text-ink">{t}</span>
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
      setSeconds((s) => (s <= 0 ? 11 * 60 + 13 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <div className="mx-auto mb-6 flex max-w-md items-center justify-center gap-3 rounded-xl border border-cta/30 bg-card px-4 py-3 shadow-sm sm:mb-8">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Oferta expira em
      </span>
      <span className="font-mono text-2xl font-extrabold tabular-nums text-cta">
        {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      </span>
    </div>
  );
}

function Plans() {
  const [basico, completo] = offer.plans;
  return (
    <Section id="planos" className="bg-muted">
      <CountdownTimer />
      <SectionTitle eyebrow="Escolha seu plano">
        Escolha o melhor <span className="text-green-600 font-bold">pacote</span> para suas aulas
      </SectionTitle>
      <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-[15px] leading-relaxed text-muted-foreground sm:-mt-10 sm:mb-12">
        Comece com as dinâmicas de capoeira ou leve também os materiais extras para organizar e
        acompanhar suas aulas.
      </p>
      <div className="mx-auto grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
        {basico && (
          <article className="relative flex h-full flex-col rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
            <h3 className="font-display text-2xl font-extrabold text-ink">{basico.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              O essencial para ampliar seu repertório de atividades.
            </p>
            <div className="mt-4">
              <p className="font-display text-4xl font-extrabold text-ink">
                {basico.price ?? (
                  <span className="text-xl text-muted-foreground">Preço a definir</span>
                )}
              </p>
              {basico.priceNote && (
                <p className="text-xs text-muted-foreground">{basico.priceNote}</p>
              )}
            </div>
            <ul className="my-5 flex-1 space-y-2">
              {basico.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-start gap-2 text-[14px] leading-snug text-ink sm:text-[15px]"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cta" />
                  <span>{it.label}</span>
                </li>
              ))}
            </ul>
            <CheckoutButton plan={basico} muted />
          </article>
        )}
        {completo && (
          <article className="relative flex h-full flex-col rounded-xl border-2 border-green-600 bg-card p-5 shadow-lg sm:p-6 md:-mt-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink">
              PACOTE MAIS COMPLETO
            </span>
            <h3 className="font-display text-2xl font-extrabold text-ink">{completo.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Mais recursos para planejar suas aulas e acompanhar seus alunos.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4 md:flex-col md:gap-2 lg:flex-row lg:gap-4">
              <div className="flex h-48 w-48 shrink-0 items-center justify-center sm:h-44 sm:w-44">
                <img
                  src="/mockup-completo.webp"
                  alt="Mockup do pacote completo: +300 dinâmicas e os três bônus"
                  loading="lazy"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="text-center sm:text-left md:text-center lg:text-left">
                <p className="font-display text-5xl font-extrabold text-primary">
                  {completo.price ?? (
                    <span className="text-xl text-muted-foreground">Preço a definir</span>
                  )}
                </p>
                {completo.priceNote && (
                  <p className="text-xs text-muted-foreground">{completo.priceNote}</p>
                )}
                <p className="mt-1 text-xs font-semibold text-green-700">
                  + {basico?.name?.toLowerCase()} + 3 bônus inclusos
                </p>
              </div>
            </div>
            <ul className="my-5 flex-1 space-y-2">
              {completo.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-start gap-2 text-[14px] leading-snug text-ink sm:text-[15px]"
                >
                  {it.gift ? (
                    <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#c8951a]" aria-hidden="true" />
                  ) : (
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  )}
                  <span className={it.gift ? "font-semibold" : undefined}>{it.label}</span>
                </li>
              ))}
            </ul>
            <CheckoutButton plan={completo} />
          </article>
        )}
      </div>
    </Section>
  );
}

function Bonuses() {
  if (!offer.bonuses.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest via-[oklch(0.3_0.08_158)] to-[oklch(0.42_0.12_152)] px-5 py-9 text-forest-foreground sm:py-11">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[34rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-5xl">
        <SectionTitle light compact>
          E NÃO PARA <span className="font-bold text-gold">POR AÍ</span>!
        </SectionTitle>
        <p className="mx-auto mb-5 max-w-xl text-center text-sm leading-relaxed text-forest-muted sm:mb-6">
          Três materiais extras{" "}
          <span className="font-semibold text-gold">inclusos no Plano Completo</span> para
          reconhecer, acompanhar e planejar suas aulas.
        </p>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {offer.bonuses.map((b) => (
            <li
              key={b.title}
              className="flex flex-col items-center rounded-2xl border border-gold/25 bg-[#FAF5E9]/95 p-3 text-center shadow-lg shadow-black/10 backdrop-blur-sm sm:p-4"
            >
              <div className="w-full overflow-hidden rounded-xl md:aspect-square">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    className="h-auto w-full object-contain mix-blend-multiply md:h-full"
                  />
                ) : (
                  <div className="grid aspect-square w-full place-items-center">
                    <Award className="h-12 w-12 text-forest" aria-hidden="true" />
                  </div>
                )}
              </div>
              <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink sm:text-lg md:flex md:min-h-14 md:items-center md:justify-center">
                {b.title}
              </h3>
              {b.referencePrice && (
                <p className="mt-0.5 text-sm font-semibold text-ink/55 line-through">
                  {b.referencePrice}
                </p>
              )}
              {b.includedAtNoExtraCost && (
                <span className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-cta px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-cta-foreground shadow-md">
                  HOJE GRÁTIS
                </span>
              )}
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
      <p className="mx-auto -mt-3 mb-8 max-w-xl text-center text-[15px] leading-relaxed text-muted-foreground sm:-mt-6">
        Prints reais de quem já está usando as dinâmicas nas aulas de capoeira.
      </p>
      <Carousel count={count} label="Depoimentos sobre as dinâmicas">
        {imgs.map((img, i) => (
          <div
            key={i}
            className="aspect-[9/20] w-[64vw] shrink-0 snap-center overflow-hidden rounded-lg border bg-card shadow-sm sm:w-[280px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
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
    <section className="bg-card px-5 py-10 sm:py-12">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-gold bg-forest text-gold">
          <div className="text-center leading-none">
            <ShieldCheck className="mx-auto h-6 w-6" />
            <span className="font-display text-2xl font-extrabold">{g.days}</span>
            <span className="block text-[10px] font-bold">DIAS</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-ink">VOCÊ TEM {g.days} DIAS DE GARANTIA</h2>
          <p className="mt-1 text-[15px] text-muted-foreground">{g.text}</p>
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
            <AccordionTrigger className="py-4 text-left text-[15px] font-bold text-ink">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="bg-forest px-5 py-16 text-center text-forest-foreground">
      <div className="mx-auto max-w-xl">
        <Target className="mx-auto mb-3 h-8 w-8 text-gold" />
        <h2 className="text-[1.65rem] font-extrabold leading-[1.1] sm:text-4xl">
          Tenha Mais Dinâmicas à Sua Disposição Para as{" "}
          <span className="text-gold">Próximas Aulas</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-forest-muted">
          Conheça o material e descubra como ele pode ajudar a organizar suas propostas de capoeira.
        </p>
        <div className="mt-7">
          <CtaButton>QUERO ACESSAR O MATERIAL</CtaButton>
        </div>
        {offer.purchaseInfo.length > 0 && (
          <p className="mt-4 text-xs text-forest-muted">{offer.purchaseInfo.join(" · ")}</p>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-5 py-8 text-center text-xs text-forest-muted">
      <p className="font-display text-sm font-bold text-gold">{offer.brand}</p>
      <p className="mt-1">
        © {new Date().getFullYear()} {offer.brand}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
