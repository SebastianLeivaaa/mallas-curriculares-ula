import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/data/curricula/computerScienceEngineering.json');
        const file = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
    }
}