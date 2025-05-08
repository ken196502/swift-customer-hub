export const countryEmojis: Record<string, string> = {
  'CN': '🇨🇳',
  'HK': '🇭🇰',
  'SG': '🇸🇬',
  'US': '🇺🇸',
  'AD': '🇦🇩',
  'KW': '🇰🇼',
  'TW': '🇹🇼',
  // Add more countries as needed
};

export function getCountryEmoji(countryCode: string): string {
  return countryEmojis[countryCode] || '';
}
