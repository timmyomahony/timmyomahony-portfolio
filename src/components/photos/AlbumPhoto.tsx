/* eslint-disable @next/next/no-img-element */
"use client";
import type { Album } from "@/types";
import Link from "next/link";
import { useState } from "react";

const AlbumPhoto = ({ album }: { album: Album }) => {
  const photo = album.photos[0];
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className={`group relative flex flex-col ${
        !loaded && "animate-pulse cursor-wait"
      }`}
    >
      <Link
        href={`/photos/albums/${album.slug}/`}
        className={`bg-gray-200 ${loaded ? "cursor-pointer" : "cursor-wait"}`}
      >
        <img
          src={photo.url}
          width={photo.width}
          height={photo.height}
          className={`aspect-square h-full w-full border-[1px] border-transparent object-cover transition-opacity duration-500 ease-in hover:border-ruby xl:aspect-[2/3] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          alt={photo?.exif?.title || "Album cover photo"}
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </Link>
      <p className="mt-2 group-hover:text-ruby">{album.name}</p>
    </figure>
  );
};

export default AlbumPhoto;
