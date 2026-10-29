/**
 * CONFIGURAÇÃO CENTRAL DA OFERTA — União Capoeirista
 * Todos os dados comerciais ficam aqui. Campos com `null` estão PENDENTES
 * e as seções/botões correspondentes ficam ocultos ou desativados até serem preenchidos.
 */

export type PlanItem = {
  /** Texto curto, de uma linha, exibido na lista do plano. */
  label: string;
  /** Item de bônus: aparece com o ícone de presente. */
  gift?: boolean;
};

export type Plan = {
  id: "basico" | "completo";
  name: string;
  /** Ex.: "R$ 19,90". null = pendente */
  price: string | null;
  /** Ex.: "R$ 47,00" (preço "de"). null = não exibir */
  oldPrice: string | null;
  priceNote: string | null;
  items: PlanItem[];
  /** URL real do checkout. null = pendente (botão desativado) */
  checkoutUrl: string | null;
  ctaLabel: string;
  highlight?: boolean;
};

/** Oferta de upgrade mostrada em popup quando o visitante escolhe o Plano Básico. */
export type UpgradeOffer = {
  badge: string;
  /** Ex.: "R$ 17,90" */
  price: string;
  priceNote: string;
  items: string[];
  ctaLabel: string;
  dismissLabel: string;
  /** URL real do checkout desta oferta. null = pendente (botão desativado) */
  checkoutUrl: string | null;
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
      price: "R$ 10,00",
      oldPrice: null,
      priceNote: "Pagamento único",
      items: [
        { label: "+300 dinâmicas interativas de capoeira" },
        { label: "Material digital para consulta" },
        { label: "Propostas prontas para as aulas" },
      ],
      checkoutUrl: "https://pay.cakto.com.br/jvzcvhq_1256599",
      ctaLabel: "QUERO O PLANO BÁSICO",
    },
    {
      id: "completo",
      name: "Plano Completo",
      price: "R$ 27,90",
      oldPrice: null,
      priceNote: "Pagamento único",
      items: [
        { label: "+300 dinâmicas interativas de capoeira" },
        { label: "Material digital para consulta" },
        { label: "Propostas prontas para as aulas" },
        { label: "Acesso vitalício" },
        { label: "Atualizações mensais" },
        { label: "Suporte prioritário" },
        { label: "Garantia de 7 dias" },
        { label: "Certificado de Capoeira Infantil", gift: true },
        { label: "Planejamento de Aula", gift: true },
        { label: "Ficha de Acompanhamento dos Alunos", gift: true },
      ],
      checkoutUrl: "https://pay.cakto.com.br/36egbwo",
      ctaLabel: "QUERO O PACOTE COMPLETO",
      highlight: true,
    },
  ] satisfies Plan[],

  /** Popup exibido ao clicar no Plano Básico: oferece a versão completa com os bônus. */
  upgrade: {
    title: "Espere! Temos uma opção melhor para você 👀",
    subtitle: "Leve a versão completa do União Capoeirista com todos os bônus incluídos.",
    badge: "VERSÃO COMPLETA + BÔNUS",
    price: "R$ 17,90",
    priceNote: "Apenas R$ 7,90 a mais que o básico",
    items: [
      "+300 dinâmicas interativas de capoeira",
      "Certificado de participação",
      "Ficha de planejamento de aula",
      "Ficha de acompanhamento dos alunos",
    ],
    ctaLabel: "QUERO A VERSÃO COMPLETA",
    dismissLabel: "Não, vou continuar com o plano básico",
    checkoutUrl: "https://pay.cakto.com.br/dc5aynu",
  } satisfies UpgradeOffer,

  /** Bônus reais. referencePrice: preencha com o valor real; null = não exibir preço de referência. */
  bonuses: [
    {
      title: "Certificado de Capoeira Infantil",
      description: "Um certificado para reconhecer a participação das crianças.",
      image: "/certificado.webp",
      referencePrice: "R$ 37,00",
      includedAtNoExtraCost: true,
    },
    {
      title: "Ficha de Acompanhamento dos Alunos",
      description: "Acompanhe a evolução e registre as conquistas da turma.",
      image: "/acompanhamento-alunos.webp",
      referencePrice: "R$ 27,90",
      includedAtNoExtraCost: true,
    },
    {
      title: "Ficha de Planejamento de Aula",
      description: "Organize os objetivos, as atividades e os materiais de cada aula.",
      image: "/planejamento-aula.webp",
      referencePrice: "R$ 49,90",
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
      a: "Após a confirmação do pagamento, você recebe o acesso ao material digital por WhatsApp e por e-mail.",
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
      a: "Não. As dinâmicas foram pensadas para a rotina da aula e podem ser aplicadas com o que você já tem no espaço onde ensina, sem necessidade de equipamentos especiais.",
    },
    {
      q: "Como funciona a garantia?",
      a: "Você tem 7 dias de garantia após a compra. Se o material não fizer sentido para as suas aulas, basta pedir o reembolso dentro desse prazo e devolvemos o valor integral.",
    },
  ],
};

/** Plano usado nos CTAs gerais (hero / chamada final): rola até os planos. */
export const PLANS_ANCHOR = "planos";
