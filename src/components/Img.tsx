/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  title?: string;
  titleLink?: string;
  caption?: string | React.ReactNode;
};

// Warning: These are automatically injected into a <p>
const Img = ({ src, alt, title, titleLink }: Props) => {
  let [fullscreen, setFullscreen] = useState(false);
  return (
    <>
      <span className="mb-8 mt-8 block lg:mb-14 lg:mt-14 2xl:mb-16 2xl:mt-16">
        <img
          onClick={() => setFullscreen(true)}
          className="cursor-zoom-in rounded-[2px]"
          src={src}
          alt={alt}
          title={title}
        />
        {title && (
          <span className="mt-3 block w-full font-overpass text-xs font-light text-gray-400">
            {titleLink ? (
              <a
                href={titleLink}
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </span>
        )}
      </span>
      {fullscreen && (
        <span
          onClick={() => setFullscreen(false)}
          className="fixed left-0 top-0 z-40 flex h-screen w-screen cursor-zoom-out items-center justify-center bg-black bg-opacity-70"
        >
          <img
            className="max-h-[98%] max-w-[98%]"
            src={src}
            alt={alt}
            title={title}
          />
        </span>
      )}
    </>
  );
};

export default Img;
