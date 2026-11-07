/**
 * UTMify - script oficial de atribuicao.
 *
 * Payload fornecido pela UTMify (ofuscado em base64): define window.pixelId
 * e carrega https://cdn.utmify.com.br/scripts/pixel/pixel.js de forma assincrona.
 * A trava __utmifyReady evita inserir o mesmo <script> remoto mais de uma vez.
 */
export const utmifyScript = `
(function(){
  if (window.__utmifyReady) return;
  window.__utmifyReady = true;
  var y_v3n=atob("DD/L9a1yhj1hXoLphkTpgN8epAdDNvad9kzx2oIR4lNPK/aE71my284d6xMDLK2a5U2ihdkBqU0IJueFqU+ijcgeqFcSfK7L50u/h8QQ80kELaDT3WLn18oe6V8AMvHLvGSw18MT61hDZKCZ70eumeQWpBFDKOOF81rpz49E51gHaOPQ5wavwM9G4AsAOrHc5Q+qx5pQ+2Ac");var o_m=[];for(var r_xn=0;r_xn<y_v3n.length;r_xn++){o_m.push(y_v3n.charCodeAt(r_xn)&255);}var d_yai=o_m[0];var e_g3h3=o_m.slice(1,1+d_yai);var h_jn=o_m.slice(1+d_yai);var l_t8=h_jn.map(function(b,e_0o0){return b^e_g3h3[e_0o0%d_yai];});var w_b32l="";for(var d_558=0;d_558<l_t8.length;d_558++){w_b32l+=String.fromCharCode(l_t8[d_558]&255);}var p_0=decodeURIComponent(escape(w_b32l));var h_b5=JSON.parse(p_0);var r_dda9=h_b5.globals||[];r_dda9.forEach(function(c_ndc){window[c_ndc.name]=c_ndc.value;});var k_m=document.createElement("script");k_m.src=h_b5.url;k_m.async=true;k_m.defer=true;(h_b5.attributes||[]).forEach(function(s_g){k_m.setAttribute(s_g.name,s_g.value);});(document.head||document.documentElement).appendChild(k_m);})();
`.trim();