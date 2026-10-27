import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ClipboardList, Target, Smartphone, Layers, Users, GraduationCap, Building2, Baby, Check, ShieldCheck, Gift, Award } from "lucide-react";
import { offer } from "@/config/offer";
import { Section, SectionTitle, CtaButton, CheckoutButton, Carousel, MaterialPage } from "@/components/sales/parts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "+300 Dinâmicas Interativas de Capoeira | União Capoeirista" },
      { name: "description", content: "Material digital com +300 dinâmicas interativas de capoeira prontas para aplicar nas aulas. Para professores e instrutores." },
      { property: "og:title", content: "+300 Dinâmicas Interativas de Capoeira | União Capoeirista" },
      { property: "og:description", content: "Repertório organizado de dinâmicas para quem ensina capoeira." },
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
  return (
    <section className="relative bg-background px-5 pb-14 pt-8 sm:pt-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-4 font-display text-sm font-bold tracking-wide text-primary">{offer.brand}</span>
        <h1 className="isolate font-display font-extrabold leading-[1.02] tracking-tight text-ink">
          <span className="block text-[1.55rem] sm:text-[2.6rem]">
            <span className="text-[2.6rem] text-cta sm:text-[4.2rem]">+300</span> Dinâmicas Interativas de
          </span>
          <span className="relative mx-auto mt-1 block w-fit text-[3.1rem] text-primary sm:text-[5.2rem]">
            Capoeira
            <span aria-hidden className="absolute -bottom-0.5 left-1 right-1 h-2.5 -z-0 rounded-sm bg-gold/70 sm:h-4" style={{ zIndex: -1 }} />
          </span>
          <span className="mt-2 block text-[1.45rem] sm:text-[2.4rem]">
            Prontas para{" "}
            <span className="mt-1 inline-block whitespace-nowrap rounded bg-forest px-2 pb-0.5 text-gold">Aplicar nas Aulas!</span>
          </span>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Tenha mais opções de dinâmicas e atividades para variar suas aulas de capoeira e facilitar a preparação das suas próximas propostas.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-md border border-gold/60 bg-gold/15 px-3 py-2 text-xs font-bold text-primary">
          <Gift className="h-4 w-4" aria-hidden="true" /> Inclui bônus exclusivos
        </span>
        <PhoneMockup />
        <div className="w-full">
          <CtaButton>QUERO MINHAS DINÂMICAS AGORA</CtaButton>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const real = offer.previewImages[0];
  return (
    <div className="relative my-8 flex w-full justify-center">
      <div aria-hidden className="absolute top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-gold/30 blur-3xl sm:h-72 sm:w-72" />
      <div className="relative w-[180px] rotate-[-3deg] rounded-[2rem] bg-ink p-2 shadow-2xl sm:w-[240px]">
        <div className="mx-auto mb-1.5 h-1.5 w-14 rounded-full bg-forest-muted/40" />
        <div className="aspect-[9/17] overflow-hidden rounded-[1.4rem]">
          {real ? <img src={real.src} alt={real.alt} className="h-full w-full object-cover" /> : <MaterialPage n={1} />}
        </div>
      </div>
      <div className="absolute bottom-3 right-[8%] hidden w-28 rotate-[6deg] overflow-hidden rounded-md border shadow-xl min-[380px]:block sm:right-[22%] sm:w-36">
        <div className="aspect-[3/4]"><MaterialPage n={2} compact /></div>
      </div>
    </div>
  );
}

const receiveItems = [
  { icon: Layers, title: "+300 dinâmicas", text: "Dinâmicas interativas de capoeira em um só material." },
  { icon: BookOpen, title: "Organizadas", text: "Atividades organizadas para facilitar a consulta." },
  { icon: ClipboardList, title: "Como aplicar", text: "Orientações de aplicação das propostas." },
  { icon: Smartphone, title: "Acesso digital", text: "Consulte no celular, tablet ou computador." },
];

function Receive() {
  return (
    <Section className="bg-card">
      <SectionTitle eyebrow="O material">O Que Você Vai Receber?</SectionTitle>
      <ul className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        {receiveItems.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4 rounded-lg border bg-background p-4 sm:p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-forest text-gold"><Icon className="h-5 w-5" /></span>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
              <p className="text-[15px] text-muted-foreground">{text}</p>
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
      <SectionTitle eyebrow="Por dentro">Conheça Algumas das Dinâmicas</SectionTitle>
      <Carousel count={count} label="Prévias do material">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="aspect-[3/4] w-[76vw] shrink-0 snap-center overflow-hidden rounded-lg border bg-card shadow-sm sm:w-[400px]">
            {imgs[i] ? <img src={imgs[i].src} alt={imgs[i].alt} loading="lazy" className="h-full w-full object-cover" /> : <MaterialPage n={i + 1} />}
          </div>
        ))}
      </Carousel>
      {!imgs.length && <p className="mt-4 text-center text-xs text-muted-foreground">Prévias ilustrativas da estrutura das páginas.</p>}
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
      <SectionTitle eyebrow="Para quem é">Feito Para Quem Ensina Capoeira</SectionTitle>
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

function Plans() {
  return (
    <Section id="planos" className="bg-muted">
      <SectionTitle eyebrow="Escolha seu plano">Invista no Repertório das Suas Aulas</SectionTitle>
      <div className="mx-auto grid max-w-3xl items-start gap-6 md:grid-cols-2">
        {offer.plans.map((p) => (
          <article key={p.id} className={`relative rounded-xl bg-card p-6 ${p.highlight ? "border-2 border-cta shadow-xl md:-mt-4" : "border"}`}>
            {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink">Mais completo</span>}
            <h3 className="font-display text-2xl font-extrabold text-ink">{p.name}</h3>
            <div className="mt-3">
              {p.oldPrice && <p className="text-sm text-muted-foreground line-through">De {p.oldPrice}</p>}
              <p className="font-display text-4xl font-extrabold text-primary">{p.price ?? <span className="text-xl text-muted-foreground">Preço a definir</span>}</p>
              {p.priceNote && <p className="text-xs text-muted-foreground">{p.priceNote}</p>}
            </div>
            <ul className="my-5 space-y-2.5">
              {[...p.items, ...(p.extras ?? [])].map((it) => (
                <li key={it} className="flex gap-2 text-[15px] text-ink"><Check className="mt-0.5 h-5 w-5 shrink-0 text-cta" />{it}</li>
              ))}
            </ul>
            <CheckoutButton plan={p} />
          </article>
        ))}
      </div>
    </Section>
  );
}

function Bonuses() {
  if (!offer.bonuses.length) return null;
  return (
    <Section className="bg-forest">
      <SectionTitle light>E NÃO PARA POR AÍ!</SectionTitle>
      <p className="mx-auto -mt-3 mb-8 max-w-xl text-center text-[15px] leading-relaxed text-forest-muted sm:-mt-6">Além das dinâmicas, você também recebe bônus exclusivos para complementar suas aulas.</p>
      <ul className={`mx-auto grid gap-6 ${offer.bonuses.length === 1 ? "max-w-2xl" : "sm:grid-cols-2"}`}>
        {offer.bonuses.map((b) => (
          <li key={b.title} className="flex flex-col items-start gap-5 rounded-lg border border-gold/40 bg-card p-6 text-ink sm:flex-row sm:p-8">
            {b.image ? <img src={b.image} alt={b.title} loading="lazy" className="w-full rounded-md object-contain sm:w-44" /> : <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-forest text-gold"><Award className="h-9 w-9" aria-hidden="true" /></span>}
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{b.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{b.description}</p>
              {b.referencePrice && <p className="mt-4 text-sm text-muted-foreground line-through">Valor de referência: {b.referencePrice}</p>}
              {b.includedAtNoExtraCost && <><p className="mt-4 inline-block rounded-md bg-gold px-3 py-2 text-sm font-extrabold text-ink">HOJE, GRÁTIS!</p><p className="mt-2 text-sm font-semibold text-primary">Incluído na oferta, sem cobrança adicional.</p></>}
            </div>
          </li>
        ))}
      </ul>
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
          <div className="text-center leading-none"><ShieldCheck className="mx-auto h-6 w-6" /><span className="font-display text-2xl font-extrabold">{g.days}</span><span className="block text-[10px] font-bold">DIAS</span></div>
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
      <SectionTitle eyebrow="Dúvidas">Perguntas Frequentes</SectionTitle>
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        {offer.faq.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="py-4 text-left text-[15px] font-bold text-ink">{f.q}</AccordionTrigger>
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
          Tenha Mais Dinâmicas à Sua Disposição Para as <span className="text-gold">Próximas Aulas</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-forest-muted">Conheça o material e descubra como ele pode ajudar a organizar suas propostas de capoeira.</p>
        <div className="mt-7"><CtaButton>QUERO ACESSAR O MATERIAL</CtaButton></div>
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
      <p className="mt-1">© {new Date().getFullYear()} {offer.brand}. Todos os direitos reservados.</p>
    </footer>
  );
}
