"use client";

import React, { useEffect, useState } from "react";
import { fetchPhotos } from "@/lib/fetchPhotos";
import { searchPhotos } from "@/lib/searchPhotos";
import { PhotoCard } from "@/components/photocard";
import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function HomePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    async function getPhotos() {
      try {
        const photos = await fetchPhotos();
        setPhotos(photos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPhotos();
  }, []);

  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      const photos = await fetchPhotos();
      setPhotos(photos);
      return;
    }

    setSearching(true);
    try {
      const results = await searchPhotos(query);
      setPhotos(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-4 w-[250px]" />;
  }

  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <Skeleton key={index} className="h-4 w-[250px]" />
    ));

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
      <Header onSearch={handleSearch} />
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4 max-w-[1360px]">
          {searching ? renderSkeletons() : (
            photos.map((photo) => <PhotoCard key={photo.id} photo={photo} />)
          )}
        </div>
      </div>
    </>
  );
}
