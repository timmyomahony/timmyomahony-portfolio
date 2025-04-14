import Link from "next/link";
import fs from "fs";
import pkg from "@/../package.json";
import { format } from "date-fns";
import config from "@/../portfolio.config";

const lastBuilt = format(new Date(), "EEEE do MMMM 'at' HH:mm");

const hash = () => {
  try {
    const rev = fs
      .readFileSync(".git/HEAD")
      .toString()
      .trim()
      .split(/.*[: ]/)
      .slice(-1)[0];

    const fullHash =
      rev.indexOf("/") === -1
        ? rev
        : fs
            .readFileSync(".git/" + rev)
            .toString()
            .trim();

    // Return only first 7 characters of the hash
    return fullHash.substring(0, 7);
  } catch (error) {
    return "unknown";
  }
};

const Footer = () => {
  return (
    <footer className="group container mx-auto">
      <div className="w-full border-t border-t-black py-8 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:gap-0">
          {/* Name */}
          <div className="w-full">
            <a
              className="font-inter text-lg leading-normal md:text-xl lg:text-2xl"
              href="/"
            >
              {config.name} <span className="text-ruby">↴</span>
            </a>
            <p className="body-0 mt-3 flex w-full justify-between">
              <span>{config.byline}</span>
            </p>
          </div>
          {/* Pages */}
          <div className="flex w-full flex-col gap-4 lg:w-1/2">
            <h3 className="callout-1">Pages</h3>
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-2">
              {[
                {
                  title: "Home",
                  href: "/",
                },
                {
                  title: "Blog",
                  href: "/blog/",
                },
                {
                  title: "Projects",
                  href: "/projects/",
                },
                {
                  title: "Photos",
                  href: "/photos/albums/",
                },
                {
                  title: "About",
                  href: "/about/",
                },
                {
                  title: "Now",
                  href: "/now/",
                },
              ].map((item, i) => {
                return (
                  <li className="text-base lg:text-lg" key={i}>
                    <Link
                      className="hover:text-ruby hover:underline"
                      href={item.href}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Get In Touch */}
          <div className="flex w-full flex-col gap-4 lg:w-1/2">
            <h3 className="callout-1">Get In Touch</h3>
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-2">
              {[
                {
                  title: "Email",
                  href: `mailto:${config.email}`,
                },
                {
                  title: "Bluesky",
                  href: config.blueskyUrl,
                },
                {
                  title: "LinkedIn",
                  href: config.linkedInUrl,
                },
                {
                  title: "Github",
                  href: config.githubUrl,
                },
              ].map((item, i) => {
                return (
                  <li className="text-base lg:text-lg" key={i}>
                    <Link
                      className="hover:text-ruby hover:underline"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Info bar */}
        <p className="mt-8 flex w-full cursor-help flex-col items-start justify-between gap-4 rounded-sm border border-black bg-black px-3 py-3 font-ibm text-xs leading-none text-beige transition-all duration-500 ease-in-out hover:border-ruby hover:bg-ruby sm:mt-12 md:flex-row md:items-center md:gap-0 md:rounded-2xl md:px-6 md:py-4 lg:mt-24 lg:rounded-full">
          <span className="flex flex-col gap-2 lg:flex-row lg:gap-1">
            <Link href={config.repoUrl}>
              Version <span className="underline">{pkg.version}</span> ({hash()}
              )
            </Link>{" "}
            <span>
              <span className="hidden lg:inline"> &mdash;</span> Last Updated:{" "}
              {lastBuilt}
            </span>
          </span>
          <span className="flex gap-4">
            <Link className="hover:underline" href="/privacy/">
              Privacy
            </Link>
            <Link className="hover:underline" href="/more-information/">
              More Info
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
