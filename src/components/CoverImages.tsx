/* eslint-disable @next/next/no-img-element */
const CoverImage = ({ entry }) => {
  return (
    <>
      <img
        className="aspect-square object-cover"
        src={entry.frontmatter.image.url}
        alt={entry.frontmatter.title}
        height={600}
        width={600}
      />
      {entry.frontmatter.image.cite && (
        <figcaption className="flex w-full justify-end">
          <a
            className="mt-3 font-overpass text-xs font-light leading-none text-gray-400 hover:underline"
            href={entry.frontmatter.image.cite.url}
            target="_blank"
            rel="noreferrer"
          >
            {entry.frontmatter.image.cite.name}
          </a>
        </figcaption>
      )}
    </>
  );
};

export default CoverImage;
