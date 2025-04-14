import cx from "classnames";
import Link from "next/link";
import { HashtagIcon } from "@heroicons/react/20/solid";

export default function Tag({ slug, theme = "default", thin = false }) {
  const defaultClassNames =
    "text-sm font-overpass font-semibold inline-flex items-center gap-1 transition duration-400 ease-linear";

  const themeClassNames = {
    default:
      "rounded-full px-5 py-1 border-2 border-black hover:bg-black hover:text-beige",
    dark: "rounded-full px-5 py-1 border-2 border-black bg-black text-white hover:underline",
    naked: "border-none hover:underline",
  }[theme];

  const widthClassNames = thin ? "border" : "border-2";

  const classNames = cx(defaultClassNames, themeClassNames, widthClassNames);

  return (
    <Link className={classNames} href={`/tags/${slug}/`}>
      <HashtagIcon className="h-4 w-4" />{" "}
      <span className="translate-y-px">{slug}</span>
    </Link>
  );
}
