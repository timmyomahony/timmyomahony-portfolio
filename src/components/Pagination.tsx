import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  urlPrefix?: string;
};

const Pagination = ({ page, totalPages, urlPrefix = "/blog" }: Props) => {
  return (
    <>
      <ul className="flex items-center justify-start gap-6 text-base lg:text-xl">
        {page - 1 > 0 && (
          <li>
            <Link
              href={page === 0 ? urlPrefix : `${urlPrefix}/page/${page - 1}/`}
            >
              ←
            </Link>
          </li>
        )}
        {Array.from({ length: totalPages }, (v, i) => {
          return (
            <li key={i} className="hover:underline">
              {page === i + 1 ? (
                <span className="underline">{i + 1}</span>
              ) : (
                <Link
                  href={i === 0 ? urlPrefix : `${urlPrefix}/page/${i + 1}/`}
                >
                  {i + 1}
                </Link>
              )}
            </li>
          );
        })}
        {page + 1 <= totalPages && (
          <li>
            <Link href={`${urlPrefix}/page/${page + 1}/`}>→</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Pagination;
