/**
 * Script de boot da revelação ao rolar.
 *
 * Roda no <head>, antes do primeiro paint: só aí o CSS passa a esconder os
 * elementos `[data-reveal]` até entrarem na tela. Se o JavaScript estiver
 * desativado, a classe nunca é adicionada e nada fica invisível. Também respeita
 * quem prefere menos movimento no sistema.
 */
export const revealReadyScript = `
(function () {
  try {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("reveal-ready");
  } catch (e) {}
})();
`.trim();
