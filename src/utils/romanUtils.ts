export function intToRoman(num: number): string {
    if (num <= 0 || num > 3999) {
        throw new Error('Input must be a positive integer between 1 and 3999.');
    }

    const romanNumerals: { [key: number]: string } = {
        1: 'I', 4: 'IV', 5: 'V', 9: 'IX', 10: 'X',
        40: 'XL', 50: 'L', 90: 'XC', 100: 'C',
        400: 'CD', 500: 'D', 900: 'CM', 1000: 'M'
    };

    let roman = '';
    let remaining = num;

    // Array of values sorted in descending order
    const values = Object.keys(romanNumerals).map(Number).reverse();

    for (const value of values) {
        while (remaining >= value) {
            roman += romanNumerals[value];
            remaining -= value;
        }
    }

    return roman;
}
