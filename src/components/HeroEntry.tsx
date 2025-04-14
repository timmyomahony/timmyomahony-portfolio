import CoverImage from "@/components/CoverImages";
import DateFormatter from "@/components/DateFormatter";
import { MDXEntry } from "@/types";
import { renderDescription } from "@/utils/mdx";
import Link from "next/link";

type Props = {
  entry: MDXEntry;
};

const HeroEntry = async ({ entry }: Props) => {
  const descriptionHtml = await renderDescription(
    entry.frontmatter.description,
  );
  return (
    <section className="flex w-full flex-col gap-6 border-t border-t-black py-8 md:flex-row md:py-12 lg:gap-16 lg:py-24 xl:mt-24">
      <div
        className={`order-2 flex min-h-full w-full flex-col justify-between md:w-3/4 lg:order-1 ${
          entry.frontmatter.image ? "lg:w-7/12" : "lg:w-3/4"
        }`}
      >
        <h3 className="callout-1 mb-12 hidden text-black lg:block">
          Pinned Post
        </h3>
        <div>
          <p className="callout-2">
            <DateFormatter dateString={entry.frontmatter.date} />
          </p>
          <h2 className="mt-2 font-noto text-3xl leading-tight lg:mt-8 xl:text-5xl 2xl:text-5xl 2xl:leading-snug">
            <Link
              href={`/blog/${entry.frontmatter.slug}`}
              className="hover:underline"
            >
              {entry.frontmatter.title}
            </Link>
          </h2>
          <div
            className="body-1 mt-4 w-full lg:mt-8 xl:w-3/4"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
        </div>
      </div>
      {entry.frontmatter.image && (
        <div
          className={`order-1 w-full md:order-2 md:w-1/4 ${
            entry.frontmatter.image ? "lg:w-5/12" : "lg:w-1/4"
          }`}
        >
          <CoverImage entry={entry} />
        </div>
      )}
    </section>
  );
};

export default HeroEntry;
