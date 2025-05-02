import Link from "next/link";
import { renderDescription } from "@/utils/mdx";
import ClickableHeader from "@/components/ClickableHeader";
import DateFormatter from "@/components/DateFormatter";
import type { MDXEntry } from "@/types";

const EntriesListItem = async ({
  entry,
  urlPrefix,
}: {
  entry: MDXEntry;
  urlPrefix: string;
}) => {
  // Convert the markdown frontmatter description to HTML
  const descriptionHtml = await renderDescription(
    entry.frontmatter.description,
  );

  return (
    <div className="flex gap-8 lg:gap-12">
      {entry.frontmatter.image && (
        <div className="hidden flex-shrink-0 md:block">
          <Link
            className="hover:underline"
            href={`/${urlPrefix}/${entry.frontmatter.slug}`}
          >
            <img
              className="w-32 object-cover md:w-32 lg:h-56"
              src={entry.frontmatter.image.url}
              alt={entry.frontmatter.title}
              height={512}
              width={256}
            />
          </Link>
        </div>
      )}
      <div>
        <p className="callout-1">
          <DateFormatter dateString={entry.frontmatter.date} />
        </p>
        <h2 className="heading-2 mt-2 lg:mt-4">
          <Link
            className="hover:underline"
            href={`/${urlPrefix}/${entry.frontmatter.slug}`}
          >
            {entry.frontmatter.title}
          </Link>
        </h2>
        <div
          className="body-1 mt-2 w-full lg:mt-4 lg:w-10/12"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        ></div>
      </div>
    </div>
  );
};

const EntriesList = ({ entries, label = "Entries", urlPrefix = "blog" }) => {
  return (
    <section className="flex w-full flex-col border-t border-t-black pt-8 md:py-12 lg:flex-row lg:pt-24">
      <aside className="hidden w-full lg:block lg:w-3/12">
        <h2 className="callout-1 text-black">
          <ClickableHeader id={"related-posts"}>{label}</ClickableHeader>
        </h2>
      </aside>
      <div className="w-full md:w-full lg:w-9/12">
        <ul className="flex flex-col gap-12 md:gap-16 lg:gap-24">
          {entries.map((entry: MDXEntry, index: number) => {
            return (
              <li key={index}>
                <EntriesListItem entry={entry} urlPrefix={urlPrefix} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default EntriesList;
