import EntryLargeGridListItem from "@/components/entries/EntryLargeGridListItem";
import Link from "next/link";

type Props = {
  entries: any[];
  title?: string;
  description?: React.ReactNode;
  urlPrefix?: string;
  linkText?: string;
};

export default function LatestEntriesGrid({
  entries,
  title = "Latest Entries",
  description,
  urlPrefix = "/projects",
  linkText = "See All",
}: Props) {
  return (
    <div className="relative flex flex-col gap-12 xl:gap-20">
      <div className="flex flex-col gap-2 lg:gap-4 xl:gap-6">
        <h2 className="heading-1">{title}</h2>
        {description && <p className="body-2 md:w-1/2">{description}</p>}
      </div>
      <div>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {entries.map((entry, index) => {
            return (
              <li className="" key={index}>
                <EntryLargeGridListItem
                  entry={entry}
                  urlPrefix={urlPrefix}
                  showFooter={false}
                  showBorder={false}
                />
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
