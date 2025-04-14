import DateFormatter from "@/components/DateFormatter";
import { renderDescription } from "@/utils/mdx";
import type { MDXEntry } from "@/types";
import CoverImage from "@/components/CoverImages";

const EntryHeader = async ({ entry }: { entry: MDXEntry }) => {
  const descriptionHtml = await renderDescription(
    entry.frontmatter.description,
  );
  return (
    <header className="flex flex-col items-end gap-8 border-b border-black pb-12 md:flex-row md:gap-12 md:pb-24 xl:gap-16 2xl:gap-24">
      <div
        className={`w-full md:order-1 ${
          entry.frontmatter.image ? "md:w-7/12" : "md:w-9/12"
        }`}
      >
        <p className="callout-2">
          <DateFormatter dateString={entry.frontmatter.date} />
        </p>
        <h1 className="mt-3 font-noto text-3xl leading-tight md:mt-6 lg:text-4xl 2xl:mt-10 2xl:text-5xl 2xl:leading-snug">
          {entry.frontmatter.title}
        </h1>
        {descriptionHtml && (
          <div
            className="body-1 mt-4 w-full xl:w-11/12 2xl:mt-8"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
        )}
      </div>
      {entry.frontmatter.image && (
        <figure className="order-1 w-full md:order-2 md:w-5/12">
          <CoverImage entry={entry} />
        </figure>
      )}
    </header>
  );
};

export default EntryHeader;
