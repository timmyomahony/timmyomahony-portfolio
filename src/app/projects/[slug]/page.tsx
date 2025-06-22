import Container from "@/components/Container";
import Page from "@/components/layouts/Page";
import MDXComponents from "@/components/MDXComponent";
import { getEntries } from "@/utils/entries";
import { stripDescription } from "@/utils/mdx";
import EntrySimpleHeader from "@/components/entries/EntrySimpleHeader";
import { notFound } from "next/navigation";

const ProjectDetailPage = async ({ params }) => {
  const entries = await getEntries("projects");
  const { slug } = await params;
  const entry = entries.find((entry) => entry.frontmatter.slug === slug);

  if (!entry) notFound();

  const { default: MDXContent, MDXDefinedComponent, ...rest } = entry;

  return (
    <Page>
      <Container>
        <article className="mx-auto w-full lg:w-8/12 xl:w-7/12">
          <EntrySimpleHeader entry={entry} suptitle="Projects" />
          <div className="mt-12 lg:mt-20">
            <MDXContent components={MDXComponents} />
          </div>
        </article>
      </Container>
    </Page>
  );
};

const generateStaticParams = async () => {
  return (await getEntries("projects")).map((entry) => ({
    slug: entry.frontmatter.slug,
  }));
};

export const dynamicParams = false;

const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const entries = await getEntries("projects");
  const entry = entries.find((entry) => entry.frontmatter.slug === slug);
  if (!entry) {
    notFound();
  }
  const title = entry.frontmatter.title;
  const description = await stripDescription(entry.frontmatter.description);
  return {
    title,
    description,
  };
};

export { generateMetadata, generateStaticParams };

export default ProjectDetailPage;
