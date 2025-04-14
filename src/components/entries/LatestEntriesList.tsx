import Link from "next/link";

type Props = {
  entries: any[];
  title?: string;
  urlPrefix?: string;
  linkText?: string;
};

export default function LatestEntriesList({
  entries,
  title = "Latest Entries",
  urlPrefix = "/projects",
  linkText = "See All",
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 md:gap-12 xl:grid-cols-3">
      <div className="col-span-1">
        <h2 className="heading-2">{title}</h2>
      </div>
      <div className="relative col-span-2">
        <ul className="flex flex-col gap-4 xl:gap-6">
          {entries.map((entry, index) => {
            const url = `${urlPrefix}/${entry.frontmatter.slug}/`;
            return (
              <li
                className={`${index > 0 ? "border-t border-t-black" : ""} ${
                  index !== 0 ? "pt-4 xl:pt-6" : ""
                }`}
                key={index}
              >
                <h2 className="body-1 flex justify-between">
                  <Link className="hover:underline" href={url}>
                    {entry.frontmatter.title}
                  </Link>
                </h2>
              </li>
            );
          })}
        </ul>
        <p className="text-center md:text-right xl:mt-6">
          <Link className="callout-0 hover:underline" href={urlPrefix}>
            {linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
