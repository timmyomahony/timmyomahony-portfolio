"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Photo } from "@/types";
import SquareThumbnail from "@/components/photos/SquareThumbnail";

type Props = {
  photos: Photo[];
  title?: string;
  description?: React.ReactNode;
  linkUrl?: string;
  linkText?: string;
};

export default function LatestPhotosGrid({
  photos,
  title,
  description,
  linkUrl,
  linkText = "See All",
}: Props) {
  return (
    <div className="relative flex flex-col gap-12 xl:gap-20">
      {(title || description) && (
        <div className="flex flex-col gap-2 lg:gap-4 xl:gap-6">
          {title && <h2 className="heading-1">{title}</h2>}
          {description && <p className="body-2 md:w-1/2">{description}</p>}
        </div>
      )}
      <div>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo, index) => {
            return (
              <li key={index}>
                <SquareThumbnail photo={photo} />
              </li>
            );
          })}
        </ul>
        {linkUrl && (
          <p className="text-center md:text-right xl:mt-6">
            <Link className="callout-0 hover:underline" href={linkUrl}>
              {linkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
