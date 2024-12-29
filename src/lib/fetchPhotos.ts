const PEXELS_API_URL = 'https://api.pexels.com/v1';

export async function fetchPhotos() {
  const response = await fetch(`${PEXELS_API_URL}/curated?per_page=40`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || '',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos :(');
  }

  const data = await response.json();

  return data.photos.filter((photo: { alt: string | null }) => photo.alt);
}
