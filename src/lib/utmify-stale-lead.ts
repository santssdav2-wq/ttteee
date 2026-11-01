/**
 * Limpa o `lead` antigo da UTMify quando ele pertence a outro pixel.
 *
 * O pixel.js da UTMify guarda em `localStorage.lead` o lead do visitante — e
 * esse objeto carrega o `pixelId` usado na primeira visita:
 *
 *   getLeadFromLocalStorageOrNew() { return AppStorage.load("lead") || new Lead(...) }
 *
 * Ele *nunca* compara esse `pixelId` salvo com o `window.pixelId` atual. Se o
 * pixel do site for trocado, todo visitante que já tinha visitado antes segue
 * enviando eventos com o pixel antigo: a UTMify responde `PIXEL_NOT_FOUND`,
 * nenhum evento chega ao Meta e nada aparece no Pixel Helper — enquanto uma
 * aba anônima (sem `localStorage`) funciona normalmente.
 *
 * Este script roda logo depois do snippet da UTMify (que define `window.pixelId`
 * de forma síncrona) e descarta o lead quando o pixel é outro. O visitante
 * continua com a atribuição intacta: `_fbc`, `_fbp`, `gclid` etc. são relidos
 * dos cookies e da URL a cada evento, e um novo lead é criado na hora.
 */
export const utmifyStaleLeadScript = `
(function () {
  try {
    var raw = localStorage.getItem("lead");
    if (!raw) return;
    var current = window.pixelId;
    if (!current) return;
    var lead = JSON.parse(raw);
    if (lead && lead.pixelId && lead.pixelId !== current) {
      localStorage.removeItem("lead");
    }
  } catch (e) {}
})();
`.trim();
