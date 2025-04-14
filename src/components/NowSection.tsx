"use client";

import { useState } from "react";
import HappyFace from "@/icons/happy-face.svg";
import OKFace from "@/icons/ok-face.svg";
import SadFace from "@/icons/sad-face.svg";
import VeryHappyFace from "@/icons/very-happy-face.svg";
import VerySadFace from "@/icons/very-sad-face.svg";
import type { NowDataEntry } from "@/types";
import Link from "next/link";

const LIMIT = 10;

const NowSection = ({
  category,
  entries,
}: {
  category: string;
  entries: NowDataEntry[];
}) => {
  const [showMore, setShowMore] = useState(false);
  const filteredEntries = entries.filter((item) => item.category === category);
  const displayedEntries = showMore
    ? filteredEntries
    : filteredEntries.slice(0, LIMIT);
  const hasMore = filteredEntries.length > LIMIT;

  return (
    <div className="flex flex-col gap-4 border-t border-black md:flex-row md:gap-0">
      <div className="w-full md:w-1/3">
        <h2 className="callout-0 mt-8 uppercase">{category}</h2>
      </div>
      <div className="w-full md:w-2/3">
        <ul className="flex flex-col divide-y divide-black md:mt-4">
          {displayedEntries.map((item, j) => (
            <li
              key={j}
              className="flex items-center justify-between py-3 md:py-4"
            >
              <h3 className="body-2">
                {item.link ? (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-ruby hover:underline"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <>{item.text}</>
                )}
              </h3>
              <div className="flex items-center gap-2">
                {item.rating && item.rating === 5 && (
                  <span title="Very Good">
                    <VeryHappyFace className="h-5 w-5 text-ruby" />
                  </span>
                )}
                {item.rating && item.rating === 4 && (
                  <span title="Good">
                    <HappyFace className="h-5 w-5 text-ruby" />
                  </span>
                )}
                {item.rating && item.rating === 3 && (
                  <span title="Meh">
                    <OKFace className="h-5 w-5 text-ruby" />
                  </span>
                )}
                {item.rating && item.rating === 2 && (
                  <span title="Bad">
                    <SadFace className="h-5 w-5 text-ruby" />
                  </span>
                )}
                {item.rating && item.rating === 1 && (
                  <span title="Awful">
                    <VerySadFace className="h-5 w-5 text-ruby" />
                  </span>
                )}
                <p className="body-3">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="callout-1 mt-4 hover:underline"
          >
            {showMore
              ? "Show Less ↑"
              : `Show ${filteredEntries.length - LIMIT} More ↓`}
          </button>
        )}
      </div>
    </div>
  );
};

export default NowSection;
