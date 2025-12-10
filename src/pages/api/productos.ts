import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async ({ request }) => {
    try {
        const dataPath = path.join(process.cwd(), 'src/data/productos.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        return new Response(data, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to load productos' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const dataPath = path.join(process.cwd(), 'src/data/productos.json');
        await fs.writeFile(dataPath, JSON.stringify(body, null, 2), 'utf-8');
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to save productos' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
