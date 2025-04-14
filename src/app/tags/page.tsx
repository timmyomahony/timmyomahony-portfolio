import Container from "@/components/Container";
import Page from "@/components/layouts/Page";
import { MDXEntry } from "@/types";
import { getAllTags, getEntries } from "@/utils/entries";
import { Metadata } from "next";
import Link from "next/link";

const TagListPage = async () => {
  const entries: MDXEntry[] = await getEntries("all");
  const tags: string[] = await getAllTags(entries);

  return (
    <Page>
      <Container>
        <header className="mt-12 border-t border-y-black pt-8 lg:pt-16">
          <h1 className="heading-1">Tags</h1>
        </header>
        <ul className="grid w-full grid-cols-4 gap-4 pt-8 md:pt-12 lg:pt-24">
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/tags/${tag}`} className="text-lg hover:underline">
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Page>
  );
};

export const metadata: Metadata = {
  title: "All tags from blog posts, photos, pages etc.",
  description: "See a list of all the tags from the website",
};

export default TagListPage;
