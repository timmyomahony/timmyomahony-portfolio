import Container from "@/components/Container";
import EntriesList from "@/components/entries/EntriesList";
import HeroEntry from "@/components/HeroEntry";
import Pagination from "@/components/Pagination";
import { MDXEntry } from "@/types";
import { getEntries } from "@/utils/entries";
import { compareDesc } from "date-fns";
import type { Metadata } from "next";

const PER_PAGE = 10;

type Params = Promise<{
  id: string | string[] | undefined;
  slug: string | string[] | undefined;
}>;

type Props = {
  params: Params;
};

const BlogListPage = async ({ params }: Props) => {
  const entries = await getEntries("posts");
  const sortedEntries = entries.sort((a: MDXEntry, b: MDXEntry) =>
    compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date)),
  );
  const { id } = await params;
  const page = id ? parseInt(id[1]) : 1;
  const totalPages = Math.ceil(entries.length / PER_PAGE);

  let pageEntries = sortedEntries.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  let pinnedEntry: MDXEntry | undefined = undefined;

  if (page === 1) {
    pinnedEntry = entries.find((entry) => {
      return entry.frontmatter.pinned;
    });
  }

  if (pinnedEntry) {
    pageEntries = pageEntries.filter(
      (entry) =>
        !pinnedEntry || entry.frontmatter.slug !== pinnedEntry.frontmatter.slug,
    );
  }

  return (
    <Container>
      {pinnedEntry && <HeroEntry entry={pinnedEntry} />}
      {entries.length > 0 && (
        <EntriesList entries={pageEntries} label="All Posts" />
      )}
      <section className="flex w-full flex-col py-12 lg:flex-row">
        <aside className="hidden w-full lg:block lg:w-4/12"></aside>
        <div className="w-full md:w-3/4 lg:w-8/12">
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </section>
    </Container>
  );
};

const generateStaticParams = async () => {
  const entries = await getEntries("posts");
  const totalPages = Math.ceil(entries.length / PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    id: i === 0 ? [] : ["page", (i + 1).toString()],
  }));
};

export const metadata: Metadata = {
  title: "Blog posts & articles | Timmy O'Mahony",
  description: "Read my latest blog posts and articles - mostly tech",
};

export { generateStaticParams };
export default BlogListPage;
