import ClickableHeader from "@/components/ClickableHeader";
import EntrySummary from "@/components/entries/EntrySummary";
import { MDXEntry } from "@/types";
import { getRelatedEntries } from "@/utils/entries";

type Props = {
  entry: MDXEntry;
  entries: MDXEntry[];
  urlPrefix: string;
};

const RelatedEntries = async ({ entry, entries, urlPrefix }: Props) => {
  const { relatedEntries } = await getRelatedEntries(entry, entries);

  const similarEntriesText =
    relatedEntries.length > 1 ? "Similar Posts" : "Similar Post";

  return (
    <>
      {relatedEntries.length > 0 && (
        <section className="border-t border-black pt-12 md:pt-24">
          <div className="flex w-full flex-col lg:flex-row">
            <div className="w-full lg:w-4/12">
              <h2 className="callout-1 text-ruby">
                <ClickableHeader id={"related-posts"}>
                  {similarEntriesText}
                </ClickableHeader>
              </h2>
            </div>
            <div className="mt-12 w-full lg:mt-0 lg:w-8/12">
              <ul className="flex flex-col gap-10 lg:gap-12 xl:gap-16">
                {relatedEntries.map((entry, i) => {
                  return (
                    <li key={i}>
                      <EntrySummary entry={entry} urlPrefix={urlPrefix} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedEntries;
