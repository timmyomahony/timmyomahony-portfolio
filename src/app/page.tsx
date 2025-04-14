/* eslint-disable @next/next/no-img-element */
import Container from "@/components/Container";
import LatestEntriesGrid from "@/components/entries/LatestEntriesGrid";
import LatestEntriesList from "@/components/entries/LatestEntriesList";
import Page from "@/components/layouts/Page";
import { getEntries } from "@/utils/entries";
import { compareDesc } from "date-fns";
import Link from "next/link";
import config from "@/../portfolio.config";
import SocialButtons from "@/components/SocialButtons";
import LatestPhotosGrid from "@/components/photos/LatestPhotosGrid";
import { getAlbums } from "@/utils/photos";

const HomePage = async () => {
  const posts = await getEntries("posts");
  const projects = await getEntries("projects");
  const albums = await getAlbums();

  const latestPosts = posts
    .reverse()
    .sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date)),
    )
    .slice(0, 8);

  const featuredProjects = projects
    .sort((a, b) =>
      (a.frontmatter.ordering || 0) <= (b.frontmatter.ordering || 0) ? -1 : 1,
    )
    .filter((entry) => entry.frontmatter.featured === true);

  const latestPhotos = albums.slice(0, 8).map((album) => {
    return album.photos[0];
  });

  return (
    <Page>
      <Container>
        {/* Hero */}
        <header className="mb-8 flex min-h-[80vh] flex-col items-stretch justify-between md:mb-12 md:flex-row lg:mb-16 2xl:mb-20">
          <section className="w-full md:w-5/12">
            <img
              className="m-0 block h-full w-auto object-cover p-0"
              src="https://cdn.timmyomahony.com/timmy-omahony.jpg"
              alt="Timmy O'Mahony profile picture"
            />
          </section>
          <section className="flex w-full flex-col justify-end pb-8 pt-8 md:w-6/12 md:pb-0 md:pt-12 lg:pt-16">
            <h1 className="heading-1">
              I&apos;m Timmy, an independent software developer from Ireland.
            </h1>
            <p className="body-0 mt-5 xl:mt-8 2xl:mt-10">
              I run a few of my own{" "}
              <Link className="font-medium hover:underline" href="/projects/">
                software businesses
              </Link>{" "}
              while also{" "}
              <Link className="font-medium hover:underline" href="/advisory/">
                helping companies
              </Link>{" "}
              get their own products and ideas off the ground. Read a bit more{" "}
              <Link className="font-medium hover:underline" href="/about/">
                about me
              </Link>
              . <br />
              {/* <br />I also like taking{" "}
              <Link
                className="font-medium hover:underline"
                href="/photos/albums/"
              >
                photos
              </Link>{" "}
              &mdash; find out what else I&apos;m up to right{" "}
              <Link className="font-medium hover:underline" href="/now/">
                now
              </Link>
              . */}
            </p>
            <SocialButtons />
          </section>
        </header>
        {/* Banner */}
        <section className="rounded-none border border-black bg-black pb-3 pt-3 font-ibm text-xs text-beige">
          <p className="flex items-center justify-center gap-2 tracking-wider">
            <span>
              <span className="font-medium">Looking for a portfolio?</span> The
              code for this website is open source.{" "}
              <Link
                className="text-ruby hover:underline"
                target="_blank"
                href={config.repoUrl}
              >
                View on Github
              </Link>{" "}
            </span>
          </p>
        </section>
        {/* Projects */}
        <section className="border-t border-t-black py-12 lg:py-16 xl:py-20">
          <LatestEntriesGrid
            entries={featuredProjects}
            title="Featured Projects"
            urlPrefix="/projects"
            linkText="See All Projects"
          />
        </section>
        {/* Photos */}
        <section className="border-t border-t-black py-12 lg:py-16 xl:py-20">
          <LatestPhotosGrid
            photos={latestPhotos}
            title="Recent Photos"
            linkUrl="/photos/albums"
            linkText="See All Photos"
          />
        </section>
        {/* Entries */}
        <section className="border-t border-t-black py-12 lg:py-16 xl:py-20">
          <LatestEntriesList
            entries={latestPosts}
            title="Latest Posts"
            urlPrefix="/blog"
            linkText="See All Posts"
          />
        </section>
      </Container>
    </Page>
  );
};

export default HomePage;
