/* eslint-disable @next/next/no-img-element */
import DateFormatter from "@/components/DateFormatter";
import Tag from "@/components/Tag";
import type { MDXEntry } from "@/types";
import Link from "next/link";

interface Props {
  entry: MDXEntry;
  urlPrefix?: string;
  showBorder?: boolean;
}

const EntrySmallGridListItem = ({
  entry,
  showBorder = true,
  urlPrefix = "",
}: Props) => {
  let url = `${urlPrefix}/${entry.frontmatter.slug}/`;
  const className = showBorder ? "p-4 lg:p-6 border border-black " : "";
  return (
    <div className={`${className} group flex h-full items-center gap-6`}>
      {entry.frontmatter.thumbnail && (
        <Link className="hidden md:block" href={url}>
          <img
            className="duration-600 aspect-square max-w-[110px] object-cover transition ease-in-out"
            src={entry.frontmatter.thumbnail}
            alt={entry.frontmatter.title}
            width={300}
            height={300}
          />
        </Link>
      )}
      <div className="w-full flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="font-inter text-lg font-bold">
            <Link className="hover:underline" href={url}>
              {entry.frontmatter.title}
            </Link>
          </h3>
          <span className="text-md font-overpass">
            <DateFormatter
              dateString={entry.frontmatter.date}
              formatString="yyyy"
              includeDay={false}
            />
          </span>
        </div>
        <p className="font-base mt-2">{entry.frontmatter.description}</p>
        {entry.frontmatter.tags && (
          <div className="mt-3">
            {entry.frontmatter.tags.map((tag, i) => {
              return <Tag key={i} slug={tag} theme={"naked"} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EntrySmallGridListItem;
