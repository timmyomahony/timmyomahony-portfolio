import { renderDescription } from "@/utils/mdx";
import type { MDXEntry } from "@/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const EntrySimpleHeader = async ({
  entry,
  suptitle = "Latest Work",
}: {
  entry: MDXEntry;
  suptitle?: string;
}) => {
  const descriptionHtml = await renderDescription(
    entry.frontmatter.description,
  );
  return (
    <header className="flex flex-col items-center gap-4 border-t border-black pt-12 text-center md:pt-16 lg:gap-6">
      {suptitle && (
        <h2 className="callout-1">
          <Link className="flex items-center hover:underline" href="/work/">
            {suptitle}
          </Link>
        </h2>
      )}
      <h1 className="heading-1">{entry.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
      {entry.frontmatter.website && (
        <span className="flex items-center gap-1 hover:text-ruby">
          <ArrowTopRightOnSquareIcon className="w-4" />
          <Link
            className="font-overpass text-sm underline"
            href={entry.frontmatter.website}
            target="_blank"
          >
            {entry.frontmatter.website}
          </Link>
        </span>
      )}
    </header>
  );
};

export default EntrySimpleHeader;
