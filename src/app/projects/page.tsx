import Container from "@/components/Container";
import EntryLargeGridListItem from "@/components/entries/EntryLargeGridListItem";
import EntrySmallGridListItem from "@/components/entries/EntrySmallGridListItem";
import Page from "@/components/layouts/Page";
import { MDXEntry } from "@/types";
import { getEntries } from "@/utils/entries";
import { compareDesc } from "date-fns";
import { Metadata } from "next";
import { ReactElement } from "react";

const HeroText = ({
  title,
  subtitle,
}: {
  title: string | ReactElement;
  subtitle: string | ReactElement;
}) => {
  return (
    <section className="border-y border-black pb-10 pt-10 lg:pb-20 lg:pt-24">
      <div className="mx-auto flex w-full flex-col gap-5 text-start lg:w-6/12 lg:text-center">
        <h2 className="font-overpass text-xs font-semibold uppercase leading-7 tracking-[0.2em] text-ruby lg:text-sm">
          Latest Projects
        </h2>
        <h1 className="heading-1">{title}</h1>
        <p className="body-2">{subtitle}</p>
      </div>
    </section>
  );
};

const ProjectListPage = async () => {
  // Get all projects from remote content bucket
  const entries = await getEntries("projects");

  const pinnedEntries = entries
    .filter((entry) => {
      return entry.frontmatter.pinned === true;
    })
    .sort((a: MDXEntry, b: MDXEntry) => {
      const aOrdering = a.frontmatter.ordering ?? 0;
      const bOrdering = b.frontmatter.ordering ?? 0;
      return aOrdering <= bOrdering ? -1 : 1;
    });

  const recentEntries = entries
    .filter((entry) => {
      return !pinnedEntries.includes(entry);
    })
    .sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date)),
    );

  return (
    <Page>
      <Container>
        <HeroText
          title="Here are some of the things I've been working on."
          subtitle={
            <>
              I&apos;ve never had a <em>real job</em> so this is where I keep
              track of all the things I&apos;ve been doing over the years,
              whether it&apos;s new businesses I&apos;ve been building out,
              client projects or just experiments.
            </>
          }
        />
        {pinnedEntries && (
          <section>
            <div className="py-6 lg:py-12">
              <h3 className="callout-1 text-ruby">Pinned</h3>
            </div>
            <div className="flex w-full">
              <ul className="grid w-full auto-rows-max grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
                {pinnedEntries.map((entry) => {
                  return (
                    <li key={entry.frontmatter.slug}>
                      <EntryLargeGridListItem
                        entry={entry}
                        urlPrefix={"/work"}
                        showBorder={false}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
        <section className="mt-10 flex flex-col gap-8 border-t border-black pt-10 lg:mt-16 lg:flex-row lg:pt-16">
          <div className="w-full lg:w-1/3">
            <h3 className="callout-1 text-ruby">Recent</h3>
          </div>
          <ul className="flex w-full flex-col gap-12 lg:w-2/3">
            {recentEntries.map((entry) => {
              return (
                <li className="" key={entry.frontmatter.slug}>
                  <EntrySmallGridListItem
                    entry={entry}
                    urlPrefix={"/work"}
                    showBorder={false}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </Page>
  );
};

export const metadata: Metadata = {
  title: "Latest Work & Projects | Timmy O'Mahony",
  description:
    "I've never had a real job and I don't have a CV, so here's a list of everything I've been working on recently",
};

export default ProjectListPage;
