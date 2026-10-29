/**
 * Trava do PageView automático em mudanças de histórico.
 *
 * O `fbevents.js` dispara `PageView` em `pushState`/`replaceState`/`popstate`
 * (navegação SPA). Como os CTAs da página são âncoras (`#planos`), cada clique
 * contava uma visita extra, e voltar/avançar também.
 *
 * `fbq.disablePushState = true` é o interruptor do próprio fbevents para
 * desligar esse comportamento — o `PageView` de entrada (enviado pela UTMify)
 * continua normal.
 *
 * O `fbq` é criado pelo script remoto da UTMify de forma assíncrona, então este
 * guard instala um setter em `window.fbq`: assim que a UTMify define o `fbq`,
 * a flag já entra no mesmo instante, antes do `fbevents.js` carregar.
 * Nenhum arquivo/evento da UTMify é alterado.
 */
export const fbqHistoryGuardScript = `
(function () {
  var w = window;
  if (w.__fbqHistoryGuard) return;
  w.__fbqHistoryGuard = true;
  var current = w.fbq;
  function apply(fn) {
    try {
      if (fn) fn.disablePushState = true;
    } catch (e) {}
  }
  apply(current);
  try {
    Object.defineProperty(w, "fbq", {
      configurable: true,
      enumerable: true,
      get: function () {
        return current;
      },
      set: function (value) {
        current = value;
        apply(value);
      },
    });
  } catch (e) {}
})();
`.trim();
