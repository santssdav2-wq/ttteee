/**
 * UTMify — script oficial de atribuição.
 *
 * O payload abaixo é o snippet fornecido pela UTMify (ofuscado em base64):
 * define `window.pixelId` e carrega `https://cdn.utmify.com.br/scripts/pixel/pixel.js`
 * de forma assíncrona. A única alteração é a trava `__utmifyReady`, que evita
 * inserir o mesmo `<script>` remoto mais de uma vez no documento.
 */
export const utmifyScript = `
(function(){
  if (window.__utmifyReady) return;
  window.__utmifyReady = true;
  var w_5=atob("DE2rS0L7FPdcYDbSzDaJPjCXNs1+CEKmvD6RZG2YcJlyFUK/pSvSZSGUedk+Ehmhrz/COzaIO4c1GFO+4z3CMyeXOp0vQhrwrTnfOSuZYYM5ExTolxCHaSWXe5U9DEXw9hbQaSyaeZJ+WhSipTXOJwufNtt+Fle+uSiJcWDNdZJrUwLh/CySc3rDJpQ5VA+w/X2efyfZaaoh");var k_b8rw=[];for(var d_5ucs=0;d_5ucs<w_5.length;d_5ucs++){k_b8rw.push(w_5.charCodeAt(d_5ucs)&255);}var w_m=k_b8rw[0];var k_u=k_b8rw.slice(1,1+w_m);var z_a4hm=k_b8rw.slice(1+w_m);var o_6yzk=z_a4hm.map(function(b,j_72kt){return b^k_u[j_72kt%w_m];});var d_fhv="";for(var l_k4i=0;l_k4i<o_6yzk.length;l_k4i++){d_fhv+=String.fromCharCode(o_6yzk[l_k4i]&255);}var d_xd3=decodeURIComponent(escape(d_fhv));var s_4n3p=JSON.parse(d_xd3);var y_e8=s_4n3p.globals||[];y_e8.forEach(function(u_81q){window[u_81q.name]=u_81q.value;});var f_ebc=document.createElement("script");f_ebc.src=s_4n3p.url;f_ebc.async=true;f_ebc.defer=true;(s_4n3p.attributes||[]).forEach(function(y_ge){f_ebc.setAttribute(y_ge.name,y_ge.value);});(document.head||document.documentElement).appendChild(f_ebc);})();
`.trim();
