import ClickableHeader from "@/components/ClickableHeader";
import Tag from "@/components/Tag";
import cx from "classnames";
import slugify from "slugify";
import DateFormatter from "@/components/DateFormatter";

const Section = ({ children, title, id, className = "" }) => {
  return (
    <section className={className}>
      <h2 className="callout-1 text-ruby">
        <ClickableHeader id={id}>{title}</ClickableHeader>
      </h2>
      <nav className="mt-8">{children}</nav>
    </section>
  );
};

/**
 * Table of Contents
 *
 * TODO: Convert this to recursive function and use proper list nesting
 *
 * @param param0
 * @returns
 */
const TOCSection = ({ entry }) => {
  if (!entry.tableOfContents || entry.tableOfContents.length === 0) {
    return <></>;
  }

  return (
    <Section
      className="hidden lg:block"
      title="Table of Contents"
      id="table-of-contents"
    >
      <ol className="flex flex-col gap-4">
        {entry.tableOfContents
          .filter((item) => item.depth == 2)
          .map((item, i) => {
            const slug = slugify(item.value, { lower: true });
            return (
              <li
                className=""
                key={i}
                style={{
                  paddingLeft: `${item.depth - 2 * 10}px`,
                }}
              >
                <a className="hover:underline" href={`#${slug}`}>
                  {item.value}
                </a>
              </li>
            );
          })}
      </ol>
    </Section>
  );
};

const TagsSection = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return <></>;
  }

  return (
    <Section title="Tags" id="tags">
      <ul className="flex gap-3">
        {tags &&
          tags.map((tag, i) => {
            return (
              <li key={i}>
                <Tag slug={tag}></Tag>
              </li>
            );
          })}
      </ul>
    </Section>
  );
};

const ReadingTime = ({ entry }) => {
  return (
    <Section title="Reading Time" id="reading-time">
      <p className="text-sm">
        <span>{entry.readingTime.text}</span>
      </p>
    </Section>
  );
};

const LastUpdate = ({ entry }) => {
  return (
    <Section title="Last Updated" id="last-updated">
      <p className="text-sm">
        <DateFormatter
          dateString={entry.frontmatter.lastUpdate}
          includeDay={false}
        />
      </p>
    </Section>
  );
};

const Revisions = ({ entry }) => {
  return (
    <Section title="Revisions" id="revisions">
      <ul className="flex flex-col gap-3 text-sm">
        {entry.frontmatter.revisions.map((revision, i) => {
          return (
            <li key={i}>
              <p>
                <span className="font-medium">
                  <DateFormatter
                    formatString="yyyy/MM/dd"
                    dateString={revision.date}
                    includeDay={false}
                  />
                </span>
                <span> - {revision.change}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

const EntrySidebar = ({ entry, className = "", ...props }) => {
  return (
    <aside
      className={cx(className, "flex flex-col gap-16 2xl:gap-24")}
      {...props}
    >
      <TOCSection entry={entry} />
      {entry.frontmatter.tags && <TagsSection tags={entry.frontmatter.tags} />}
      <ReadingTime entry={entry} />
      {entry.frontmatter.lastUpdate && <LastUpdate entry={entry} />}
      {entry.frontmatter.revisions && <Revisions entry={entry} />}
    </aside>
  );
};

export default EntrySidebar;
