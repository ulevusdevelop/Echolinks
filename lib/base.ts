// RECONSTRUCTED STAND-IN — see audit notes. Replace with your real file.
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT || '';

export async function fetchAPI(query: string, variables: Record<string, unknown> = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}
