import fs from 'node:fs/promises';
import path from 'node:path';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const dataPath = path.join(process.cwd(), "src/data/sorteos-destacados.json");
    const data = await fs.readFile(dataPath, "utf-8");
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to load sorteos destacados" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const dataPath = path.join(process.cwd(), "src/data/sorteos-destacados.json");
    await fs.writeFile(dataPath, JSON.stringify(body, null, 2), "utf-8");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save sorteos destacados" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
