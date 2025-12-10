import fs from 'node:fs/promises';
import path from 'node:path';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  return new Response(JSON.stringify({
    error: "Method not allowed. Use POST for authentication."
  }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, password } = body;
    const configPath = path.join(process.cwd(), "src/data/admin-config.json");
    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData);
    if (username === config.username && password === config.password) {
      return new Response(JSON.stringify({
        success: true,
        message: "Authentication successful"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid credentials"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "Authentication failed"
    }), {
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
