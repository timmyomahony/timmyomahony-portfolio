import Page from "@/components/layouts/Page";
import Container from "@/components/Container";
import { getEntries } from "@/utils/entries";
import { notFound } from "next/navigation";
import MDXComponents from "@/components/MDXComponent";

const GenericPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const entries = await getEntries("pages");
  const { slug } = await params;
  const entry = entries.find((entry) => entry.frontmatter.slug === slug);

  if (!entry) notFound();

  const { default: MDXContent, frontmatter } = entry;

  return (
    <Page>
      <Container>
        <main className="border-t border-black pt-8 lg:pb-1 lg:pt-16">
          {frontmatter.title && (
            <h1 className="font-noto text-3xl font-medium leading-tight xl:text-5xl">
              {frontmatter.title}
            </h1>
          )}
          {frontmatter.description && (
            <p className="mt-4 text-base xl:text-xl">
              {frontmatter.description}
            </p>
          )}
          <div className="mt-16 lg:w-3/4">
            <MDXContent components={MDXComponents} />
          </div>
        </main>
      </Container>
    </Page>
  );
};

const generateStaticParams = async () => {
  return (await getEntries("pages")).map((entry) => ({
    slug: entry.frontmatter.slug,
  }));
};

export const dynamicParams = false;

export { generateStaticParams };

export default GenericPage;
