"use client";

import cx from "classnames";

import { toast } from "react-toastify";
import { HashtagIcon } from "@heroicons/react/20/solid";

const ClickableHeader = ({
  children,
  id,
  className = "",
  title = "Click to copy direct link to clipboard",
  ...props
}) => {
  const _className = cx(className, "relative cursor-pointer group");
  const linkClicked = (ev) => {
    setTimeout(() => {
      if (window.navigator) {
        navigator.clipboard.writeText(window.location.href);
        toast.info("Direct link copied to clipboard");
      }
    }, 500);
  };
  return (
    <a
      id={id}
      href={`#${id}`}
      className={_className}
      onClick={linkClicked}
      {...props}
    >
      {children}
      <HashtagIcon
        title={title}
        className="absolute left-full top-1/2 h-[80%] -translate-y-[45%] translate-x-2 text-gray-300 opacity-0 transition duration-300 ease-in-out hover:text-gray-400 group-hover:opacity-100"
      />
    </a>
  );
};

export default ClickableHeader;
