export function convertYear(year: number): string {
    if (year < 1 || year > 99) {
        throw new Error('Year must be between 1 and 99.');
    }

    const ordinal: { [key: number]: string } = {
        1: 'Primer',
        2: 'Segundo',
        3: 'Tercer',
        4: 'Cuarto',
        5: 'Quinto',
        6: 'Sexto',
        7: 'Séptimo',
        8: 'Octavo',
        9: 'Noveno',
        10: 'Décimo',
        11: 'Undécimo',
        12: 'Duodécimo',
    };

    return `${ordinal[year] || year} año`;
}