export async function getCountries(): Promise<{
  value: string;
  label: string;
}[]> {
  const response = await fetch('/flags_cn.json');
  return response.json();
}

// Export a default value for use in non-async contexts
export const countries = [] as {
  value: string;
  label: string;
}[];
