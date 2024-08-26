import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const career = url.searchParams.get('career');

        if (!career) {
            return NextResponse.json({ error: 'El parámetro "career" es requerido' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), `src/data/curricula/${career}.json`);
        const file = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
    }
}
