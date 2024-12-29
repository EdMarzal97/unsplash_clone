/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Photo = {
    id: number;
    src: {
      original: string;
      large: string;
      medium: string;
      small: string;
    };
    photographer_url: string;
    photographer: string;
    alt: string | null;
  };

type MoreLikeThisProps = {
  photos: Photo[];
  loading: boolean;
  error: string | null;
};

const MoreLikeThis: React.FC<MoreLikeThisProps> = ({ photos, loading, error }) => (
  <div>
    <h2 className="text-lg font-semibold mb-4">More Like This</h2>
    {loading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4">
      {photos.map((relatedPhoto) => (
        <div key={relatedPhoto.id} className="relative pb-4">
          <img
            src={relatedPhoto.src.original}
            alt={relatedPhoto.alt || "Related photo"}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);

export default MoreLikeThis;