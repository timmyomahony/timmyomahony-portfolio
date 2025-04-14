/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/types";
import classNames from "classnames";
import Image from "next/image";
type ImgProps = {
  photo: Photo;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
};

const Img = ({ photo, loaded, setLoaded }: ImgProps) => {
  const className = classNames(
    "aspect-square h-full w-full object-cover transition-opacity duration-500 ease-in",
    loaded ? "opacity-100" : "opacity-0",
  );
  return (
    <Image
      src={photo.url}
      width={512}
      height={512}
      className={className}
      quality={80}
      alt={photo?.exif?.title || ""}
      onLoad={() => {
        setLoaded(true);
      }}
    />
  );
};

type SquareThumbnailProps = {
  photo: Photo;
  url?: string;
};

const SquareThumbnail = ({ photo, url }: SquareThumbnailProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure
      className={`group relative flex flex-col ${
        !loaded && "animate-pulse cursor-wait"
      }`}
    >
      {url ? (
        <Link
          href={url}
          className={`bg-gray-200 ${loaded ? "cursor-pointer" : "cursor-wait"}`}
        >
          <Img photo={photo} loaded={loaded} setLoaded={setLoaded} />
        </Link>
      ) : (
        <Img photo={photo} loaded={loaded} setLoaded={setLoaded} />
      )}
    </figure>
  );
};

export default SquareThumbnail;
