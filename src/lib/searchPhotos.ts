const PEXELS_API_URL = 'https://api.pexels.com/v1';

type Photo = {
  id: number;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
  };
  photographer: string;
  photographer_url: string;
  alt: string | null;
};

type PexelsResponse = {
  photos: Photo[];
};


export async function searchPhotos(query: string): Promise<Photo[]> {
  const response = await fetch(`${PEXELS_API_URL}/search?query=${query}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || '',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch search results :(');
  }

  const data: PexelsResponse = await response.json();
  return data.photos;
}