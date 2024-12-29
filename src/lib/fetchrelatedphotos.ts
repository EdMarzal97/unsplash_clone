const PEXELS_API_URL = 'https://api.pexels.com/v1';

export async function fetchRelatedPhotos(query: string) {
  const response = await fetch(`${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&per_page=20`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || '',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch related photos :(');
  }

  const data = await response.json();
  return data.photos.filter((photo: { alt: string | null }) => photo.alt);
}
