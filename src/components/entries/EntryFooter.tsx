import RelatedEntries from "@/components/entries/RelatedEntries";
import { MDXEntry } from "@/types";
import { getEntries } from "@/utils/entries";

type Props = {
  entry: MDXEntry;
  urlPrefix: string;
};

const EntryFooter = async ({ entry, urlPrefix }: Props) => {
  const entries = await getEntries("posts");
  return (
    <footer className="mt-12 lg:mt-24 xl:mt-32">
      <div className="mt-12 w-full lg:mt-24">
        <RelatedEntries entry={entry} entries={entries} urlPrefix={urlPrefix} />
      </div>
    </footer>
  );
};

export default EntryFooter;
