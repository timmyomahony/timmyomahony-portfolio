/* eslint-disable @next/next/no-img-element */
import DateFormatter from "@/components/DateFormatter";
import { MDXEntry } from "@/types";
import Link from "next/link";

type Props = {
  entry: MDXEntry;
  urlPrefix: string;
};

const EntrySummary = ({ entry, urlPrefix }: Props) => {
  return (
    <div className="flex items-center gap-12">
      {entry.frontmatter.image && (
        <div>
          <Link
            className="hover:underline"
            href={`${urlPrefix}/${entry.frontmatter.slug}`}
          >
            <img
              className="aspect-square h-32 w-32 object-cover"
              src={entry.frontmatter.image.url}
              alt={entry.frontmatter.title}
              height={256}
              width={256}
            />
          </Link>
        </div>
      )}
      <div className="">
        <p className="callout-2 text-[#504848]">
          <DateFormatter dateString={entry.frontmatter.date} />
        </p>
        <h2 className="mt-2 font-noto text-2xl leading-normal lg:text-3xl 2xl:text-[2.1rem]">
          <Link
            className="hover:underline"
            href={`${urlPrefix}/${entry.frontmatter.slug}`}
          >
            {entry.frontmatter.title}
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default EntrySummary;
