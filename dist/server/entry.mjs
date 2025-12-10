import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_2Yfb229m.mjs';
import { manifest } from './manifest_CuEenxy7.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/configuracion.astro.mjs');
const _page2 = () => import('./pages/api/auth.astro.mjs');
const _page3 = () => import('./pages/api/estadisticas.astro.mjs');
const _page4 = () => import('./pages/api/juegos.astro.mjs');
const _page5 = () => import('./pages/api/noticias.astro.mjs');
const _page6 = () => import('./pages/api/productos.astro.mjs');
const _page7 = () => import('./pages/api/sorteos.astro.mjs');
const _page8 = () => import('./pages/api/sorteos-destacados.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/configuracion.astro", _page1],
    ["src/pages/api/auth.ts", _page2],
    ["src/pages/api/estadisticas.ts", _page3],
    ["src/pages/api/juegos.ts", _page4],
    ["src/pages/api/noticias.ts", _page5],
    ["src/pages/api/productos.ts", _page6],
    ["src/pages/api/sorteos.ts", _page7],
    ["src/pages/api/sorteos-destacados.ts", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/dist/client/",
    "server": "file:///C:/Users/practicante6.analiti/Downloads/apostar-commercial-landing/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
