/**
 * CONFIGURAÇÃO CENTRAL DA OFERTA — União Capoeirista
 * Todos os dados comerciais ficam aqui. Campos com `null` estão PENDENTES
 * e as seções/botões correspondentes ficam ocultos ou desativados até serem preenchidos.
 */

export type Plan = {
  id: "basico" | "completo";
  name: string;
  /** Ex.: "R$ 19,90". null = pendente */
  price: string | null;
  /** Ex.: "R$ 47,00" (preço "de"). null = não exibir */
  oldPrice: string | null;
  priceNote: string | null;
  items: string[];
  /** Itens extras apenas do plano completo */
  extras?: string[];
  /** URL real do checkout. null = pendente (botão desativado) */
  checkoutUrl: string | null;
  ctaLabel: string;
  highlight?: boolean;
};

export type Bonus = {
  title: string;
  description: string;
  image?: string;
  referencePrice: string | null;
  includedAtNoExtraCost: boolean;
};
export type Testimonial = { name: string; role?: string; text?: string; image?: string };

export const offer = {
  brand: "União Capoeirista",

  plans: [
    {
      id: "basico",
      name: "Plano Básico",
      price: null,
      oldPrice: null,
      priceNote: "Pagamento único",
      items: ["+300 dinâmicas interativas de capoeira", "Acesso digital ao material"],
      checkoutUrl: null,
      ctaLabel: "ESCOLHER PLANO BÁSICO",
    },
    {
      id: "completo",
      name: "Plano Completo",
      price: null,
      oldPrice: null,
      priceNote: "Pagamento único",
      items: ["+300 dinâmicas interativas de capoeira", "Acesso digital ao material"],
      // Preencha somente com itens reais que o plano completo inclui a mais:
      extras: [],
      checkoutUrl: null,
      ctaLabel: "QUERO O PLANO COMPLETO",
      highlight: true,
    },
  ] satisfies Plan[],

  /** Bônus reais. referencePrice: preencha com o valor real; null = não exibir preço de referência. */
  bonuses: [
    {
      title: "Certificado de Capoeira Infantil",
      description:
        "Para professores, mestres e instrutores que utilizam certificados em atividades e eventos de capoeira infantil.",
      referencePrice: null,
      includedAtNoExtraCost: true,
    },
  ] as Bonus[],

  /** Depoimentos autênticos. Lista vazia = seção oculta. */
  testimonials: [] as Testimonial[],

  /** Garantia definida para a oferta. */
  guarantee: {
    days: 7,
    text: "Adquira seu material com tranquilidade. Você tem 7 dias de garantia para conhecer o conteúdo e avaliar se ele atende às suas necessidades.",
  } as null | { days: number; text: string },

  /** Informações reais exibidas abaixo do CTA final. Lista vazia = nada exibido. */
  purchaseInfo: ["Produto 100% digital"] as string[],

  /** Imagens reais de páginas do material (carrossel). Vazio = prévias de estrutura temporárias. */
  previewImages: [
    { src: "/ginga-espelho.webp", alt: "Ginga Espelho — dinâmica de capoeira" },
    { src: "/semaforo-da-ginga.webp", alt: "Semáforo da Ginga — dinâmica de capoeira" },
    { src: "/trilha-da-ginga.webp", alt: "Trilha da Ginga — dinâmica de capoeira" },
  ] as { src: string; alt: string }[],

  /** Depoimentos (prints) — o que estão dizendo sobre as dinâmicas. Vazio = seção oculta. */
  testimonialImages: [
    { src: "/depoimento-1.webp", alt: "Depoimento sobre as dinâmicas de capoeira" },
    { src: "/depoimento-2.webp", alt: "Depoimento sobre as dinâmicas de capoeira" },
    { src: "/depoimento-3.webp", alt: "Depoimento sobre as dinâmicas de capoeira" },
    { src: "/depoimento-4.webp", alt: "Depoimento sobre as dinâmicas de capoeira" },
  ] as { src: string; alt: string }[],

  faq: [
    {
      q: "Como receberei o material?",
      a: "Após a confirmação do pagamento, você recebe o acesso ao material digital. [Confirmar o canal de entrega: e-mail, WhatsApp ou área de membros.]",
    },
    {
      q: "O produto é digital?",
      a: "Sim. Não há envio físico; todo o conteúdo é acessado de forma digital.",
    },
    {
      q: "Em quais dispositivos posso acessar o conteúdo?",
      a: "Você pode consultar o material no celular, tablet ou computador.",
    },
    {
      q: "Para quem são indicadas as dinâmicas?",
      a: "Para professores, instrutores, mestres e profissionais que conduzem aulas e atividades de capoeira.",
    },
    {
      q: "Preciso de materiais específicos para aplicar as atividades?",
      a: "[Preencher conforme o conteúdo real das dinâmicas.]",
    },
    {
      q: "Qual é a diferença entre o plano básico e o plano completo?",
      a: "[Preencher com os itens reais incluídos em cada plano.]",
    },
    {
      q: "Como funciona a garantia?",
      a: "[Preencher com a política de garantia definida antes da publicação.]",
    },
  ],
};

/** Plano usado nos CTAs gerais (hero / chamada final): rola até os planos. */
export const PLANS_ANCHOR = "planos";
