import EntryFooter from "@/components/entries/EntryFooter";
import EntryHeader from "@/components/entries/EntryHeader";
import EntrySidebar from "@/components/entries/EntrySidebar";
import Container from "@/components/Container";
import EntryContent from "@/components/entries/EntryContent";
import MDXComponents from "@/components/MDXComponent";
import { MDXEntry } from "@/types";
import { getEntries } from "@/utils/entries";
import { stripDescription } from "@/utils/mdx";
import { notFound } from "next/navigation";

const BlogDetailPage = async ({ params }) => {
  const entries = await getEntries("posts");
  const { slug } = await params;
  const entry = entries.find((entry) => entry.frontmatter.slug === slug);

  if (!entry) notFound();

  const { default: MDXContent } = entry;

  return (
    <Container>
      <article className="mb-12 lg:mb-32">
        <EntryHeader entry={entry} />
        <div className="mt-12 flex flex-col gap-8 lg:mt-24 lg:flex-row lg:gap-24">
          <EntryContent className="w-full lg:w-8/12">
            <MDXContent components={MDXComponents} />
          </EntryContent>
          <EntrySidebar className="w-full lg:w-4/12" entry={entry} />
        </div>
        <EntryFooter entry={entry} urlPrefix="/blog" />
      </article>
    </Container>
  );
};

const generateStaticParams = async () => {
  return (await getEntries("posts")).map((entry) => ({
    slug: entry.frontmatter.slug,
  }));
};

export const dynamicParams = false;

const generateMetadata = async ({ params }) => {
  const entries: MDXEntry[] = await getEntries("posts");
  const { slug } = await params;
  const entry = entries.find((entry) => entry.frontmatter.slug === slug);
  if (!entry) notFound();
  const title = entry.frontmatter.title;
  const description = await stripDescription(entry.frontmatter.description);
  return {
    title,
    description,
  };
};

export { generateMetadata, generateStaticParams };

export default BlogDetailPage;
