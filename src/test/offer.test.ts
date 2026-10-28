import { describe, expect, it } from "vitest";
import { offer, PLANS_ANCHOR } from "../config/offer";

describe("preserved offer and approved additions", () => {
  it("provides a seven-day guarantee", () => {
    expect(offer.guarantee?.days).toBe(7);
  });

  it("includes the three bonuses at no extra cost", () => {
    expect(offer.bonuses).toHaveLength(3);
    expect(offer.bonuses[0]?.title).toBe("Certificado de Capoeira");
    expect(offer.bonuses[0]?.includedAtNoExtraCost).toBe(true);
    expect(offer.bonuses[0]?.referencePrice).toBe("R$ 37,00");
    expect(offer.bonuses[1]?.title).toBe("Acompanhamento de Alunos");
    expect(offer.bonuses[1]?.includedAtNoExtraCost).toBe(true);
    expect(offer.bonuses[1]?.referencePrice).toBe("R$ 27,90");
    expect(offer.bonuses[2]?.title).toBe("Planejamento de Aula");
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
      { id: "basico", price: null, oldPrice: null, checkoutUrl: null },
      { id: "completo", price: null, oldPrice: null, checkoutUrl: null },
    ]);
    expect(PLANS_ANCHOR).toBe("planos");
  });
});
