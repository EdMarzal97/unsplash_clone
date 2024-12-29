/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { fetchPhotos } from "@/lib/fetchPhotos";
import { SearchBar } from "@/components/searchbar";

type Photo = {
  id: number;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
  };
  photographer: string;
  alt: string | null;
};

export function Header({ onSearch }: { onSearch: (query: string) => void }) {
  const [carouselImages, setCarouselImages] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchCarouselImages() {
      try {
        const photos = await fetchPhotos();
        setCarouselImages(photos.slice(0, 5));
      } catch (error) {
        console.error("Oops there are no images here.. :(", error);
      }
    }

    fetchCarouselImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        carouselImages.length ? (prevIndex + 1) % carouselImages.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages]);

  if (!carouselImages.length) return null;

  return (
    <header className="relative w-full h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <img
            key={image.id}
            src={image.src.original}
            alt={image.alt || "Carousel Image"}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl font-bold mb-4 text-center">
          Discover Amazing Photos
        </h1>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}