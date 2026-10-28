import { describe, expect, it } from "vitest";
import { offer, PLANS_ANCHOR } from "../config/offer";

describe("preserved offer and approved additions", () => {
  it("provides a seven-day guarantee", () => {
    expect(offer.guarantee?.days).toBe(7);
  });

  it("includes only the children's capoeira certificate at no extra cost", () => {
    expect(offer.bonuses).toHaveLength(1);
    expect(offer.bonuses[0]?.title).toBe("Certificado de Capoeira Infantil");
    expect(offer.bonuses[0]?.includedAtNoExtraCost).toBe(true);
  });

  it("leaves the undefined certificate reference price unset", () => {
    expect(offer.bonuses[0]?.referencePrice).toBeNull();
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
