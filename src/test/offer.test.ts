import { describe, expect, it } from "vitest";
import { offer, PLANS_ANCHOR } from "../config/offer";

describe("preserved offer and approved additions", () => {
  it("provides a seven-day guarantee", () => {
    expect(offer.guarantee?.days).toBe(7);
  });

  it("includes the three bonuses at no extra cost", () => {
    expect(offer.bonuses).toHaveLength(3);
    expect(offer.bonuses[0]?.title).toBe("Certificado de Capoeira Infantil");
    expect(offer.bonuses[0]?.includedAtNoExtraCost).toBe(true);
    expect(offer.bonuses[0]?.referencePrice).toBe("R$ 37,00");
    expect(offer.bonuses[1]?.title).toBe("Ficha de Acompanhamento dos Alunos");
    expect(offer.bonuses[1]?.includedAtNoExtraCost).toBe(true);
    expect(offer.bonuses[1]?.referencePrice).toBe("R$ 27,90");
    expect(offer.bonuses[2]?.title).toBe("Ficha de Planejamento de Aula");
    expect(offer.bonuses[2]?.includedAtNoExtraCost).toBe(true);
    expect(offer.bonuses[2]?.referencePrice).toBe("R$ 49,90");
  });

  it("preserves both plans and their pending commercial settings", () => {
    expect(
      offer.plans.map(({ id, price, oldPrice, checkoutUrl }) => ({
        id,
        price,
        oldPrice,
        checkoutUrl,
      })),
    ).toEqual([
      {
        id: "basico",
        price: "R$ 10,00",
        oldPrice: null,
        checkoutUrl: "https://pay.hotmart.com/L102785831V?checkoutMode=10&off=pewf2eow",
      },
      {
        id: "completo",
        price: "R$ 27,90",
        oldPrice: null,
        checkoutUrl: "https://pay.hotmart.com/L102785831V?checkoutMode=10&off=uo8kf2kb",
      },
    ]);
    expect(PLANS_ANCHOR).toBe("planos");
  });
});
