import Link from "next/link";
import { renderDescription } from "@/utils/mdx";
import ClickableHeader from "@/components/ClickableHeader";
import DateFormatter from "@/components/DateFormatter";
import type { MDXEntry } from "@/types";

const EntriesListItem = async ({ entry }: { entry: MDXEntry }) => {
  // Convert the markdown frontmatter description to HTML
  const descriptionHtml = await renderDescription(
    entry.frontmatter.description,
  );

  return (
    <div>
      <p className="callout-1">
        <DateFormatter dateString={entry.frontmatter.date} />
      </p>
      <h2 className="heading-2 mt-2 lg:mt-4">
        <Link
          className="hover:underline"
          href={`/blog/${entry.frontmatter.slug}`}
        >
          {entry.frontmatter.title}
        </Link>
      </h2>
      <div
        className="body-1 mt-2 w-full lg:mt-4 lg:w-10/12"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      ></div>
    </div>
  );
};

const EntriesList = ({ entries, label = "Entries" }) => {
  return (
    <section className="flex w-full flex-col border-t border-t-black pt-8 md:py-12 lg:flex-row lg:pt-24">
      <aside className="hidden w-full lg:block lg:w-4/12">
        <h2 className="callout-1 text-black">
          <ClickableHeader id={"related-posts"}>{label}</ClickableHeader>
        </h2>
      </aside>
      <div className="w-full md:w-3/4 lg:w-8/12">
        <ul className="flex flex-col gap-12 md:gap-16 lg:gap-24">
          {entries.map((entry: MDXEntry, index: number) => {
            return (
              <li key={index}>
                <EntriesListItem entry={entry} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default EntriesList;
