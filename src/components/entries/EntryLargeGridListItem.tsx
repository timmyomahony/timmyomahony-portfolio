/* eslint-disable @next/next/no-img-element */
import DateFormatter from "@/components/DateFormatter";
import Tag from "@/components/Tag";
import type { MDXEntry } from "@/types";
import Link from "next/link";

interface Props {
  entry: MDXEntry;
  showBorder?: Boolean;
  showFooter?: Boolean;
  urlPrefix?: string;
}

const EntryLargeGridListItem = ({
  entry,
  showBorder = true,
  showFooter = true,
  urlPrefix = "",
}: Props) => {
  const url = `${urlPrefix}/${entry.frontmatter.slug}/`;
  const className = showBorder ? "p-4 lg:p-6 border border-black " : "";
  return (
    <div className={`${className} group h-full`}>
      {entry.frontmatter.image && (
        <Link className="block" href={url}>
          <img
            className={`duration-600 mb-4 grayscale transition ease-in-out group-hover:grayscale-0 ${!showBorder ? "border border-transparent transition-all duration-500 ease-in group-hover:border-ruby" : ""}`}
            src={entry.frontmatter.image.url}
            alt={entry.frontmatter.title}
            width={900}
            height={600}
          />
        </Link>
      )}
      <div className="flex-grow">
        <h3 className="font-inter text-base font-medium xl:text-xl">
          <Link className="hover:underline" href={url}>
            {entry.frontmatter.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm md:mt-2 xl:text-base">
          {entry.frontmatter.description}
        </p>
        {showFooter && (
          <div className="mt-3 flex items-center justify-between">
            {entry.frontmatter.tags && (
              <div>
                {entry.frontmatter.tags.map((tag, i) => {
                  return <Tag key={i} slug={tag} theme={"naked"} />;
                })}
              </div>
            )}
            <span className="font-overpass text-sm">
              <DateFormatter
                dateString={entry.frontmatter.date}
                formatString="yyyy"
                includeDay={false}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryLargeGridListItem;
