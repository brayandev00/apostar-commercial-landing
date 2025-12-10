import 'piccolore';
import { n as decodeKey } from './chunks/astro/server_wjtMjTeD.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Bw0okMfE.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/","cacheDir":"file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/node_modules/.astro/","outDir":"file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/dist/","srcDir":"file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/src/","publicDir":"file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/public/","buildClientDir":"file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/dist/client/","buildServerDir":"file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/configuracion/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/configuracion","isIndex":false,"type":"page","pattern":"^\\/admin\\/configuracion\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"configuracion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/configuracion.astro","pathname":"/admin/configuracion","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth.ts","pathname":"/api/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/estadisticas","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/estadisticas\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"estadisticas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/estadisticas.ts","pathname":"/api/estadisticas","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/juegos","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/juegos\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"juegos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/juegos.ts","pathname":"/api/juegos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/noticias","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/noticias\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"noticias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/noticias.ts","pathname":"/api/noticias","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/productos","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/productos\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"productos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/productos.ts","pathname":"/api/productos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sorteos","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sorteos\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sorteos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sorteos.ts","pathname":"/api/sorteos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sorteos-destacados","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sorteos-destacados\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sorteos-destacados","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sorteos-destacados.ts","pathname":"/api/sorteos-destacados","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/src/pages/admin/configuracion.astro",{"propagation":"none","containsHead":true}],["C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/admin/configuracion@_@astro":"pages/admin/configuracion.astro.mjs","\u0000@astro-page:src/pages/api/auth@_@ts":"pages/api/auth.astro.mjs","\u0000@astro-page:src/pages/api/estadisticas@_@ts":"pages/api/estadisticas.astro.mjs","\u0000@astro-page:src/pages/api/juegos@_@ts":"pages/api/juegos.astro.mjs","\u0000@astro-page:src/pages/api/noticias@_@ts":"pages/api/noticias.astro.mjs","\u0000@astro-page:src/pages/api/productos@_@ts":"pages/api/productos.astro.mjs","\u0000@astro-page:src/pages/api/sorteos@_@ts":"pages/api/sorteos.astro.mjs","\u0000@astro-page:src/pages/api/sorteos-destacados@_@ts":"pages/api/sorteos-destacados.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CuEenxy7.mjs","C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_D2vQzYve.mjs","@/components/encabezado":"_astro/encabezado.Dh9oeWkq.js","@/components/seccionHero":"_astro/seccionHero.P0WcwCd4.js","@/components/seccionEstadisticas":"_astro/seccionEstadisticas.Ew6-m03g.js","@/components/seccionBeneficios":"_astro/seccionBeneficios.CrkqPatS.js","@/components/seccionJuegos":"_astro/seccionJuegos.T9259Oi4.js","@/components/seccionProductos":"_astro/seccionProductos.CsWi8onJ.js","@/components/seccionDomicilios":"_astro/seccionDomicilios.CZeIAYgF.js","@/components/carruselSorteosDestacados":"_astro/carruselSorteosDestacados.DW_hKB6t.js","@/components/seccionSorteos":"_astro/seccionSorteos.D-KuYagz.js","@/components/seccionNoticias":"_astro/seccionNoticias.DlI7H6JA.js","@/components/seccionContacto":"_astro/seccionContacto.B3BuUYLw.js","@/components/pieDePagina":"_astro/pieDePagina.BIDq_o8K.js","@/components/admin/comerAdminDashboard":"_astro/comerAdminDashboard.BKWchFLu.js","@astrojs/react/client.js":"_astro/client.BMLm8bxW.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/configuracion.vNluXBNw.css","/_astro/badge.BrHX-xry.js","/_astro/button.CUDpEhTg.js","/_astro/calendar.U0wzpopL.js","/_astro/card.vKWluQ9u.js","/_astro/carruselSorteosDestacados.DW_hKB6t.js","/_astro/chevron-right.BUkA5mzH.js","/_astro/circle-check.s7deILGF.js","/_astro/client.BMLm8bxW.js","/_astro/clock.DzxfqaVr.js","/_astro/comerAdminDashboard.BKWchFLu.js","/_astro/createLucideIcon.BpKCcK5f.js","/_astro/dialog.V7vL-G61.js","/_astro/dollar-sign.DIKvVfXy.js","/_astro/embla-carousel-react.esm.B5JtcWlE.js","/_astro/encabezado.Dh9oeWkq.js","/_astro/gift.CNIzA8iH.js","/_astro/index.CPmIgwol.js","/_astro/index.DhY--VwN.js","/_astro/instagram.BtOdEAgk.js","/_astro/phone.DbRZas5E.js","/_astro/pieDePagina.BIDq_o8K.js","/_astro/seccionBeneficios.CrkqPatS.js","/_astro/seccionContacto.B3BuUYLw.js","/_astro/seccionDomicilios.CZeIAYgF.js","/_astro/seccionEstadisticas.Ew6-m03g.js","/_astro/seccionHero.P0WcwCd4.js","/_astro/seccionJuegos.T9259Oi4.js","/_astro/seccionNoticias.DlI7H6JA.js","/_astro/seccionProductos.CsWi8onJ.js","/_astro/seccionSorteos.D-KuYagz.js","/_astro/sparkles.BckTNl_B.js","/_astro/star.Cc0f5zvE.js","/_astro/trending-up.DKgkL5RY.js","/_astro/trophy.B4j-ApPK.js","/_astro/user.CfCgY5y1.js","/_astro/users.DQ5vPsOa.js","/_astro/utils.XzIJMjSM.js","/_astro/x.BbJBw2S7.js","/_astro/zap.B43FYATI.js","/images/AposOnline.png","/images/DomicilioApos.png","/images/LogoApos.png","/images/LogoAposSecundario.png","/admin/configuracion/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"PV5NW6/viVkEbh0zvVU7oWBlrWERd7ZTUcqdpwMFvRo=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\practicante6.analiti\\Downloads\\apostar-commercial-landing\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
