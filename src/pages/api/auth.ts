import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

const configPath = path.join(process.cwd(), 'src/data/admin-config.json');

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { username, password } = body;

        const configData = await fs.readFile(configPath, 'utf-8');
        const config = JSON.parse(configData);

        if (username === config.username && password === config.password) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: false, message: 'Credenciales inválidas' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Auth error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Error de servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export const PUT: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { currentPassword, newPassword } = body;

        const configData = await fs.readFile(configPath, 'utf-8');
        const config = JSON.parse(configData);

        if (currentPassword !== config.password) {
            return new Response(JSON.stringify({ success: false, message: 'Contraseña actual incorrecta' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        config.password = newPassword;
        await fs.writeFile(configPath, JSON.stringify(config, null, 2));

        return new Response(JSON.stringify({ success: true, message: 'Contraseña actualizada' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Password update error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Error al actualizar contraseña' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
