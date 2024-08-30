import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const career = url.searchParams.get('career');
        const year = url.searchParams.get('year');

        if (!career) {
            return NextResponse.json({ error: 'El parámetro "career" es requerido' }, { status: 400 });
        }

        const basePath = path.join(process.cwd(), `src/data/curricula/${career}`);

        // Manejo de consulta para obtener el año más reciente o específico
        if (!year) {
            // Leer el archivo que contiene los años disponibles
            const yearsFilePath = path.join(basePath, 'years.json');
            const yearsFile = await fs.readFile(yearsFilePath, 'utf-8');
            const yearsData = JSON.parse(yearsFile);

            // Obtener el año más reciente
            const mostRecentYear = Math.max(...yearsData.years);

            // Leer el archivo de la malla curricular para el año más reciente
            const mostRecentFilePath = path.join(basePath, `${career}${mostRecentYear}.json`);
            const mostRecentFile = await fs.readFile(mostRecentFilePath, 'utf-8');
            const mostRecentData = JSON.parse(mostRecentFile);

            return NextResponse.json({
                yearCurricula: mostRecentYear,
                ...mostRecentData,
                years: 
                    yearsData.years
            });
        } else {
            // Leer el archivo específico para el año solicitado
            const yearsFilePath = path.join(basePath, 'years.json');
            const yearsFile = await fs.readFile(yearsFilePath, 'utf-8');
            const yearsData = JSON.parse(yearsFile);
            const filePath = path.join(basePath, `${career}${year}.json`);
            const file = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(file);

            return NextResponse.json({
                yearCurricula: Number(year),
                ...data,
                years: 
                    yearsData.years
            });
        }
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
    }
}
