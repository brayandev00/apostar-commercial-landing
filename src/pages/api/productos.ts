import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const dataPath = path.join(process.cwd(), 'src/data/productos.json');

export const GET: APIRoute = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return new Response(data, {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error reading data' }), { status: 500 });
    }
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Validation could go here

        await fs.writeFile(dataPath, JSON.stringify(body, null, 2), 'utf-8');

        return new Response(JSON.stringify({ success: true, message: "Productos actualizados" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error writing data' }), { status: 500 });
    }
}
