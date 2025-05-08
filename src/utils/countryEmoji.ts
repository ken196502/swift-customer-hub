interface Country {
  value: string;
  label: string;
}

export function getCountryEmoji(country: Country): string {
  if (!country || !country.value) return '';
  
  // Convert country code to emoji using the value field
  const codePoints = country.value
    .toUpperCase()
    .split('')
    .map(char => char.charCodeAt(0))
    .map(code => code - 65 + 127397);
  
  return String.fromCodePoint(...codePoints);
}
