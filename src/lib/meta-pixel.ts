/**
 * Pixel da Meta.
 *
 * Só o ID público fica no navegador — o token da API de Conversões nunca é
 * exposto no código do cliente. Eventos de compra (`Purchase`) e de início de
 * checkout são rastreados pela integração do checkout / API de Conversões, não
 * por este código.
 */
export const META_PIXEL_ID = "1103498362282038";

/**
 * Código base oficial do Meta Pixel com `PageView` no carregamento.
 *
 * Travas contra duplicidade:
 * - `window.__metaPixelReady` garante que o bloco inteiro rode uma única vez
 *   por carregamento de página (mesmo se o snippet for injetado de novo);
 * - o trecho oficial (`if (f.fbq) return`) reaproveita a fila existente em vez
 *   de recriá-la, caso outra integração já tenha carregado o `fbevents.js`.
 *
 * Por isso `init` e `PageView` disparam exatamente uma vez por page load.
 *
 * `fbq.disablePushState = true` desliga o PageView automático que o
 * `fbevents.js` dispara em cada mudança de histórico (pushState/replaceState/
 * popstate). Sem isso, clicar em âncoras como "#planos" contaria um PageView
 * extra — e o requisito é contar só a entrada na página.
 */
export const metaPixelScript = `
(function () {
  var id = "${META_PIXEL_ID}";
  if (window.__metaPixelReady) return;
  window.__metaPixelReady = true;
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq.disablePushState = true;
  window.fbq("init", id);
  window.fbq("track", "PageView");
})();
`.trim();

/** Fallback para navegadores sem JavaScript (mesma contagem de `PageView`). */
export const metaPixelNoScript = `
<img height="1" width="1" style="display:none" alt=""
src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&amp;ev=PageView&amp;noscript=1" />
`.trim();
