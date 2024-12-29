/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Bookmark, Heart } from "lucide-react";
import { fetchRelatedPhotos } from "@/lib/fetchrelatedphotos";
import  AvatarIcon  from "@/components/avataricon";
import MoreLikeThis from "@/components/morelikethis";

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

export function PhotoCard({ photo }: { photo: Photo }) {

  const [morePhotos, setMorePhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (photo.alt) {
      const fetchMorePhotos = async () => {
        setLoading(true);
        setError(null);
        try {
          const photos = await fetchRelatedPhotos(photo.alt || "");
          setMorePhotos(photos);
        } catch {
          setError("Whoops looks like there is nothing here");
        } finally {
          setLoading(false);
        }
      };
  
      fetchMorePhotos();
    }
  }, [photo.alt]);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative mb-4 break-inside-avoid overflow-hidden group">
          <img
            src={photo.src.original}
            alt={photo.alt || "Image"}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                className="bg-gray-200 border-black p-2 rounded-lg shadow-md hover:bg-white"
                aria-label="Like"
              >
                <Heart />
              </button>
              <button
                className="bg-gray-200 border-black p-2 rounded-lg shadow-md hover:bg-white"
                aria-label="Save"
              >
                <Bookmark />
              </button>
            </div>
            <div className="absolute inset-x-2 bottom-2 p-2 flex justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex justify-start flex-col">
                  <a
                    href={photo.photographer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm font-medium"
                  >
                    {photo.photographer}
                  </a>
                  <p className="text-white text-sm font-medium">
                    ready for contract
                  </p>
                </div>
              </div>

              <a
                href={photo.src.original}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 border-black p-2 rounded-lg shadow-md hover:bg-white"
                aria-label="Download"
              >
                <Download />
              </a>
            </div>
          </div>
        </div>
      </DialogTrigger>
        <DialogContent className="max-w-[1140px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center p-4">
              <AvatarIcon photographerName={photo.photographer} photographerUrl={photo.photographer_url} />
              <div className="flex gap-2 justify-around items-center">
                <button
                  className="bg-white border-gray-400 text-gray-400 border p-2 rounded-lg shadow-md hover:border-black hover:text-black"
                  aria-label="Like"
                >
                  <Heart />
                </button>
                <button
                  className="bg-white border-gray-400 text-gray-400 border p-2 rounded-lg shadow-md hover:border-black hover:text-black"
                  aria-label="Save"
                >
                  <Bookmark />
                </button>
                <a
                  href={photo.src.original}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 border-gray-200 border text-white p-2 rounded-lg shadow-md hover:border-green-700 flex items-center justify-center gap-2 p-2"
                  aria-label="Download"
                >
                  Free Download <Download />
                </a>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center w-full">
            <img
              src={photo.src.original}
              alt={photo.alt || "Image"}
              className="max-w-[928px] max-h-[618px]"
            />
          </div>
          <div className="flex justify-start">{photo.alt}</div>
          <MoreLikeThis photos={morePhotos} loading={loading} error={error} />
        </DialogContent>
    </Dialog>
  );
}
