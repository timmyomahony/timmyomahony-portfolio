import Container from "@/components/Container";
import Page from "@/components/layouts/Page";
import MDXComponents from "@/components/MDXComponent";
import NowSection from "@/components/NowSection";
import { MDXEntry, NowDataEntry } from "@/types";
import { getNowContent, getNowEntries } from "@/utils/now";
import { notFound } from "next/navigation";

const NowPage = async () => {
  const entries: NowDataEntry[] = await getNowEntries();
  const content: MDXEntry = await getNowContent();

  if (!entries || !content) {
    notFound();
  }

  const { default: MDXContent, frontmatter } = content;

  const categories: string[] = Array.from(
    new Set(entries.map((entry) => entry.category)),
  ).sort();

  return (
    <Page>
      <Container>
        <div className="">
          <header className="flex flex-col gap-8 border-t border-t-black py-8 md:py-12 lg:py-24">
            <h1 className="heading-1">{frontmatter.title}</h1>
            <div className="w-full flex-grow-0 md:w-10/12">
              <MDXContent components={MDXComponents} />
            </div>
            {/* <p className="text-gray-500">Last updated: {frontmatter.date}</p> */}
          </header>
          <section className="flex flex-col gap-8">
            {categories.map((category, i) => {
              return (
                <NowSection category={category} entries={entries} key={i} />
              );
            })}
          </section>
        </div>
      </Container>
    </Page>
  );
};

const generateMetadata = async () => {
  const content = await getNowContent();
  if (!content) {
    notFound();
  }
  const { frontmatter } = content;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
};

export { generateMetadata };

export default NowPage;
