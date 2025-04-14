/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

import useBreakpoints from "@/hooks/breakpoints";
import type { Photo } from "@/types";

const Photo = ({ photo }: { photo: Photo }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure
      className={`group relative bg-gray-200 ${
        !loaded ? "animate-pulse cursor-wait" : "cursor-zoom-in"
      }`}
    >
      <img
        src={photo.url}
        width={photo.width}
        height={photo.height}
        className={`w-full max-w-full border-[1px] border-transparent transition-all duration-300 ease-in-out group-hover:border-ruby ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        title={photo?.exif?.title || ""}
        alt={photo?.exif?.title || ""}
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </figure>
  );
};

type Columns = Array<{
  height: number;
  photos: Array<Photo>;
}>;

const MasonryGrid = ({
  photos,
  onClick,
}: {
  photos: Photo[];
  onClick: (photo: Photo) => void;
}) => {
  const breakpoint = useBreakpoints();
  const containerRef = useRef<any>(null);
  const [numColumns, setNumColumns] = useState<number | undefined>(undefined);
  const [columns, setColumns] = useState<Columns>([]);

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log(`Breakpoint changed to ${breakpoint}`);
      if (breakpoint === null) {
        setNumColumns(1);
      } else {
        setNumColumns(
          {
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            "2xl": 3,
          }[breakpoint],
        );
      }
    }
  }, [breakpoint]);

  useEffect(() => {
    if (numColumns !== undefined) {
      console.log(`Columns changed to ${numColumns}`);
      const columns: Columns = Array.from({ length: numColumns }, () => ({
        height: 0,
        photos: [],
      }));

      photos.forEach((photo, i) => {
        let shortestColumnIndex = 0;
        for (let i = 0; i < numColumns; i++) {
          if (columns[i]?.height < columns[shortestColumnIndex]?.height) {
            shortestColumnIndex = i;
          }
        }

        columns[shortestColumnIndex].photos.push({
          ordering: i,
          ...photo,
        });

        if (photo.height && photo.width && containerRef.current) {
          const columnWidth = containerRef?.current?.clientWidth / numColumns;
          const tileHeight = (photo.height / photo.width) * columnWidth;
          columns[shortestColumnIndex].height += tileHeight;
        }
      });

      setColumns(columns);
    }
  }, [numColumns, photos]);

  return (
    <div ref={containerRef} className="flex w-full gap-8">
      {columns.map((column, i) => (
        <ul className="flex flex-1 flex-col gap-4 lg:gap-8" key={i}>
          {column.photos.map((photo) => (
            <li
              className="w-full"
              key={photo.ordering}
              onClick={() => onClick(photo)}
            >
              <Photo photo={photo} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default MasonryGrid;
