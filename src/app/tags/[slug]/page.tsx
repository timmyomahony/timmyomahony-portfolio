import Container from "@/components/Container";
import EntriesList from "@/components/entries/EntriesList";
import Page from "@/components/layouts/Page";
import { MDXEntry } from "@/types";
import { getAllTags, getEntries, getEntriesForTag } from "@/utils/entries";

const TagListPage = async ({ params }) => {
  const { slug } = await params;
  const entries: MDXEntry[] = await getEntries("all");
  const taggedEntries = await getEntriesForTag(entries, slug);

  return (
    <Page>
      <Container>
        <header className="border-t border-t-black pt-8 md:pt-12 lg:pt-24">
          <h1 className="heading-1 text-center">
            # {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
        </header>
        <div className="pt-8 md:py-12 lg:pt-24">
          {taggedEntries && taggedEntries.length > 0 && (
            <EntriesList entries={taggedEntries} label="Tagged Entries" />
          )}
        </div>
      </Container>
    </Page>
  );
};

const generateMetadata = async (params) => {
  const { slug } = await params;
  return {
    title: `Content from around the site tagged with ${slug}`,
    description: `See a list of recent content that I've tagged with ${slug}.`,
  };
};

export const dynamicParams = false;

const generateStaticParams = async () => {
  const entries = await getEntries("all");
  const tags = await getAllTags(entries);
  return tags.map((tag) => {
    return { slug: tag };
  });
};

export { generateMetadata, generateStaticParams };

export default TagListPage;
